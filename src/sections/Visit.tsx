import type { ReactNode } from 'react'
import { RESTAURANT } from '../data/restaurant'
import { DAY_NAMES, formatTime, useOpenStatus } from '../lib/hours'
import { useLang, useT } from '../lib/i18n'
import { Img } from '../components/Img'
import { OpenBadge } from '../components/OpenBadge'
import { MaskText, Reveal } from '../components/motion'
import { BagIcon, CarIcon, ClockIcon, InstagramIcon, NavigationIcon, PhoneIcon, PinIcon, UtensilsIcon } from '../components/icons'
import { SectionLabel } from '../components/SectionLabel'

const ORDER = [1, 2, 3, 4, 5, 6, 0] // Monday first

export function Visit() {
  const t = useT()
  const { lang } = useLang()
  const { today } = useOpenStatus(RESTAURANT.hours)

  return (
    <section id="visit" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="06" tone="light">{t({ en: 'Visit us', ko: '오시는 길' })}</SectionLabel>
            <MaskText
              as="h2"
              className="mt-6 font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] font-[420]"
              lines={
                lang === 'ko'
                  ? ['배고픈 날,', <span className="text-leaf-deep">애향으로 오세요.</span>]
                  : ['Come hungry.', <span className="italic text-leaf-deep">Leave happy.</span>]
              }
            />
          </div>
          <Reveal delay={0.2}>
            <OpenBadge tone="light" className="text-base" />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Info */}
          <div className="min-w-0 space-y-10 lg:col-span-5">
            <Reveal className="space-y-4">
              <InfoRow icon={<PinIcon className="h-5 w-5" />} title={t({ en: 'Address', ko: '주소' })}>
                <p className="text-[1.2rem] font-semibold leading-snug break-words md:text-2xl">
                  {RESTAURANT.street}
                  <br />
                  {RESTAURANT.city}
                </p>
                <p className="mt-1 text-muted-ink">
                  {t({ en: `Inside ${RESTAURANT.plaza.en} (${RESTAURANT.plaza.ko})`, ko: `${RESTAURANT.plaza.ko} (Nukoa Plaza) 내` })}
                </p>
              </InfoRow>
              <div className="grid gap-3 sm:flex sm:flex-wrap sm:pl-14">
                <a
                  href={RESTAURANT.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-semibold text-paper transition-transform hover:scale-[1.03] active:scale-95 sm:py-3.5"
                >
                  <NavigationIcon className="h-4 w-4" />
                  {t({ en: 'Get directions', ko: '길찾기' })}
                </a>
                <a
                  href={RESTAURANT.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-4 font-semibold transition-colors hover:bg-ink hover:text-paper sm:py-3.5"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {RESTAURANT.phone}
                </a>
                <a
                  href={RESTAURANT.orderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-4 font-semibold transition-colors hover:bg-ink hover:text-paper sm:py-3.5"
                >
                  <BagIcon className="h-4 w-4" />
                  {t({ en: 'Order online', ko: '온라인 주문' })}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <InfoRow icon={<ClockIcon className="h-5 w-5" />} title={t({ en: 'Hours', ko: '영업시간' })}>
                <table className="mt-1 w-full max-w-md text-[0.98rem] sm:text-[1.05rem]">
                  <tbody>
                    {ORDER.map((d) => {
                      const h = RESTAURANT.hours[d]
                      const isToday = d === today
                      return (
                        <tr key={d} className={`border-b border-ink/10 last:border-0 ${isToday ? 'font-semibold' : ''}`}>
                          <th scope="row" className="py-2.5 pr-3 text-left font-[inherit]">
                            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                              {isToday && <span className="h-1.5 w-1.5 rounded-full bg-leaf-deep" />}
                              <span className="whitespace-nowrap">{DAY_NAMES[lang][d]}</span>
                              {isToday && (
                                <span className="rounded-full bg-ink px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-paper">
                                  {t({ en: 'TODAY', ko: '오늘' })}
                                </span>
                              )}
                            </span>
                          </th>
                          <td className="py-2.5 text-right whitespace-nowrap tabular-nums">
                            {h ? `${formatTime(h.open, lang)} – ${formatTime(h.close, lang)}` : t({ en: 'Closed', ko: '휴무' })}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <p className="mt-4 inline-flex items-start gap-2 rounded-2xl bg-gold/20 px-4 py-2.5 text-[0.95rem] leading-snug font-semibold text-gold-deep">
                  <UtensilsIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  {t(RESTAURANT.lunchSpecial)}
                </p>
              </InfoRow>
            </Reveal>

            <Reveal delay={0.15}>
              <InfoRow icon={<CarIcon className="h-5 w-5" />} title={t({ en: 'Parking & groups', ko: '주차 · 단체' })}>
                <p className="text-[1.05rem] leading-relaxed text-ink/80">
                  {t({
                    en: 'Free parking in the Nukoa Plaza lot — usually plenty of spaces. Reservations welcome; call ahead for groups.',
                    ko: '뉴코아 플라자 주차장 무료 이용 (대부분 여유 있습니다). 예약 가능하며, 단체 손님은 미리 전화 주세요.',
                  })}
                </p>
              </InfoRow>
            </Reveal>

            {RESTAURANT.instagramUrl && (
              <Reveal delay={0.2}>
                <InfoRow icon={<InstagramIcon className="h-5 w-5" />} title="Instagram">
                  <a href={RESTAURANT.instagramUrl} target="_blank" rel="noreferrer" className="text-[1.05rem] font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                    @{RESTAURANT.instagramHandle}
                  </a>
                </InfoRow>
              </Reveal>
            )}
          </div>

          {/* Map + storefront */}
          <Reveal className="relative min-w-0 lg:col-span-7" delay={0.1}>
            <div className="relative h-[420px] overflow-hidden rounded-[28px] border border-ink/10 bg-paper-2 shadow-[0_30px_80px_-30px_rgba(18,16,14,0.45)] md:h-[560px]">
              <iframe
                title={t({ en: 'Map to A-Hyang', ko: '애향 위치 지도' })}
                src={RESTAURANT.mapEmbedUrl}
                className="h-full w-full grayscale-[0.25]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <figure className="absolute -bottom-10 left-4 w-[58%] max-w-[320px] rotate-[-2.5deg] rounded-2xl bg-cream p-2.5 pb-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] md:-left-8 md:w-[46%]">
              <Img name="storefront" alt={t({ en: 'The A-Hyang storefront with its green sign', ko: '초록색 간판의 애향 외관' })} sizes="320px" className="aspect-[4/3] rounded-xl" />
              <figcaption className="mt-2.5 px-1 text-[0.85rem] font-semibold text-ink/80">
                {t({ en: 'Look for the green sign ↑', ko: '초록색 간판을 찾아주세요 ↑' })}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-paper sm:h-10 sm:w-10">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="eyebrow mb-2 text-muted-ink">{title}</p>
        {children}
      </div>
    </div>
  )
}
