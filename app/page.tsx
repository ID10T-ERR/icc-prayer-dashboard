/// app/page.tsx
import Blackout from "@/components/Blackout/Blackout"
import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import Notice from "@/components/Notice/Notice"
import SunriseJummahTiles from "@/components/SunriseJummahTiles/SunriseJummahTiles"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import ServiceWorker from "@/components/ServiceWorker/ServiceWorker"
import SlidingBanner from "@/components/SlidingBanner/SlidingBanner"
import { getJummahTimes, getMetaData, getPrayerTimesForToday } from "@/services/MosqueDataService"
import type { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import type { MosqueMetadataType } from "@/types/MosqueDataType"
// import UpcomingPrayerDayTiles from "@/components/UpcomingPrayerDayTiles/UpcomingPrayerDayTiles"
import { JummahTimes } from "@/types/JummahTimesType"

export async function generateMetadata() {
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return {
    title: `${mosqueMetadata.name} Prayer Times | MosqueScreen Project by MosqueOS`,
    description: `${mosqueMetadata.address} | ${mosqueMetadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function Home() {
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const jummahTimes: JummahTimes = await getJummahTimes()
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  // Build slides array
  let slides = [
    <SunriseJummahTiles jummahTimes={jummahTimes} key="sunrise_jummah_times" />,
    // <UpcomingPrayerDayTiles key="ramadan-schedule" />,
  ]

  return (
    <>
      <main className="p-4 md:p-5 digital-signage-content flex flex-col items-center justify-center h-full">
        {/* Centered Header: Clock, Date, MosqueMetadata */}
        <header className="flex flex-col items-center text-center mb-4 w-full">
          <div className="p-2">
            <Clock />
          </div>
          <div className="p-2">
            <Date />
          </div>
          <div className="p-2">
            <MosqueMetadata metadata={mosqueMetadata} />
          </div>
        </header>

        {/* Centered Prayer Times */}
        <section className="p-2 flex flex-col items-center w-full">
          <PrayerTimes today={today} />
        </section>

        {/* Center Notice */}
        <div className="p-2 flex flex-col items-center text-center">
          <Notice />
        </div>

        {/* Bottom Banner Slider */}
        <footer className="p-2 w-full flex justify-center">
          <div className="landscape-slider-wrapper w-full">
            <SlidingBanner slides={slides} />
          </div>
        </footer>

        <ServiceWorker />
      </main>

      <Blackout prayerTimeToday={today} />
    </>
  )
}

