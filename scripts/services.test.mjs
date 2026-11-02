import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { parseServices, textEntries, displayTextEntries, birthGroups, feedingGroups, validateRussian, renderServices, readServiceSources, startMarker, endMarker } from './prepare-services.mjs'

const { markdown, data, russian } = await readServiceSources()

test('every original content line survives exactly and in order, including repeated source items', () => {
  const expected = markdown.split(/\r?\n/).map(line => line.trim()).filter(line => line && line !== '### NACH DEM ÖFFNEN:' && line !== '[Mehr erfahren ↓]')
    .map(line => line.replace(/^## \d{2} · /, '').replace(/^#{1,4} /, '').replace(/^- /, ''))
  assert.deepEqual(textEntries(data).map(([, text]) => text), expected)
  assert.equal(data.areas.length, 5)
  assert.deepEqual(data.areas.map(area => area.blocks.filter(block => block.type === 'list').reduce((sum, block) => sum + block.items.length, 0)), [16, 9, 13, 11, 9])
})

test('German generated data and complete no-JavaScript HTML match the source', async () => {
  assert.deepEqual(JSON.parse(await readFile(new URL('../src/data/services/services.de.json', import.meta.url), 'utf8')), data)
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  assert.equal(html.slice(html.indexOf(startMarker), html.indexOf(endMarker) + endMarker.length), renderServices(data))
  const section = renderServices(data)
  assert.equal((section.match(/<details /g) || []).length, 5)
  assert.equal((section.match(/<summary /g) || []).length, 5)
  assert.equal((section.match(/<li /g) || []).length, 58)
  assert.equal((section.match(/data-marina-copy=/g) || []).length, textEntries(data).length)
  assert.doesNotMatch(section, /<details[^>]+ open|<iframe|<img|https?:\/\//)
})

test('birth preparation groups preserve all nine items and both original paragraphs', () => {
  const area = data.areas[1]
  assert.deepEqual(birthGroups.map(group => group.indices.map(index => area.blocks[1].items[index])), [
    ['Persönliche Vorbereitung auf Geburt und Wochenbett', 'Ablauf und Phasen der Geburt', 'Vorbereitung auf unterschiedliche Geburtsverläufe', 'Wünsche und Möglichkeiten rund um deine Geburt', 'Einbeziehung des Partners / der Begleitperson'],
    ['Geburtspositionen und Bewegung', 'Atem- und Entspannungstechniken', 'Möglichkeiten der Schmerzlinderung', 'Bonding, Stillstart und die ersten Stunden mit deinem Baby'],
  ])
  const html = renderServices(data)
  assert.match(html, /data-marina-group-heading="birth-planning">Geburt verstehen &amp; planen<\/h4>/)
  assert.match(html, /data-marina-group-heading="birth-movement">Bewegung, Entspannung &amp; erste Stunden<\/h4>/)
  assert.ok(html.includes(area.blocks[0].text) && html.includes(area.blocks[2].text))
  assert.deepEqual(displayTextEntries(data).map(([key]) => key).sort(), textEntries(data).map(([key]) => key).sort())
})

test('feeding topics are grouped exactly once with the requested source wording', () => {
  const source = data.areas[3].blocks[1].items
  assert.deepEqual(feedingGroups.map(group => group.indices.map(index => source[index])), [
    ['Unterstützung beim Stillstart', 'Stillpositionen und richtiges Anlegen', 'Hilfe bei Schmerzen und wunden Brustwarzen', 'Beratung zu Milchbildung und Milchmenge', 'Hilfe bei Milchstau und anderen Stillproblemen', 'Abpumpen und Aufbewahren von Muttermilch', 'Erweiterte Stillberatung'],
    ['Kombination von Stillen und Flaschenernährung', 'Flaschenernährung und Säuglingsnahrung', 'Abstillen', 'Beikostberatung und entspannter Beikoststart'],
  ])
  assert.deepEqual(displayTextEntries(data).map(([key]) => key).sort(), textEntries(data).map(([key]) => key).sort())
  const html = renderServices(data)
  assert.match(html, /data-marina-group-heading="breastfeeding">Stillberatung &amp; Milchbildung<\/h4>/)
  assert.match(html, /data-marina-group-heading="feeding">Flaschenernährung, Abstillen &amp; Beikost<\/h4>/)
})

test('RU is a complete explicitly unapproved translation, with one entry per source string', () => {
  validateRussian(data, russian)
  const incomplete = structuredClone(russian)
  delete incomplete.strings[data.areas[0].preview[0]]
  assert.throws(() => validateRussian(data, incomplete))
})

test('unrecognized or incomplete source structures fail instead of dropping services', () => {
  assert.throws(() => parseServices(markdown.replace('## 05 · RUND UMS BABY', '### UNKNOWN AREA')))
  assert.throws(() => parseServices(markdown.replace('### NACH DEM ÖFFNEN:', '### UNKNOWN')))
  assert.throws(() => parseServices(markdown.replace('## 03 · WOCHENBETT', '## 04 · WOCHENBETT')))
})

test('obsolete uncertainty about offered services and generic birth-attendance claim are removed', async () => {
  for (const file of ['../index.html', '../src/main.js']) {
    const content = await readFile(new URL(file, import.meta.url), 'utf8')
    assert.doesNotMatch(content, /Welche dieser Bereiche Marina konkret anbietet|Geburten begleiten|Какие именно услуги предлагает Марина|а также сопровождать роды|Frag nach den angebotenen Leistungen/)
  }
  const content = await readFile(new URL('../src/marina-services.js', import.meta.url), 'utf8')
  assert.doesNotMatch(content, /fetch\(|https?:\/\/|innerHTML/)
})
