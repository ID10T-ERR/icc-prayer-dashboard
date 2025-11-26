import Blackout from "@/components/Blackout/Blackout"
import Clock from "@/components/Clock/Clock"
import CountdownScreen from "@/components/CountdownScreen/CountdownScreen"
import Date from "@/components/Date/Date"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import ReminderScreen from "@/components/ReminderScreen/ReminderScreen"
import ServiceWorker from "@/components/ServiceWorker/ServiceWorker"
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

  return (
    <>
      <main className="digital-signage-content flex flex-col h-full py-4">
        <header className="flex flex-col items-center mb-3">
          <div className="p-1 mb-2">
            <Clock />
          </div>
          <div className="p-1">
            <Date />
          </div>
          <div className="p-1">
            <MosqueMetadata metadata={mosqueMetadata} />
          </div>
        </header>

        <section className="flex flex-col items-center mb-6">
          <PrayerTimes today={today} tomorrow={tomorrow} />
        </section>

        <footer className="mt-0">
          <div className="flex items-center justify-center gap-6 pb-4">
          {/* Sunrise */}
          <div className="bg-[#04382d] p-6 rounded-lg text-white text-center min-w-[180px] border border-white/10">
            <div className="text-xl font-bold mb-2">Sunrise</div>
            <div className="text-4xl font-extrabold">
              {moment(today.sunrise_start, ["HH:mm"]).format("h:mm A")}
            </div>
          </div>

          {/* Al-Towbah Jummah Times */}
          <div className="bg-[#04382d] p-6 rounded-lg text-white border border-white/10">
            <div className="text-xl font-bold mb-3 text-center">Al-Towbah Jumu&apos;ah Times</div>
            <div className="flex gap-4">
              {jummahTimesICC.map((jummah, idx) => (
                <div key={idx} className="text-center min-w-[150px]">
                  <div className="text-lg font-semibold mb-1">{jummah.label.replace(/Jummah/g, "Jumu'ah")}</div>
                  <div className="text-4xl font-extrabold">
                    {moment(jummah.time, ["HH:mm"]).format("h:mm")}
                  </div>
                  <div className="text-2xl font-bold">
                    {moment(jummah.time, ["HH:mm"]).format("A")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Al-Nour Jummah Time */}
          <div className="bg-[#04382d] p-6 rounded-lg text-white text-center min-w-[180px] border border-white/10">
            <div className="text-xl font-bold mb-3">Al-Nour Jumu&apos;ah Time</div>
            <div className="text-lg font-semibold mb-1">{jummahTimesAlNour[0].label.replace(/Jummah/g, "Jumu'ah")}</div>
            <div className="text-4xl font-extrabold">
              {moment(jummahTimesAlNour[0].time, ["HH:mm"]).format("h:mm")}
            </div>
            <div className="text-2xl font-bold">
              {moment(jummahTimesAlNour[0].time, ["HH:mm"]).format("A")}
            </div>
          </div>
          </div>
        </footer>

        <ServiceWorker />
      </main>

      <CountdownScreen today={today} />
      <ReminderScreen today={today} />
      <Blackout prayerTimeToday={today} />
    </>
  )
}
