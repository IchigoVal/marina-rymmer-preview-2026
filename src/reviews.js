import snapshot from './data/reviews/reviews.public.json'
import googleMark from './assets/google-g.png'
import './reviews.css'

const copy = {
  de: {
    average: 'Google-Bewertung im Durchschnitt',
    total: total => 'Aus ' + total + ' Bewertungen',
    snapshot: date => 'Stand: ' + date,
    google: 'Rezensionen auf Google',
    newTab: 'öffnet in einem neuen Tab',
    dateContext: date => 'Zeitangabe von Google beim Abruf am ' + date,
    read: 'Weiterlesen',
    close: 'Schließen',
    rating: value => value + ' von 5 Sternen',
    more: count => count + ' weitere Bewertungen',
    progress: (visible, total) => visible + ' von ' + total + ' Textbewertungen',
    complete: 'Alle Textbewertungen sind angezeigt.',
    reset: 'Wieder weniger anzeigen',
  },
  ru: {
    average: 'Средняя оценка в Google',
    total: total => 'На основе ' + total + ' оценок',
    snapshot: date => 'Данные на ' + date,
    google: 'Отзывы в Google',
    newTab: 'откроется в новой вкладке',
    dateContext: date => 'Срок, указанный Google при сборе данных ' + date,
    read: 'Читать полностью',
    close: 'Закрыть',
    rating: value => value + ' из 5 звёзд',
    more: count => 'Показать ещё ' + count,
    progress: (visible, total) => visible + ' из ' + total + ' отзывов с текстом',
    complete: 'Показаны все отзывы с текстом.',
    reset: 'Снова показать меньше',
  },
}

function element(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

function writeReviewText(node, review) {
  node.dir = 'auto'
  // Keep every source character, including mixed-language paragraphs.
  node.replaceChildren(...review.text.split(/(\n)/).map(part => {
    const span = element('span', null, part)
    span.lang = /[А-Яа-яЁё]/u.test(part) ? 'ru' : review.language === 'ru' ? 'de' : review.language
    return span
  }))
}

function googleDate(value, language) {
  if (language === 'de') return value
  const match = value.match(/^(Bearbeitet: )?vor (einem|\d+) (Monat(?:en)?|Jahr(?:en)?)$/)
  if (!match) return value
  const amount = match[2] === 'einem' ? 1 : Number(match[2])
  const date = new Intl.RelativeTimeFormat('ru', { numeric: 'always' })
    .format(-amount, match[3].startsWith('Monat') ? 'month' : 'year')
  return (match[1] ? 'Изменено: ' : '') + date
}

export function initializeReviews(root) {
  if (!root) return () => {}
  let language = 'de'
  // Match the existing single-column review breakpoint.
  const mobileViewport = window.matchMedia('(max-width: 719px)')
  const pageSize = () => mobileViewport.matches ? 3 : 6
  let visible = pageSize()
  let activeReview = null
  let returnFocus = null
  let measurementFrame = 0
  const labels = new Map()
  const textReviews = snapshot.reviews
  const t = () => copy[language]
  const captureDate = () => new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin',
  }).format(new Date(snapshot.capturedAt))

  const summary = element('div', 'reviews-summary')
  const score = element('span', 'reviews-score')
  score.setAttribute('role', 'img')
  const summaryCopy = element('div', 'reviews-summary-copy')
  const average = element('p', 'reviews-average')
  const total = element('p', 'reviews-total')
  const source = element('p', 'reviews-source')
  const provenance = element('div', 'reviews-provenance')
  const googleLink = element('a', 'reviews-google-link')
  googleLink.href = snapshot.sourceUrl
  googleLink.target = '_blank'
  googleLink.rel = 'noopener noreferrer'
  googleLink.referrerPolicy = 'no-referrer'
  const googleLogo = element('img', 'reviews-google-logo')
  googleLogo.src = googleMark
  googleLogo.alt = ''
  googleLogo.width = 54
  googleLogo.height = 54
  googleLogo.setAttribute('aria-hidden', 'true')
  const googleLabel = element('span', 'reviews-google-label')
  const externalIcon = element('span', null, '↗')
  externalIcon.setAttribute('aria-hidden', 'true')
  googleLink.append(googleLogo, googleLabel, externalIcon)
  summaryCopy.append(average, total)
  provenance.append(source, googleLink)
  summary.append(score, summaryCopy, provenance)

  const list = element('ul', 'reviews-list')
  list.setAttribute('role', 'list')
  list.id = 'reviews-list'
  list.setAttribute('aria-labelledby', 'reviews-heading')
  const footer = element('div', 'reviews-footer')
  const progress = element('p', 'reviews-progress')
  progress.setAttribute('role', 'status')
  progress.setAttribute('aria-atomic', 'true')
  const actions = element('div', 'reviews-actions')
  const more = element('button', 'btn btn--secondary reviews-more')
  more.type = 'button'
  more.setAttribute('aria-controls', list.id)
  const moreLabel = element('span', 'btn__label')
  const moreIcon = element('span', 'btn__icon reviews-more-icon', '+')
  moreIcon.setAttribute('aria-hidden', 'true')
  more.append(moreLabel, moreIcon)
  const reset = element('button', 'reviews-reset')
  reset.type = 'button'
  reset.setAttribute('aria-controls', list.id)
  actions.append(more, reset)
  footer.append(progress, actions)

  // One native reading dialog keeps the underlying rows and their order stable.
  const reader = element('dialog', 'review-reader')
  reader.id = 'review-reader'
  reader.setAttribute('aria-labelledby', 'review-reader-author')
  const readerHeader = element('div', 'review-reader-header')
  const readerAuthor = element('h3', 'review-author')
  readerAuthor.id = 'review-reader-author'
  readerAuthor.tabIndex = -1
  const close = element('button', 'review-reader-close')
  close.type = 'button'
  readerHeader.append(readerAuthor, close)
  const readerBody = element('div', 'review-reader-body')
  readerBody.tabIndex = 0
  const readerFacts = element('div', 'review-facts')
  const readerRating = element('span', 'review-rating')
  readerRating.setAttribute('role', 'img')
  const readerDate = element('span', 'review-date')
  readerFacts.append(readerRating, readerDate)
  const readerQuote = element('blockquote', 'review-reader-quote')
  const readerText = element('p', 'review-text')
  readerQuote.append(readerText)
  readerBody.append(readerFacts, readerQuote)
  reader.append(readerHeader, readerBody)
  root.replaceChildren(summary, list, footer, reader)

  function updateDate(node, review) {
    node.textContent = googleDate(review.dateDisplayed, language)
    node.title = t().dateContext(captureDate())
  }

  function writeRating(node, review) {
    node.setAttribute('aria-label', t().rating(review.rating))
    const stars = element('span', null, '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating))
    stars.setAttribute('aria-hidden', 'true')
    node.replaceChildren(stars)
  }

  function updateReader() {
    close.textContent = t().close
    if (!activeReview) return
    readerAuthor.replaceChildren(element('bdi', null, activeReview.author))
    writeRating(readerRating, activeReview)
    updateDate(readerDate, activeReview)
  }

  function openReader(review, trigger) {
    activeReview = review
    returnFocus = trigger
    writeReviewText(readerText, review)
    updateReader()
    reader.showModal()
    document.documentElement.style.setProperty('--review-scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + 'px')
    document.documentElement.classList.add('review-reader-open')
    readerBody.scrollTop = 0
    readerAuthor.focus({ preventScroll: true })
  }

  close.addEventListener('click', () => reader.close())
  reader.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return
    if (event.shiftKey && (document.activeElement === close || document.activeElement === readerAuthor)) {
      event.preventDefault()
      readerBody.focus()
    } else if (!event.shiftKey && document.activeElement === readerBody) {
      event.preventDefault()
      close.focus()
    }
  })
  reader.addEventListener('click', event => {
    const rect = reader.getBoundingClientRect()
    if (event.target === reader && (event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom)) reader.close()
  })
  reader.addEventListener('close', () => {
    document.documentElement.classList.remove('review-reader-open')
    document.documentElement.style.removeProperty('--review-scrollbar-width')
    const target = returnFocus?.hidden ? returnFocus.closest('article') : returnFocus
    target?.focus({ preventScroll: true })
    activeReview = null
  })

  function updateFooter() {
    const all = visible >= textReviews.length
    progress.textContent = t().progress(Math.min(visible, textReviews.length), textReviews.length)
      + (all ? ' · ' + t().complete : '')
    more.hidden = all
    moreLabel.textContent = t().more(Math.min(pageSize(), textReviews.length - visible))
    reset.hidden = visible <= pageSize()
    reset.textContent = t().reset
  }

  function measurePreviews() {
    if (measurementFrame) return
    measurementFrame = requestAnimationFrame(() => {
      measurementFrame = 0
      for (const item of list.children) {
        const text = item.querySelector('.review-text')
        const toggle = item.querySelector('.review-toggle')
        const truncated = text.scrollHeight > text.clientHeight + 1
        if (!truncated && document.activeElement === toggle) item.querySelector('article').focus({ preventScroll: true })
        toggle.hidden = !truncated
      }
    })
  }

  function makeReview(review) {
    const item = element('li', 'review-item')
    item.dataset.reviewId = review.id
    const article = element('article', 'review')
    article.tabIndex = -1
    const name = element('h3', 'review-author')
    name.id = 'review-author-' + review.id
    name.append(element('bdi', null, review.author))
    article.setAttribute('aria-labelledby', name.id)
    const rating = element('span', 'review-rating')
    rating.setAttribute('role', 'img')
    const date = element('span', 'review-date')
    const facts = element('div', 'review-facts')
    facts.append(rating, date)
    const meta = element('div', 'review-meta')
    meta.append(name, facts)
    const quote = element('blockquote', 'review-quote')
    const text = element('p', 'review-text')
    writeReviewText(text, review)
    quote.append(text)
    const toggle = element('button', 'review-toggle')
    toggle.type = 'button'
    toggle.setAttribute('aria-haspopup', 'dialog')
    toggle.setAttribute('aria-controls', reader.id)
    toggle.addEventListener('click', () => openReader(review, toggle))
    article.append(meta, quote, toggle)
    const update = () => {
      writeRating(rating, review)
      updateDate(date, review)
      toggle.textContent = t().read
      toggle.setAttribute('aria-label', t().read + ' – ' + review.author)
    }
    update()
    labels.set(review.id, update)
    item.append(article)
    return item
  }

  function render() {
    labels.clear()
    list.replaceChildren(...textReviews.slice(0, visible).map(makeReview))
    updateFooter()
    measurePreviews()
  }
  more.addEventListener('click', () => {
    const start = visible
    visible = Math.min(visible + pageSize(), textReviews.length)
    const newItems = textReviews.slice(start, visible).map(makeReview)
    list.append(...newItems)
    updateFooter()
    measurePreviews()
    const first = newItems[0]?.querySelector('article')
    first?.focus({ preventScroll: true })
    first?.scrollIntoView({ block: 'start', behavior: 'instant' })
  })
  reset.addEventListener('click', () => {
    visible = pageSize()
    render()
    list.querySelector('article')?.focus({ preventScroll: true })
    root.closest('section').scrollIntoView({ block: 'start', behavior: 'instant' })
  })
  render()
  mobileViewport.addEventListener('change', () => {
    const resetHadFocus = document.activeElement === reset
    // Never remove already visible reviews on resize or disturb an open reader.
    // A wider initial view gets at least six; future clicks use the current step.
    const minimum = Math.min(pageSize(), textReviews.length)
    if (visible < minimum) {
      list.append(...textReviews.slice(visible, minimum).map(makeReview))
      visible = minimum
      measurePreviews()
    }
    updateFooter()
    if (resetHadFocus && reset.hidden) list.querySelector('article')?.focus({ preventScroll: true })
  })
  // Re-evaluate real clipping after font loading, localization and viewport changes.
  if ('ResizeObserver' in window) new ResizeObserver(measurePreviews).observe(list)
  window.addEventListener('resize', measurePreviews)
  document.fonts?.ready.then(measurePreviews)

  return nextLanguage => {
    language = copy[nextLanguage] ? nextLanguage : 'de'
    const formattedRating = snapshot.summary.rating.toLocaleString(language, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    score.textContent = formattedRating
    score.setAttribute('aria-label', t().average + ': ' + t().rating(formattedRating))
    average.textContent = t().average
    total.textContent = t().total(snapshot.summary.total)
    source.textContent = t().snapshot(captureDate())
    googleLabel.textContent = t().google
    googleLink.setAttribute('aria-label', t().google + ' (' + t().newTab + ')')
    labels.forEach(update => update())
    updateReader()
    updateFooter()
    measurePreviews()
  }
}
