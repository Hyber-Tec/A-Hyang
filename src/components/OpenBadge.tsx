import { RESTAURANT } from '../data/restaurant'
import { DAY_NAMES, formatTime, useOpenStatus, type OpenStatus } from '../lib/hours'
import { useLang, type Lang } from '../lib/i18n'

/**
 * "Open now · until 10 PM" / "Closed · opens 11 AM". In Korean the closed state says why:
 * 영업 준비 중 before opening, 오늘 휴무 on the day off, 영업 종료 after closing.
 */
export function openLabel(status: OpenStatus, today: number, lang: Lang) {
  const ko = lang === 'ko'
  if (status.open) {
    const until = formatTime(status.closesAt, lang)
    return ko ? `${status.closingSoon ? '곧 마감' : '영업 중'} · ${until}까지` : `${status.closingSoon ? 'Closing soon' : 'Open now'} · until ${until}`
  }
  const dayOff = RESTAURANT.hours[today] === null
  if (status.opensAt === undefined || status.opensDay === undefined) return ko ? (dayOff ? '오늘 휴무' : '영업 종료') : 'Closed now'
  const at = formatTime(status.opensAt, lang)
  if (ko) {
    const day = status.opensToday ? '오늘' : status.opensTomorrow ? '내일' : DAY_NAMES.ko[status.opensDay]
    const state = status.opensToday ? '영업 준비 중' : dayOff ? '오늘 휴무' : '영업 종료'
    return `${state} · ${day} ${at} 오픈`
  }
  const day = status.opensToday ? '' : status.opensTomorrow ? 'tomorrow ' : `${DAY_NAMES.en[status.opensDay]} `
  return `${dayOff ? 'Closed today' : 'Closed'} · opens ${day}${at}`
}

/** Live open/closed pill, in the restaurant's time zone. */
export function OpenBadge({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const { lang } = useLang()
  const { status, today } = useOpenStatus(RESTAURANT.hours)
  const label = openLabel(status, today, lang)

  const dot = status.open ? (status.closingSoon ? 'bg-gold text-gold' : 'bg-leaf text-leaf') : 'bg-chili text-chili'
  const surface = tone === 'dark' ? 'border-white/15 bg-black/30 text-paper backdrop-blur-md' : 'border-ink/15 bg-white/60 text-ink'
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[0.9rem] font-medium ${surface} ${className}`}>
      <span className={`relative h-2.5 w-2.5 rounded-full ${dot} ${status.open ? 'animate-pulse-dot' : ''}`} />
      {label}
    </span>
  )
}
