import {
  DailyPrayerTime,
  UpcomingPrayerTimes,
} from "@/types/DailyPrayerTimeType"
import { JummahTimes } from "@/types/JummahTimesType"
import { MosqueMetadataType, MosqueData } from "@/types/MosqueDataType"
import { find } from "lodash"
import moment from "moment"

const MOSQUE_API_ENDPOINT = process.env.MOSQUE_API_ENDPOINT ?? ""
const DAY_FOR_UPCOMING = parseInt(process.env?.UPCOMING_PRAYER_DAY ?? "3")

// ✅ In-memory cache for static rendering
let cachedMosqueData: MosqueData | null = null

export async function getMosqueData(): Promise<MosqueData> {
  if (cachedMosqueData) return cachedMosqueData

  const response = await fetch(MOSQUE_API_ENDPOINT, {
    next: { revalidate: 30 },
  })

  cachedMosqueData = await response.json()
  return cachedMosqueData
}

export async function getPrayerTimeForDayMonth(
  day_of_month: string,
  month: string,
): Promise<DailyPrayerTime> {
  const { prayer_times } = await getMosqueData()

  return (
    find(prayer_times, {
      day_of_month,
      month,
    }) ?? prayer_times[0]
  )
}

export async function getPrayerTimesForToday(): Promise<DailyPrayerTime> {
  const date = moment()
  return getPrayerTimeForDayMonth(
    date.format("D"),
    date.format("M"),
  )
}

export async function getPrayerTimesForTomorrow(): Promise<DailyPrayerTime> {
  const date = moment().add(1, "day")
  return getPrayerTimeForDayMonth(
    date.format("D"),
    date.format("M"),
  )
}

export async function getPrayerTimesForUpcomingDays(): Promise<UpcomingPrayerTimes> {
  const date = moment()
  const { prayer_times } = await getMosqueData()

  const todayIndex = prayer_times.findIndex(
    (entry) => entry.day_of_month === date.format("D") && entry.month === date.format("M"),
  )

  return {
    days: prayer_times.slice(todayIndex, todayIndex + DAY_FOR_UPCOMING),
  }
}

export async function getMetaData(): Promise<MosqueMetadataType> {
  const { metadata } = await getMosqueData()
  return metadata
}

export async function getJummahTimes(): Promise<JummahTimes> {
  const { jummah_times } = await getMosqueData()
  return jummah_times
}

export async function getAllPrayerTimes(): Promise<DailyPrayerTime[]> {
  const { prayer_times } = await getMosqueData()
  return prayer_times
}

