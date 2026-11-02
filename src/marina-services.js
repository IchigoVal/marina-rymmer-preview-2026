import german from './data/services/services.de.json'
import russian from './data/services/services.ru.json'
import './marina-services.css'

const titleLabels = {
  de: {
    'MEINE LEISTUNGEN': 'Meine Leistungen',
    'SCHWANGERSCHAFT': 'Schwangerschaft',
    'INDIVIDUELLE GEBURTSVORBEREITUNG': 'Individuelle Geburtsvorbereitung',
    'WOCHENBETT': 'Wochenbett',
    'STILLEN & ERNÄHRUNG': 'Stillen & Ernährung',
    'RUND UMS BABY': 'Rund ums Baby',
  },
  ru: {
    'MEINE LEISTUNGEN': 'Мои услуги',
    'SCHWANGERSCHAFT': 'Беременность',
    'INDIVIDUELLE GEBURTSVORBEREITUNG': 'Индивидуальная подготовка к родам',
    'WOCHENBETT': 'Послеродовой период',
    'STILLEN & ERNÄHRUNG': 'Грудное вскармливание и питание',
    'RUND UMS BABY': 'Всё о малыше',
  },
}

const labels = {
  de: { more: 'Mehr erfahren', less: 'Weniger anzeigen', inquire: 'Jetzt anfragen →', breastfeeding: 'Stillberatung & Milchbildung', feeding: 'Flaschenernährung, Abstillen & Beikost', 'birth-planning': 'Geburt verstehen & planen', 'birth-movement': 'Bewegung, Entspannung & erste Stunden' },
  // These additional headings, like the rest of the RU service copy, await Marina's review.
  ru: { more: 'Подробнее', less: 'Свернуть', inquire: 'Оставить запрос →', breastfeeding: 'Консультации по грудному вскармливанию и выработке молока', feeding: 'Кормление из бутылочки, завершение грудного вскармливания и прикорм', 'birth-planning': 'Понимание и планирование родов', 'birth-movement': 'Движение, расслабление и первые часы' },
}

export function initializeMarinaServices(root) {
  if (!root) return () => {}
  let language = 'de'
  const entries = [...root.querySelectorAll('[data-marina-copy]')].map(node => ({
    node,
    original: node.dataset.marinaCopy.split('.').reduce((value, key) => value[key], german),
  }))
  const details = [...root.querySelectorAll('.marina-service')]
  const groupHeadings = [...root.querySelectorAll('[data-marina-group-heading]')]
  const inquireLinks = [...root.querySelectorAll('[data-marina-inquire]')]
  const updateAction = detail => {
    detail.querySelector('[data-marina-action]').textContent = labels[language][detail.open ? 'less' : 'more']
    detail.querySelector('[data-marina-close]').textContent = labels[language].less + ' ↑'
  }
  for (const detail of details) {
    const close = detail.querySelector('[data-marina-close]')
    close.hidden = false
    detail.addEventListener('toggle', () => updateAction(detail))
    close.addEventListener('click', () => {
      detail.open = false
      const summary = detail.querySelector('summary')
      summary.focus({ preventScroll: true })
      summary.scrollIntoView({ block: 'start', behavior: 'instant' })
    })
  }
  // A shared direct link can also reveal an individual service, without altering other open areas.
  const revealHash = () => {
    const detail = details.find(item => '#' + item.id === window.location.hash)
    if (detail) detail.open = true
  }
  window.addEventListener('hashchange', revealHash)
  revealHash()
  return nextLanguage => {
    language = nextLanguage === 'ru' ? 'ru' : 'de'
    entries.forEach(({ node, original }) => {
      node.textContent = titleLabels[language][original] ?? (language === 'ru' ? russian.strings[original] : original)
    })
    groupHeadings.forEach(node => { node.textContent = labels[language][node.dataset.marinaGroupHeading] })
    inquireLinks.forEach(node => { node.textContent = labels[language].inquire })
    details.forEach(updateAction)
  }
}
