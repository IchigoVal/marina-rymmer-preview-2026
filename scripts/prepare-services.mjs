import assert from 'node:assert/strict'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = new URL('../', import.meta.url)
const ids = ['schwangerschaft', 'geburtsvorbereitung', 'wochenbett', 'stillen-ernaehrung', 'rund-ums-baby']
export const birthGroups = [
  { key: 'birth-planning', heading: 'Geburt verstehen & planen', indices: [0, 1, 5, 6, 7] },
  { key: 'birth-movement', heading: 'Bewegung, Entspannung & erste Stunden', indices: [2, 3, 4, 8] },
]
export const feedingGroups = [
  { key: 'breastfeeding', heading: 'Stillberatung & Milchbildung', indices: [0, 1, 2, 3, 4, 5, 9] },
  { key: 'feeding', heading: 'Flaschenernährung, Abstillen & Beikost', indices: [6, 7, 8, 10] },
]
export const titleLabels = {
  'MEINE LEISTUNGEN': 'Meine Leistungen',
  'SCHWANGERSCHAFT': 'Schwangerschaft',
  'INDIVIDUELLE GEBURTSVORBEREITUNG': 'Individuelle Geburtsvorbereitung',
  'WOCHENBETT': 'Wochenbett',
  'STILLEN & ERNÄHRUNG': 'Stillen & Ernährung',
  'RUND UMS BABY': 'Rund ums Baby',
}
export const startMarker = '<!-- marina-services:start -->'
export const endMarker = '<!-- marina-services:end -->'

// Deliberately strict: an unfamiliar source format must not silently drop content.
export function parseServices(markdown) {
  const lines = markdown.replace(/^\uFEFF/, '').split(/\r?\n/).map(line => line.trim()).filter(Boolean)
  assert.equal(lines.shift(), '# MEINE LEISTUNGEN')
  const data = { title: 'MEINE LEISTUNGEN', introduction: [], areas: [] }
  let area = null
  let opened = false
  for (const line of lines) {
    const heading = line.match(/^## (\d{2}) · (.+)$/)
    if (heading) {
      area = { id: ids[data.areas.length], number: heading[1], title: heading[2], preview: [], blocks: [] }
      data.areas.push(area)
      opened = false
    } else if (line === '[Mehr erfahren ↓]') {
      assert.ok(area && !opened)
      assert.equal(area.preview.length, 2)
    } else if (line === '### NACH DEM ÖFFNEN:') {
      assert.ok(area && !opened)
      opened = true
    } else if (!area) {
      assert.ok(!line.startsWith('#'))
      data.introduction.push(line)
    } else if (!opened) {
      assert.ok(!line.startsWith('#') && !line.startsWith('-'))
      area.preview.push(line)
    } else if (line.startsWith('#### ')) {
      area.blocks.push({ type: 'heading', text: line.slice(5) })
    } else if (line.startsWith('- ')) {
      let list = area.blocks.at(-1)
      if (list?.type !== 'list') {
        list = { type: 'list', items: [] }
        area.blocks.push(list)
      }
      list.items.push(line.slice(2))
    } else {
      assert.ok(!/^[#\[]/.test(line), 'Unknown source markup: ' + line)
      area.blocks.push({ type: 'paragraph', text: line })
    }
  }
  assert.equal(data.introduction.length, 2)
  assert.equal(data.areas.length, 5)
  data.areas.forEach((entry, index) => {
    assert.equal(entry.number, String(index + 1).padStart(2, '0'))
    assert.equal(entry.preview.length, 2)
    assert.ok(entry.blocks.length)
  })
  return data
}

export function textEntries(data) {
  const entries = [['title', data.title], ...data.introduction.map((text, i) => ['introduction.' + i, text])]
  data.areas.forEach((area, i) => {
    entries.push(['areas.' + i + '.title', area.title])
    area.preview.forEach((text, j) => entries.push(['areas.' + i + '.preview.' + j, text]))
    area.blocks.forEach((block, j) => {
      const key = 'areas.' + i + '.blocks.' + j
      if (block.type === 'list') block.items.forEach((text, k) => entries.push([key + '.items.' + k, text]))
      else entries.push([key + '.text', block.text])
    })
  })
  return entries
}

// The source stays in its original order; grouped display uses the requested order.
export function displayTextEntries(data) {
  const entries = textEntries(data)
  const birthPrefix = 'areas.1.blocks.1.items.'
  const birthStart = entries.findIndex(([key]) => key === birthPrefix + '0')
  assert.ok(birthStart >= 0)
  assert.equal(data.areas[1].blocks[1].items.length, 9)
  const birthReordered = birthGroups.flatMap(group => group.indices.map(index => entries[birthStart + index]))
  assert.deepEqual(birthReordered.map(([key]) => key).sort(), entries.slice(birthStart, birthStart + 9).map(([key]) => key).sort())
  entries.splice(birthStart, 9, ...birthReordered)
  const prefix = 'areas.3.blocks.1.items.'
  const start = entries.findIndex(([key]) => key === prefix + '0')
  assert.ok(start >= 0)
  assert.equal(data.areas[3].blocks[1].items.length, 11)
  assert.equal(data.areas[3].blocks[1].items[9], 'Erweiterte Stillberatung')
  const reordered = feedingGroups.flatMap(group => group.indices.map(index => entries[start + index]))
  assert.deepEqual(reordered.map(([key]) => key).sort(), entries.slice(start, start + 11).map(([key]) => key).sort())
  entries.splice(start, 11, ...reordered)
  return entries
}

export function validateRussian(data, russian) {
  assert.equal(russian.reviewStatus, 'pending-marina-review')
  const originals = [...new Set(textEntries(data).map(([, text]) => text))].sort()
  assert.deepEqual(Object.keys(russian.strings).sort(), originals, 'RU must cover every original string, without stale entries')
  assert.ok(Object.values(russian.strings).every(text => typeof text === 'string' && text.trim()))
}

const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const copy = (tag, key, text, attributes = '') => `<${tag} data-marina-copy="${key}"${attributes}>${escape(text)}</${tag}>`

export function renderServices(data) {
  const areas = data.areas.map((area, i) => {
    const key = 'areas.' + i
    let groupOpen = false
    const blocks = area.blocks.map((block, j) => {
      const blockKey = key + '.blocks.' + j
      if (block.type === 'heading') {
        const prefix = groupOpen ? '</section>' : ''
        groupOpen = true
        return prefix + `<section class="marina-service-group" aria-labelledby="${area.id}-group-${j}">`
          + copy('h4', blockKey + '.text', block.text, ` id="${area.id}-group-${j}"`)
      }
      // Marina's closing Wochenbett paragraph addresses both mother and baby.
      if (area.id === 'wochenbett' && j === area.blocks.length - 1 && block.type === 'paragraph') {
        groupOpen = false
        return '</section>' + copy('p', blockKey + '.text', block.text)
      }
      if ((area.id === 'stillen-ernaehrung' || area.id === 'geburtsvorbereitung') && block.type === 'list') {
        const groups = area.id === 'geburtsvorbereitung' ? birthGroups : feedingGroups
        assert.equal(block.items.length, area.id === 'geburtsvorbereitung' ? 9 : 11)
        if (area.id === 'stillen-ernaehrung') assert.equal(block.items[9], 'Erweiterte Stillberatung')
        return groups.map(group => {
          const id = `${area.id}-${group.key}`
          const items = group.indices.map(index => copy('li', blockKey + '.items.' + index, block.items[index])).join('')
          return `<section class="marina-service-group" aria-labelledby="${id}"><h4 id="${id}" data-marina-group-heading="${group.key}">${escape(group.heading)}</h4><ul>${items}</ul></section>`
        }).join('\n')
      }
      if (block.type === 'list') return '<ul>' + block.items.map((text, k) => copy('li', blockKey + '.items.' + k, text)).join('') + '</ul>'
      return copy('p', blockKey + '.text', block.text)
    }).join('\n') + (groupOpen ? '</section>' : '')
    return `<details class="marina-service" id="leistung-${area.id}">
  <summary aria-labelledby="leistung-${area.id}-title" aria-describedby="leistung-${area.id}-intro leistung-${area.id}-topics">
    <span class="marina-service-number" aria-hidden="true">${area.number}</span>
    <span class="marina-service-overview">
      ${copy('span', key + '.title', titleLabels[area.title] || area.title, ` class="marina-service-title" role="heading" aria-level="3" id="leistung-${area.id}-title"`)}
      ${copy('span', key + '.preview.0', area.preview[0], ` class="marina-service-intro" id="leistung-${area.id}-intro"`)}
      ${copy('span', key + '.preview.1', area.preview[1], ` class="marina-service-topics" id="leistung-${area.id}-topics"`)}
    </span>
    <span class="marina-service-action" aria-hidden="true"><span data-marina-action>Mehr erfahren</span><span class="marina-service-arrow">↓</span></span>
  </summary>
  <div class="marina-service-body">
    <div class="marina-service-text">${blocks}</div>
    <div class="marina-service-footer">
      <a class="marina-service-inquire" href="#kontakt" data-marina-inquire>Jetzt anfragen →</a>
      <button class="marina-service-close" type="button" data-marina-close hidden>Weniger anzeigen ↑</button>
    </div>
  </div>
</details>`
  }).join('\n')
  return `${startMarker}
<section class="section marina-services-section" id="hebammenhilfe" aria-labelledby="marina-services-title" data-marina-services>
  <div class="container">
    <div class="marina-services-heading">
      ${copy('h2', 'title', titleLabels[data.title] || data.title, ' id="marina-services-title"')}
      <div class="marina-services-introduction">
        ${data.introduction.map((text, i) => copy('p', 'introduction.' + i, text)).join('\n')}
      </div>
    </div>
    <div class="marina-services-list">${areas}</div>
  </div>
</section>
${endMarker}`
}

export async function readServiceSources() {
  const markdown = await readFile(new URL('MARINA_LEISTUNGEN.md', root), 'utf8')
  const russian = JSON.parse(await readFile(new URL('src/data/services/services.ru.json', root), 'utf8'))
  return { markdown, data: parseServices(markdown), russian }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { data, russian } = await readServiceSources()
  validateRussian(data, russian)
  const generated = JSON.stringify(data, null, 2) + '\n'
  const jsonPath = new URL('src/data/services/services.de.json', root)
  const indexPath = new URL('index.html', root)
  const html = await readFile(indexPath, 'utf8')
  const start = html.indexOf(startMarker)
  const end = html.indexOf(endMarker)
  assert.ok(start >= 0 && end > start, 'Missing generated HTML boundaries')
  const nextHtml = html.slice(0, start) + renderServices(data) + html.slice(end + endMarker.length)
  if (process.argv.includes('--check')) {
    assert.equal(await readFile(jsonPath, 'utf8'), generated, 'Refresh generated service data')
    assert.equal(html, nextHtml, 'Refresh German HTML fallback')
  } else {
    await mkdir(new URL('src/data/services/', root), { recursive: true })
    await writeFile(jsonPath, generated)
    if (html !== nextHtml) await writeFile(indexPath, nextHtml)
  }
  console.log(`Confirmed services: ${data.areas.length} areas, ${textEntries(data).length} exact text entries; complete DE HTML and RU draft.`)
}
