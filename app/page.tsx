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
import { getMosqueData } from "@/services/MosqueDataService"
import moment from "moment"
import type { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import type { JummahTimes } from "@/types/JummahTimesType"
import type { MosqueMetadataType } from "@/types/MosqueDataType"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const { metadata }: { metadata: MosqueMetadataType } = await getMosqueData()

  return {
    title: `${metadata.name} Prayer Times | MosqueScreen Project by MosqueOS`,
    description: `${metadata.address} | ${metadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function Home() {
  const { prayer_times, jummah_times, metadata } = await getMosqueData()

  const jummahTimesICC = jummah_times.filter((jummah) => jummah.label !== "Jummah");
  const jummahTimesAlNour = jummah_times.filter((jummah) => jummah.label === "Jummah")

  const todayDate = moment()
  const tomorrowDate = moment().add(1, "day")

  const today: DailyPrayerTime =
    prayer_times.find(
      (p) =>
        p.day_of_month === todayDate.format("D") &&
        p.month === todayDate.format("M")
    ) ?? prayer_times[0]

  const tomorrow: DailyPrayerTime =
    prayer_times.find(
      (p) =>
        p.day_of_month === tomorrowDate.format("D") &&
        p.month === tomorrowDate.format("M")
    ) ?? prayer_times[1]

  const jummahTimes: JummahTimes = jummah_times
  const mosqueMetadata: MosqueMetadataType = metadata

  let slides = [
    <SunriseJummahTiles
      jummahTimes={jummahTimesICC}
      titleM="ICC Jummah Times"
      key={"icc_jummah_times"}
    />,
    <SunriseJummahTiles
      jummahTimes={jummahTimesAlNour}
      titleM="Al-Nour Jummah Times"
      key={"alnour_jummah_times"}
    />,
  ];

  return (
    <>
      <main className="p-4 md:p-5 digital-signage-content flex flex-col h-full">
        <header className="flex flex-col items-center mb-4">
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

        <section className="p-2 flex flex-col items-center">
          <PrayerTimes today={today} /* tomorrow={tomorrow} */ />
        </section>

        {/* <div className="p-2 flex flex-col items-center justify-center text-center">
          <Notice />
        </div> */}

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
