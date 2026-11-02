import './style.css'
import { initializeReviews } from './reviews.js'
import { initializeMarinaServices } from './marina-services.js'

const translations = {
  de: {
    meta: {
      title: 'Marina Rymmer | Hebamme in Nürnberg',
      description: 'Marina Rymmer ist Hebamme in Nürnberg und auf Deutsch und Russisch erreichbar.',
    },
    aria: {
      home: 'Zur Startseite',
      skipToContent: 'Zum Inhalt springen',
      languageSwitch: 'Sprache wählen',
      mainNavigation: 'Hauptnavigation',
      mobileNavigation: 'Mobile Navigation',
      menuOpen: 'Menü öffnen',
      menuClose: 'Menü schließen',
      contactOptions: 'Kontaktmöglichkeiten',
      legalNavigation: 'Rechtliche Hinweise',
      quickContact: 'Schnellkontakt',
      servicesCarousel: 'Anfrageanlässe. Auf kleinen Bildschirmen horizontal scrollbar.',
      previousCard: 'Vorherige Karte',
      nextCard: 'Nächste Karte',
      floatingPhone: 'Marina Rymmer unter 0176 23488396 anrufen',
      floatingWhatsapp: 'WhatsApp-Chat mit Marina Rymmer öffnen',
    },
    brand: {
      subline: 'Hebamme',
    },
    nav: {
      orientation: 'Leistungen',
      services: 'Wann anfragen',
      about: 'Über Marina',
      reviews: 'Bewertungen',
      knowledge: 'Gut zu wissen',
      contact: 'Kontakt',
    },
    cta: {
      whatsapp: 'WhatsApp schreiben',
      call: '0176 23488396',
    },
    hero: {
      eyebrow: 'Hebamme in Nürnberg',
      title: 'Marina Rymmer',
      intro:
        'Du suchst eine Hebamme? Schreib mir auf Deutsch oder Russisch. Ob ich dich betreuen kann, klären wir im direkten Kontakt.',
      inquiryLink: 'Was gehört in meine Anfrage?',
    },
    services: {
      title: 'Wann du anfragen kannst',
      cards: [
        {
          title: 'Sobald du schwanger bist',
          text: 'Du kannst dich frühzeitig melden, um deinen Betreuungsbedarf und den voraussichtlichen Geburtstermin zu besprechen.',
        },
        {
          title: 'Wenn du noch unsicher bist',
          text:
            'Du musst noch nicht genau wissen, welche Unterstützung du brauchst. Auch offene Fragen kannst du in deiner Anfrage schildern.',
        },
        {
          title: 'Wenn dein Baby bereits da ist',
          text: 'Du benötigst Unterstützung nach der Geburt? Beschreibe kurz deine Situation, damit ich prüfen kann, ob eine Betreuung möglich ist.',
        },
        {
          title: 'Wenn später neue Fragen entstehen',
          text: 'Auch nach dem Wochenbett können Fragen auftauchen. Du kannst dich mit deinem Anliegen melden und eine mögliche Beratung klären.',
        },
      ],
    },
    faq: {
      title: 'Gut zu wissen',
      items: [
        {
          question: 'Wann sollte ich mit der Suche beginnen?',
          answer:
            'Möglichst früh in der Schwangerschaft. So bleibt mehr Zeit, eine Hebamme mit passenden Kapazitäten zu finden.',
        },
        {
          question: 'Was übernimmt die Krankenversicherung?',
          answer:
            'Gesetzlich Versicherte haben grundsätzlich Anspruch auf Hebammenhilfe in Schwangerschaft und Mutterschaft. Welche Leistungen im Einzelfall umfasst sind, richtet sich nach dem gesetzlichen Rahmen und der persönlichen Situation. Privat Versicherte sollten ihren Tarif prüfen.',
        },
        {
          question: 'Was sollte ich vor einer Betreuung klären?',
          answer:
            'Kläre, ob eine Betreuung an deinem Wohnort und im gewünschten Zeitraum möglich ist, und wie der weitere Ablauf aussieht.',
        },
        {
          question: 'Was gilt bei akuten Beschwerden?',
          answer:
            'Diese Website und WhatsApp sind keine Notfallkanäle. Bei Lebensgefahr oder starken Beschwerden wähle 112. Bei dringenden, nicht lebensbedrohlichen Beschwerden außerhalb ärztlicher Sprechzeiten hilft 116117.',
        },
      ],
    },
    about: {
      title: 'Marina Rymmer',
      lead: 'Hebamme in Nürnberg',
      languages: 'Deutsch / Русский',
    },
    profile: {
      title: 'Über Marina',
      introduction: 'Ich bin Marina Rymmer, Hebamme in Nürnberg. Ich begleite dich auf Deutsch und Russisch.',
      portrait: 'Marina Rymmer · Hebamme',
      pendingTitle: 'Persönlich begleitet',
      pending: 'Ich begleite dich während der Schwangerschaft, in der Vorbereitung auf deine Geburt und in der ersten Zeit mit deinem Baby. Dabei ist Platz für deine Fragen und das, was dich gerade beschäftigt.',
    },
    reviews: {
      title: 'Erfahrungen von Familien',
      intro: 'Persönliche Einblicke in die Begleitung durch Marina.',
    },
    contact: {
      title: 'Deine erste Anfrage',
      intro:
        'Für den Anfang reichen diese Angaben – auf Deutsch oder Russisch:',
      details: ['Dein Name', 'Dein Wohnort', 'Errechneter Geburtstermin, falls relevant', 'Dein Anliegen in wenigen Worten'],
      privacyNote:
        'Bitte sende medizinische Befunde, Fotos oder ausführliche Gesundheitsdaten nicht ungefragt über WhatsApp.',
      whatsapp: 'WhatsApp schreiben',
      phone: 'Jetzt anrufen',
    },
    footer: {
      imprint: 'Impressum',
      privacy: 'Datenschutz',
    },
    sources: {
      label: 'Quellen zu den allgemeinen Informationen:',
      health: 'gesund.bund.de',
      gkv: 'GKV-Spitzenverband',
      dhv: 'Deutscher Hebammenverband',
      emergency: 'Notfallnummern',
    },
    images: {
      heroAlt: 'Anonymes atmosphärisches Motiv einer Schwangeren am Fenster',
      step1Alt: 'Atmosphärisches Motiv einer Schwangerschaft',
      step2Alt: 'Atmosphärisches Motiv einer Schwangeren',
      step3Alt: 'Atmosphärisches Motiv eines Neugeborenen',
      step4Alt: 'Atmosphärisches Mutter-Kind-Motiv',
      supportAlt: 'Hand legt ein Smartphone neben gefaltete Babywäsche',
    },
  },
  ru: {
    meta: {
      title: 'Marina Rymmer | Акушерка в Нюрнберге',
      description: 'Marina Rymmer работает акушеркой в Нюрнберге и говорит на немецком и русском языках.',
    },
    aria: {
      home: 'На главную',
      skipToContent: 'Перейти к содержанию',
      languageSwitch: 'Выбрать язык',
      mainNavigation: 'Основная навигация',
      mobileNavigation: 'Мобильная навигация',
      menuOpen: 'Открыть меню',
      menuClose: 'Закрыть меню',
      contactOptions: 'Способы связи',
      legalNavigation: 'Правовая информация',
      quickContact: 'Быстрая связь',
      servicesCarousel: 'Поводы для обращения. На небольших экранах прокручивается горизонтально.',
      previousCard: 'Предыдущая карточка',
      nextCard: 'Следующая карточка',
      floatingPhone: 'Позвонить Marina Rymmer по номеру 0176 23488396',
      floatingWhatsapp: 'Открыть чат WhatsApp с Marina Rymmer',
    },
    brand: {
      subline: 'Акушерка',
    },
    nav: {
      orientation: 'Услуги',
      services: 'Когда обратиться',
      about: 'О Марине',
      reviews: 'Отзывы',
      knowledge: 'Полезно знать',
      contact: 'Контакты',
    },
    cta: {
      whatsapp: 'Написать в WhatsApp',
      call: '0176 23488396',
    },
    hero: {
      eyebrow: 'Акушерка в Нюрнберге',
      title: 'Марина Риммер',
      intro:
        'Ищете акушерку? Напишите мне по-русски или по-немецки. При общении мы уточним, смогу ли я вас сопровождать.',
      inquiryLink: 'Что написать в первом сообщении?',
    },
    services: {
      title: 'Когда стоит написать',
      cards: [
        {
          title: 'Как только вы узнали о беременности',
          text: 'Вы можете обратиться заранее, чтобы обсудить, какое сопровождение вам нужно, и предполагаемую дату родов.',
        },
        {
          title: 'Если вы пока не уверены',
          text:
            'Необязательно уже точно знать, какая поддержка вам нужна. В своём обращении вы также можете рассказать о ваших вопросах.',
        },
        {
          title: 'Если ваш малыш уже родился',
          text: 'Вам нужна поддержка после родов? Кратко опишите вашу ситуацию, чтобы я могла проверить, возможно ли сопровождение.',
        },
        {
          title: 'Если позже возникнут новые вопросы',
          text:
            'Вопросы могут возникнуть и после послеродового периода. Вы можете обратиться со своим вопросом и обсудить возможность консультации.',
        },
      ],
    },
    faq: {
      title: 'Полезно знать',
      items: [
        {
          question: 'Когда начинать поиск акушерки?',
          answer:
            'Лучше как можно раньше во время беременности. Так остаётся больше времени найти акушерку со свободными местами.',
        },
        {
          question: 'Что покрывает медицинская страховка?',
          answer:
            'При государственной медицинской страховке в целом есть право на помощь акушерки во время беременности и после родов. Конкретный объём зависит от правовых норм и личной ситуации. При частной страховке стоит проверить условия своего тарифа.',
        },
        {
          question: 'Что уточнить до начала сопровождения?',
          answer:
            'Уточните, возможно ли сопровождение по вашему месту жительства и в нужный период, а также каковы дальнейшие шаги.',
        },
        {
          question: 'Что делать при острых симптомах?',
          answer:
            'Этот сайт и WhatsApp не подходят для экстренных обращений. При угрозе жизни или тяжёлых симптомах звоните 112. Если помощь нужна срочно, но угрозы жизни нет, а врачебная практика закрыта, звоните 116117.',
        },
      ],
    },
    about: {
      title: 'Марина Риммер',
      lead: 'Акушерка в Нюрнберге',
      languages: 'Русский / Deutsch',
    },
    profile: {
      title: 'О Марине',
      introduction: 'Я Марина Риммер, акушерка в Нюрнберге. Я сопровождаю вас на немецком и русском языках.',
      portrait: 'Марина Риммер · Акушерка',
      pendingTitle: 'Индивидуальное сопровождение',
      pending: 'Я сопровождаю вас во время беременности, при подготовке к родам и в первое время с малышом. Здесь есть место для ваших вопросов и того, что вас сейчас волнует.',
    },
    reviews: {
      title: 'Отзывы семей',
      intro: 'Личный опыт семей, которых сопровождала Марина.',
    },
    contact: {
      title: 'Первое обращение',
      intro:
        'Для начала достаточно этих сведений — по-русски или по-немецки:',
      details: ['Ваше имя', 'Место жительства', 'Предполагаемая дата родов, если актуально', 'Кратко — с чем вы обращаетесь'],
      privacyNote:
        'Пожалуйста, не отправляйте без предварительной договорённости медицинские заключения, фотографии или подробные сведения о здоровье через WhatsApp.',
      whatsapp: 'Написать в WhatsApp',
      phone: 'Позвонить',
    },
    footer: {
      imprint: 'Импрессум',
      privacy: 'Защита данных',
    },
    sources: {
      label: 'Источники общей информации:',
      health: 'gesund.bund.de',
      gkv: 'GKV-Spitzenverband',
      dhv: 'Союз акушерок Германии',
      emergency: 'Экстренные номера',
    },
    images: {
      heroAlt: 'Атмосферное изображение беременной женщины у окна без узнаваемого лица',
      step1Alt: 'Атмосферное изображение на тему беременности',
      step2Alt: 'Атмосферное изображение беременной женщины',
      step3Alt: 'Атмосферное изображение новорождённого',
      step4Alt: 'Атмосферное изображение мамы с ребёнком',
      supportAlt: 'Рука кладёт смартфон рядом со сложенной детской тканью',
    },
  },
}

const menuToggle = document.querySelector('[data-menu-toggle]')
const mobileNav = document.querySelector('[data-mobile-nav]')
const floatingContact = document.querySelector('.floating-contact')
const mobileContact = document.querySelector('.mobile-contact')
const inquirySection = document.querySelector('#ablauf')
const contactSection = document.querySelector('#kontakt')
const servicesTrack = document.querySelector('[data-services-track]')
const updateReviewsLanguage = initializeReviews(document.querySelector('[data-reviews]'))
const updateMarinaServicesLanguage = initializeMarinaServices(document.querySelector('[data-marina-services]'))
const languageButtons = document.querySelectorAll('[data-lang-option]')
const translatableElements = document.querySelectorAll('[data-i18n]')

let activeLanguage = getStoredLanguage()
let isMenuOpen = false
let updateMobileContact = () => {}

function getStoredLanguage() {
  try {
    const storedLanguage = window.localStorage.getItem('preferred-language')
    return storedLanguage && translations[storedLanguage] ? storedLanguage : 'de'
  } catch {
    return 'de'
  }
}

function getTranslation(language, path) {
  return path.split('.').reduce((value, key) => value?.[key], translations[language])
}

function updateMenuLabel() {
  if (!menuToggle) return

  const key = isMenuOpen ? menuToggle.dataset.menuLabelCloseKey : menuToggle.dataset.menuLabelOpenKey
  const label = getTranslation(activeLanguage, key)

  if (typeof label === 'string') {
    menuToggle.setAttribute('aria-label', label)
  }
}

function applyLanguage(language, persist = true) {
  if (!translations[language]) return

  activeLanguage = language
  document.documentElement.lang = language

  translatableElements.forEach((element) => {
    const value = getTranslation(language, element.dataset.i18n)

    if (typeof value !== 'string') return

    const attributes = element.dataset.i18nAttr?.split(',').map((attribute) => attribute.trim())

    if (attributes?.length) {
      attributes.forEach((attribute) => element.setAttribute(attribute, value))
    } else if (element.dataset.i18n === 'faq.items.3.answer') {
      // Preserve the translated wording while linking only the two existing numbers.
      element.replaceChildren(...value.split(/\b(112|116117)\b/).map((part) => {
        if (part !== '112' && part !== '116117') return document.createTextNode(part)
        const link = document.createElement('a')
        link.href = `tel:${part}`
        link.textContent = part
        return link
      }))
    } else {
      element.textContent = value
    }
  })

  languageButtons.forEach((button) => {
    const isActive = button.dataset.langOption === language
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })

  updateMenuLabel()

  updateReviewsLanguage(language)
  updateMarinaServicesLanguage(language)
  updateMobileContact()

  if (persist) {
    try {
      window.localStorage.setItem('preferred-language', language)
    } catch {
      // The language still works when storage is unavailable.
    }
  }
}

function setMenuState(open) {
  if (!menuToggle || !mobileNav) return

  isMenuOpen = open
  menuToggle.classList.toggle('is-open', open)
  menuToggle.setAttribute('aria-expanded', String(open))
  mobileNav.classList.toggle('is-open', open)
  mobileNav.setAttribute('aria-hidden', String(!open))
  mobileNav.toggleAttribute('inert', !open)
  document.querySelector('main')?.toggleAttribute('inert', open)
  document.body.classList.toggle('menu-open', open)
  updateMenuLabel()
  updateMobileContact()

  if (open) {
    // Wait until the menu's visibility has been painted before moving focus.
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      if (isMenuOpen && document.activeElement === menuToggle) mobileNav.querySelector('a')?.focus({ preventScroll: true })
    }))
    // A delayed first paint must not leave keyboard focus behind the open menu.
    window.setTimeout(() => {
      if (isMenuOpen && document.activeElement === menuToggle) mobileNav.querySelector('a')?.focus({ preventScroll: true })
    }, 100)
  }
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.langOption))
})

menuToggle?.addEventListener('click', () => setMenuState(!isMenuOpen))

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    setMenuState(false)
    const target = document.querySelector(link.getAttribute('href'))
    if (target) {
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
  })
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isMenuOpen) {
    setMenuState(false)
    menuToggle?.focus()
  }
  if (event.key === 'Tab' && isMenuOpen) {
    const controls = [...document.querySelectorAll('.site-header a, .site-header button')]
      .filter(element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden')
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 1199 && isMenuOpen) {
    setMenuState(false)
  }
})

function initializeReveals() {
  const revealElements = [...document.querySelectorAll('[data-reveal]')]
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!revealElements.length || prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'))
    return
  }

  document.documentElement.classList.add('reveal-ready')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12,
    },
  )

  revealElements.forEach((element) => observer.observe(element))
}

function initializeFloatingContact() {
  const hideWithinSections = [inquirySection, contactSection].filter(Boolean)
  if (!floatingContact || !hideWithinSections.length || !('IntersectionObserver' in window)) return

  const intersectionState = new Map(hideWithinSections.map((section) => [section, false]))

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => intersectionState.set(entry.target, entry.isIntersecting))
    const isHidden = [...intersectionState.values()].some(Boolean)

    floatingContact.classList.toggle('is-hidden', isHidden)
    floatingContact.toggleAttribute('inert', isHidden)
    floatingContact.setAttribute('aria-hidden', String(isHidden))
  })

  hideWithinSections.forEach((section) => observer.observe(section))
}

function initializeMobileContact() {
  const hero = document.querySelector('.hero-section')
  const header = document.querySelector('.site-header')
  const cardControls = document.querySelector('[data-services-controls]')
  const contactWhatsapp = document.querySelector('.contact-actions a[href*="wa.me"]')
  if (!mobileContact || !hero || !servicesTrack || !cardControls || !contactWhatsapp || !header) return

  const mobile = window.matchMedia('(max-width: 719px)')
  let scheduled = false
  let heroPassed = false
  let cardsInView = false
  let contactReachable = false
  updateMobileContact = () => {
    scheduled = false
    // Keep the dock measurable while hidden on mobile, including its safe-area padding.
    mobileContact.hidden = !mobile.matches
    const viewportTop = window.visualViewport?.offsetTop || 0
    const viewportBottom = viewportTop + (window.visualViewport?.height || window.innerHeight)
    const headerBottom = Math.max(viewportTop, header.getBoundingClientRect().bottom)
    const heroBottom = hero.getBoundingClientRect().bottom
    heroPassed = heroBottom <= headerBottom - (heroPassed ? 0 : 16)

    // One continuous exclusion zone: every card, its text and the complete control row.
    // Enter before the zone is visible; leave further away to absorb small scroll reversals.
    const cardMargin = cardsInView ? 32 : 16
    cardsInView = servicesTrack.getBoundingClientRect().top < viewportBottom + cardMargin
      && Math.max(servicesTrack.getBoundingClientRect().bottom, cardControls.getBoundingClientRect().bottom) > headerBottom - cardMargin

    const dockStyle = getComputedStyle(mobileContact)
    const bottomPadding = parseFloat(dockStyle.paddingBottom) || 0
    const safeArea = Math.max(0, bottomPadding - (parseFloat(dockStyle.paddingTop) || 0))
    const contact = contactWhatsapp.getBoundingClientRect()
    // Hand over once the entire regular button fits. Keep it in charge while at least
    // a 44px-high target remains reachable, avoiding two competing WhatsApp buttons.
    contactReachable = contactReachable
      ? Math.min(contact.bottom, viewportBottom - safeArea) - Math.max(contact.top, headerBottom) >= 44
      : contact.top >= headerBottom + 8 && contact.bottom <= viewportBottom - bottomPadding

    const enoughHeight = viewportBottom - viewportTop > 420
    const show = mobile.matches && enoughHeight && !isMenuOpen
      && heroPassed && !cardsInView && !contactReachable
    mobileContact.classList.toggle('is-visible', show)
    mobileContact.inert = !show
    mobileContact.setAttribute('aria-hidden', String(!show))
    document.documentElement.classList.toggle('mobile-contact-visible', show)
  }
  const schedule = () => {
    if (scheduled) return
    scheduled = true
    window.requestAnimationFrame(updateMobileContact)
  }
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  window.visualViewport?.addEventListener('resize', schedule)
  window.visualViewport?.addEventListener('scroll', schedule)
  // A first-visit reveal can move the regular action into reach without another scroll.
  contactWhatsapp.closest('[data-reveal]')?.addEventListener('transitionend', schedule)
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule)
    observer.observe(document.querySelector('main'))
  }
  // Keep keyboard targets above the dock, including controls near the bottom edge.
  document.addEventListener('focusin', event => {
    if (mobileContact.inert || !event.target.closest('main') || !event.target.matches('a,button,summary')) return
    const bottom = event.target.getBoundingClientRect().bottom
    const safeBottom = mobileContact.getBoundingClientRect().top - 12
    if (bottom > safeBottom) window.scrollBy({ top: bottom - safeBottom, behavior: 'instant' })
  })
  updateMobileContact()
}

function initializeServicesTrack() {
  if (!servicesTrack) return

  const mobileQuery = window.matchMedia('(max-width: 719px)')
  const controls = document.querySelector('[data-services-controls]')
  const previous = document.querySelector('[data-services-prev]')
  const next = document.querySelector('[data-services-next]')
  const currentNumber = document.querySelector('[data-services-current]')
  const cards = [...servicesTrack.querySelectorAll('.service-card')]
  let current = -1
  const updatePosition = () => {
    if (!mobileQuery.matches) return
    const left = servicesTrack.getBoundingClientRect().left
    const distances = cards.map(card => Math.abs(card.getBoundingClientRect().left - left))
    const index = servicesTrack.scrollLeft + servicesTrack.clientWidth >= servicesTrack.scrollWidth - 2
      ? cards.length - 1 : distances.indexOf(Math.min(...distances))
    if (index === current) return
    current = index
    previous.disabled = current === 0
    next.disabled = current === cards.length - 1
    currentNumber.textContent = String(current + 1).padStart(2, '0')
    controls.style.setProperty('--services-progress', (current + 1) / cards.length)
    cards.forEach((card, cardIndex) => card.classList.toggle('is-current', cardIndex === current))
  }
  const goTo = (index) => {
    const card = cards[Math.max(0, Math.min(cards.length - 1, index))]
    const left = card.getBoundingClientRect().left - servicesTrack.getBoundingClientRect().left + servicesTrack.scrollLeft
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    servicesTrack.scrollTo({ left, behavior: reduced ? 'instant' : 'smooth' })
  }
  const updateTabStop = () => {
    controls.hidden = !mobileQuery.matches
    if (mobileQuery.matches) {
      servicesTrack.setAttribute('tabindex', '0')
      updatePosition()
    } else {
      servicesTrack.removeAttribute('tabindex')
      cards.forEach(card => card.classList.remove('is-current'))
      current = -1
    }
  }

  updateTabStop()
  mobileQuery.addEventListener?.('change', updateTabStop)
  servicesTrack.addEventListener('scroll', updatePosition, { passive: true })
  window.addEventListener('resize', updatePosition)
  previous.addEventListener('click', () => goTo(current - 1))
  next.addEventListener('click', () => goTo(current + 1))

  servicesTrack.addEventListener('keydown', (event) => {
    if (!mobileQuery.matches || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

    event.preventDefault()
    if (event.key === 'Home') goTo(0)
    else if (event.key === 'End') goTo(cards.length - 1)
    else goTo(current + (event.key === 'ArrowRight' ? 1 : -1))
  })
}

function initializeNavigationState() {
  const sections = [...document.querySelectorAll('main > section')]
  const links = [...document.querySelectorAll('.desktop-nav a, .mobile-nav a')]
  let scheduled = false
  const update = () => {
    scheduled = false
    const offset = document.querySelector('.site-header').offsetHeight + 40
    const current = sections.filter(section => section.getBoundingClientRect().top <= offset).at(-1)
    links.forEach(link => {
      if (current?.id && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    })
  }
  const schedule = () => {
    if (scheduled) return
    scheduled = true
    window.requestAnimationFrame(update)
  }
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  update()
}

applyLanguage(activeLanguage, false)
setMenuState(false)
initializeReveals()
initializeFloatingContact()
initializeMobileContact()
initializeServicesTrack()
initializeNavigationState()
