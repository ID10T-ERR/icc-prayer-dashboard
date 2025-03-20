// app/page.tsx
import Blackout from "@/components/Blackout/Blackout"
import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import Notice from "@/components/Notice/Notice"
import SunriseJummahTiles from "@/components/SunriseJummahTiles/SunriseJummahTiles"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import ServiceWorker from "@/components/ServiceWorker/ServiceWorker"
import SlidingBanner from "@/components/SlidingBanner/SlidingBanner"
import {
  getJummahTimes,
  getMetaData,
  getPrayerTimesForUpcomingDays,
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
} from "@/services/MosqueDataService"
import type {
  DailyPrayerTime,
  UpcomingPrayerTimes,
} from "@/types/DailyPrayerTimeType"
import type { JummahTimes } from "@/types/JummahTimesType"
import type { MosqueMetadataType } from "@/types/MosqueDataType"
import type { Metadata } from "next"
import UpcomingPrayerDayTiles from "@/components/UpcomingPrayerDayTiles/UpcomingPrayerDayTiles"

export async function generateMetadata(): Promise<Metadata> {
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return {
    title: `${mosqueMetadata.name} Prayer Times | MosqueScreen Project by MosqueOS`,
    description: `${mosqueMetadata.address} | ${mosqueMetadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function Home() {
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  const jummahTimes: JummahTimes = await getJummahTimes()
  const mosqueMetadata: MosqueMetadataType = await getMetaData()
  const upcomingPrayerDays: UpcomingPrayerTimes[] =
    await getPrayerTimesForUpcomingDays()

  // Build slides array
  let slides = [
    <SunriseJummahTiles jummahTimes={jummahTimes} key="sunrise_jummah_times" />,
    <UpcomingPrayerDayTiles key="ramadan-schedule" />,
  ]

  return (
    <>
      <main className="p-2 md:p-4 digital-signage-content flex flex-col h-full">
        {/* Header: Clock, Date, MosqueMetadata, all centered */}
        <header className="flex flex-col items-center mb-2">
          <div className="p-1">
            <Clock />
          </div>
          <div className="p-1">
            <Date />
          </div>
          <div className="p-1">
            <MosqueMetadata metadata={mosqueMetadata} />
          </div>
        </header>

        {/* PrayerTimes, also centered */}
        <section className="p-1 flex flex-col items-center">
          <PrayerTimes today={today} /* tomorrow={tomorrow} if needed */ />
        </section>

        {/* Notice below prayer times but above the slider, centered */}
        <div className="p-1 flex flex-col items-center justify-center text-center">
          <Notice />
        </div>

        {/* Bottom slider with slides array */}
        <footer className="p-1">
          <div className="landscape-slider-wrapper">
            <SlidingBanner slides={slides} />
          </div>
        </footer>

        <ServiceWorker />
      </main>

      <Blackout prayerTimeToday={today} />
    </>
  )
}
