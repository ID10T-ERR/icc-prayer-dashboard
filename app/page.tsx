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

  let slides = [
    <SunriseJummahTiles
      jummahTimes={jummahTimes}
      key={"sunrise_jummah_times"}
    />,
  ]

  upcomingPrayerDays.forEach((times) => {
    slides.push(
      <UpcomingPrayerDayTiles times={times} key={times.day_of_month} />
    )
  })

  return (
    <>
      <main className="p-4 md:p-5 digital-signage-content flex flex-col h-full">
        {/* Top Row: Clock, Date, and Mosque Metadata */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="flex-1 flex justify-center p-2">
            <Clock />
          </div>
          <div className="flex-1 flex justify-center p-2">
            <Date />
          </div>
          <div className="flex-1 flex justify-center p-2">
            <MosqueMetadata metadata={mosqueMetadata} />
          </div>
          {/* Optionally, if you want Notice visible on larger screens */}
          <div className="hidden md:flex flex-1 justify-center p-2">
            <Notice />
          </div>
        </header>

        {/* Main Prayer Times Section (expanded) */}
        <section className="flex-1 p-2">
          <PrayerTimes today={today} tomorrow={tomorrow} />
        </section>

        {/* Bottom: Sliding Banner remains landscape */}
        <footer className="p-2">
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

