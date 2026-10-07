import { useEffect, useState } from 'react'
import type { Lang } from './i18n'

/** Opening hours for one day, in minutes after midnight. `close` may exceed 1440 when service runs past midnight. */
export type DayHours = { open: number; close: number } | null
/** Indexed like Date#getDay(): 0 = Sunday … 6 = Saturday. */
export type Week = readonly DayHours[]

export const TIME_ZONE = 'America/New_York'
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const DAY_NAMES: Record<Lang, string[]> = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ko: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
}

export function nowInRestaurantTZ(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  return { day: WEEKDAYS.indexOf(get('weekday')), minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export type OpenStatus =
  | { open: true; closesAt: number; closingSoon: boolean }
  | { open: false; opensAt?: number; opensDay?: number; opensToday?: boolean; opensTomorrow?: boolean }

export function getOpenStatus(week: Week, now = nowInRestaurantTZ()): OpenStatus {
  const yesterday = week[(now.day + 6) % 7]
  if (yesterday && yesterday.close > 1440 && now.minutes < yesterday.close - 1440) {
    const closesAt = yesterday.close - 1440
    return { open: true, closesAt, closingSoon: closesAt - now.minutes <= 30 }
  }
  const today = week[now.day]
  if (today && now.minutes >= today.open && now.minutes < today.close) {
    return { open: true, closesAt: today.close, closingSoon: today.close - now.minutes <= 30 }
  }
  for (let i = 0; i < 8; i++) {
    const d = (now.day + i) % 7
    const h = week[d]
    if (!h || (i === 0 && now.minutes >= h.open)) continue
    return { open: false, opensAt: h.open, opensDay: d, opensToday: i === 0, opensTomorrow: i === 1 }
  }
  return { open: false }
}

export function formatTime(min: number, lang: Lang) {
  const m = ((min % 1440) + 1440) % 1440
  const h24 = Math.floor(m / 60)
  const mm = m % 60
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  if (lang === 'ko') {
    if (m === 0) return '자정'
    return `${h24 < 12 ? '오전' : '오후'} ${h12}시${mm ? ` ${mm}분` : ''}`
  }
  if (m === 0) return 'Midnight'
  return `${h12}${mm ? `:${String(mm).padStart(2, '0')}` : ''} ${h24 < 12 ? 'AM' : 'PM'}`
}

/** Live open/closed status, re-evaluated every 30 seconds. */
export function useOpenStatus(week: Week) {
  const [state, setState] = useState(() => ({ status: getOpenStatus(week), today: nowInRestaurantTZ().day }))
  useEffect(() => {
    const tick = () => setState({ status: getOpenStatus(week), today: nowInRestaurantTZ().day })
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [week])
  return state
}
