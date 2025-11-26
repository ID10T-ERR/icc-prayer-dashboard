// app/landscape/page.tsx
import Blackout from "@/components/Blackout/Blackout"
import Clock from "@/components/Clock/Clock"
import CountdownScreen from "@/components/CountdownScreen/CountdownScreen"
import Date from "@/components/Date/Date"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import ReminderScreen from "@/components/ReminderScreen/ReminderScreen"
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
    title: `${metadata.name} Prayer Times (Landscape) | MosqueScreen Project by MosqueOS`,
    description: `${metadata.address} | ${metadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function LandscapePage() {
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
      <main className="flex flex-col h-screen w-full p-8 gap-6">
        {/* Top Section: Logo, Clock, Date in a row */}
        <header className="flex items-start justify-between px-4">
          <div className="flex-shrink-0">
            <MosqueMetadata metadata={mosqueMetadata} />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Clock />
            <Date />
          </div>
        </header>

        {/* Main Prayer Times Table - Masjidal Style */}
        <section className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-7xl">
            <table className="w-full text-white border-collapse">
              <thead>
                <tr className="bg-mosqueGreen-dark">
                  <th className="text-left p-6 text-4xl font-bold"></th>
                  <th className="text-center p-6 text-3xl font-bold">
                    <div className="mb-2">أذان</div>
                    <div>STARTS</div>
                  </th>
                  <th className="text-center p-6 text-3xl font-bold">
                    <div className="mb-2">إقامة</div>
                    <div>IQAMAH</div>
                  </th>
                  <th className="text-center p-6 text-3xl font-bold">
                    <div>{moment().add(1, 'day').format('dddd')}</div>
                    <div>{moment().add(1, 'day').format('MMM D')}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'FAJR', arabic: 'الفجر', prayer: today.fajr, tomorrow: tomorrow?.fajr },
                  { name: 'ZUHR', arabic: 'الظهر', prayer: today.zuhr, tomorrow: tomorrow?.zuhr },
                  { name: 'ASR', arabic: 'العصر', prayer: today.asr, tomorrow: tomorrow?.asr },
                  { name: 'MAGHRIB', arabic: 'المغرب', prayer: today.maghrib, tomorrow: tomorrow?.maghrib },
                  { name: 'ISHA', arabic: 'العشاء', prayer: today.isha, tomorrow: tomorrow?.isha },
                ].map((item, index) => (
                  <tr key={item.name} className="border-b border-mosqueGreen-dark">
                    <td className="bg-mosqueGreen-dark text-left p-6">
                      <div className="text-5xl font-bold">{item.name}</div>
                    </td>
                    <td className="bg-white/5 text-center p-6 text-5xl font-semibold">
                      {moment(item.prayer.start, ["HH:mm"]).format("h:mm")}
                      <span className="text-3xl ml-2">{moment(item.prayer.start, ["HH:mm"]).format("A")}</span>
                    </td>
                    <td className="bg-white/10 text-center p-6 text-5xl font-bold">
                      {moment(item.prayer.congregation_start, ["HH:mm"]).format("h:mm")}
                      <span className="text-3xl ml-2">{moment(item.prayer.congregation_start, ["HH:mm"]).format("A")}</span>
                    </td>
                    <td className="bg-white/5 text-center p-6 text-4xl font-semibold">
                      {item.tomorrow ? moment(item.tomorrow.congregation_start, ["HH:mm"]).format("h:mm A") : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Section: Horizontal Jummah Times */}
        <footer className="flex items-center justify-center gap-6 pb-4">
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
        </footer>

        <ServiceWorker />
      </main>

      <CountdownScreen today={today} />
      <ReminderScreen today={today} />
      <Blackout prayerTimeToday={today} />
    </>
  )
}
