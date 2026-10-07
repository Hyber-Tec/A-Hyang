import { RESTAURANT } from '../data/restaurant'
import { DAY_NAMES, formatTime, useOpenStatus } from '../lib/hours'
import { useLang } from '../lib/i18n'

/** "Open now · until 10 PM" / "Closed · opens 11 AM" — live, in the restaurant's time zone. */
export function OpenBadge({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const { lang } = useLang()
  const { status } = useOpenStatus(RESTAURANT.hours)

  let label: string
  if (status.open) {
    const until = formatTime(status.closesAt, lang)
    label =
      lang === 'ko'
        ? `${status.closingSoon ? '곧 마감' : '영업 중'} · ${until}까지`
        : `${status.closingSoon ? 'Closing soon' : 'Open now'} · until ${until}`
  } else if (status.opensAt !== undefined && status.opensDay !== undefined) {
    const at = formatTime(status.opensAt, lang)
    const when = status.opensToday
      ? lang === 'ko' ? `오늘 ${at}` : at
      : status.opensTomorrow
        ? lang === 'ko' ? `내일 ${at}` : `tomorrow ${at}`
        : lang === 'ko' ? `${DAY_NAMES.ko[status.opensDay]} ${at}` : `${DAY_NAMES.en[status.opensDay]} ${at}`
    label = lang === 'ko' ? `영업 준비 중 · ${when} 오픈` : `Closed · opens ${when}`
  } else {
    label = lang === 'ko' ? '영업 준비 중' : 'Closed now'
  }

  const dot = status.open ? (status.closingSoon ? 'bg-gold text-gold' : 'bg-leaf text-leaf') : 'bg-chili text-chili'
  const surface = tone === 'dark' ? 'border-white/15 bg-black/30 text-paper backdrop-blur-md' : 'border-ink/15 bg-white/60 text-ink'
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[0.9rem] font-medium ${surface} ${className}`}>
      <span className={`relative h-2.5 w-2.5 rounded-full ${dot} ${status.open ? 'animate-pulse-dot' : ''}`} />
      {label}
    </span>
  )
}
