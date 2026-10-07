import { useMemo } from 'react'
import { PRESS, REVIEWS, RATINGS, type Review } from '../data/content'
import { useLang, useT, type Lang } from '../lib/i18n'
import { MaskText, Reveal } from '../components/motion'
import { SectionLabel } from '../components/SectionLabel'
import { QuoteIcon, StarIcon } from '../components/icons'

function Stars({ value, className = 'h-4 w-4' }: { value: number; className?: string }) {
  return (
    <span className="flex gap-0.5 text-gold" role="img" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className="relative">
          <StarIcon filled={false} className={`${className} text-gold/40`} />
          <span className="absolute inset-0 overflow-hidden" style={{ width: `${Math.max(0, Math.min(1, value - n + 1)) * 100}%` }}>
            <StarIcon className={className} />
          </span>
        </span>
      ))}
    </span>
  )
}

function ReviewCard({ r, lang }: { r: Review; lang: Lang }) {
  const showTranslation = lang === 'en' && r.lang === 'ko' && r.translation
  return (
    <figure className="flex h-full w-[82vw] max-w-[420px] shrink-0 flex-col justify-between rounded-[24px] border border-white/10 bg-ink-2 p-7 md:w-[420px] md:p-8">
      <div>
        <div className="flex items-center justify-between">
          {r.rating ? <Stars value={r.rating} /> : <span className="eyebrow text-[0.7rem] text-muted">{r.source}</span>}
          <QuoteIcon className="h-7 w-7 text-white/10" />
        </div>
        <blockquote className={`mt-5 text-[1.12rem] leading-relaxed text-paper/90 ${r.lang === 'ko' && !showTranslation ? 'font-batang' : ''}`}>
          “{showTranslation ? r.translation : r.text}”
        </blockquote>
        {showTranslation && <p className="mt-3 font-batang text-[0.92rem] leading-relaxed text-muted">{r.text}</p>}
      </div>
      <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 font-semibold text-gold">{r.author.replace(/^r\//, '').slice(0, 1).toUpperCase()}</span>
        <span>
          <span className="block font-semibold text-paper">{r.author}</span>
          <span className="block text-[0.85rem] text-muted">
            {r.source}
            {r.date ? ` · ${r.date}` : ''}
            {showTranslation ? ' · translated from Korean' : ''}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

function Row({ items, lang, reverse = false, duration = 70 }: { items: Review[]; lang: Lang; reverse?: boolean; duration?: number }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="flex w-max animate-marquee items-stretch gap-5 pr-5 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ ['--marquee-duration' as string]: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {[...items, ...items].map((r, i) => (
          <div key={i} aria-hidden={i >= items.length} className="flex">
            <ReviewCard r={r} lang={lang} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Reviews() {
  const t = useT()
  const { lang } = useLang()
  // Korean readers see the Korean-language reviews first.
  const ordered = useMemo(() => (lang === 'ko' ? [...REVIEWS.filter((r) => r.lang === 'ko'), ...REVIEWS.filter((r) => r.lang === 'en')] : REVIEWS), [lang])
  const half = Math.ceil(ordered.length / 2)

  return (
    <section id="reviews" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel index="05">{t({ en: 'Reviews', ko: '손님 리뷰' })}</SectionLabel>
            <MaskText
              as="h2"
              className={`mt-6 ${lang === 'ko' ? 'font-batang text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.12] font-bold' : 'font-display text-[clamp(2.7rem,7vw,6.6rem)] leading-[0.95] font-[380]'}`}
              lines={lang === 'ko' ? ['단골손님들이', <span className="text-gold">먼저 알아봤습니다.</span>] : ['Our regulars', <span className="italic text-gold">say it best.</span>]}
            />
          </div>
          <Reveal delay={0.15} className="md:col-span-4">
            <div className="rounded-[24px] border border-white/10 bg-ink-2 p-7">
              <div className="flex items-end gap-4">
                <span className="font-display text-7xl leading-none font-[400] text-paper">{RATINGS.google.score.toFixed(1)}</span>
                <div className="pb-1.5">
                  <Stars value={RATINGS.google.score} className="h-5 w-5" />
                  <p className="mt-1.5 text-[0.95rem] text-muted">
                    {t({ en: `Google · ${RATINGS.google.countLabel} reviews`, ko: `Google 리뷰 ${RATINGS.google.countLabel}개` })}
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-[0.95rem] text-paper/80">
                {RATINGS.others.map((o) => (
                  <li key={o.source} className="flex justify-between">
                    <span>{o.source}</span>
                    <span className="tabular-nums">
                      {o.score.toFixed(1)} <span className="text-gold">★</span> <span className="text-muted">({t({ en: `${o.countLabel} ratings`, ko: `평가 ${o.countLabel}개` })})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Press */}
        <Reveal className="mt-16 md:mt-24">
          <figure className="relative mx-auto max-w-5xl border-y border-white/10 py-10 text-center md:py-14">
            <QuoteIcon className="mx-auto h-9 w-9 text-gold/70" />
            <blockquote className="mx-auto mt-6 max-w-4xl">
              <p className="font-batang text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.45] font-bold text-paper">{PRESS.quote.ko}</p>
              {lang === 'en' && <p className="mt-4 font-display text-[clamp(1.15rem,2vw,1.5rem)] italic text-paper/70">{PRESS.quote.en}</p>}
            </blockquote>
            <figcaption className="eyebrow mt-7 text-gold">— {t(PRESS.source)}</figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="mt-16 space-y-5 md:mt-20" key={lang}>
        <Row items={ordered.slice(0, half)} lang={lang} duration={95} />
        <Row items={ordered.slice(half)} lang={lang} reverse duration={105} />
      </div>
      <p className="mx-auto mt-8 max-w-[1400px] px-5 text-[0.9rem] text-muted md:px-8">
        {t({
          en: 'Real reviews from Google, Yelp, DoorDash and Reddit, quoted as written.',
          ko: '* Google, Yelp, DoorDash, Reddit의 실제 리뷰를 원문 그대로 옮겼습니다.',
        })}
      </p>
    </section>
  )
}
