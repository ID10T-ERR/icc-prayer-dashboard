import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { MosqueMetadataType } from "@/types/MosqueDataType"
import moment from "moment"
import { Fragment } from "react"

export default function Calendar({
  prayerTimes,
  metadata,
}: {
  prayerTimes: DailyPrayerTime[]
  metadata: MosqueMetadataType
}) {
  const today = moment().format("D MMMM")

  // Table headers
  const headers = [
    "Fajr Starts",
    "Fajr Iqama",
    "Sunrise",
    "Zuhr Starts",
    "Zuhr Iqama",
    "Asr Starts",
    "Asr Iqama",
    "Maghrib Starts",
    "Maghrib Iqama",
    "Isha Starts",
    "Isha Iqama",
  ]

  return (
    <div className="p-6">
      {/* Big Title & Mosque Info */}
      <div className="mb-8 text-center">
        <h1 className="text-7xl font-extrabold text-[#d5d8dc]">
          {metadata.name} Prayer Times
        </h1>
        <p className="mt-4 text-5xl text-[#d5d8dc]">
          {metadata.address}
        </p>
      </div>

      {/* Big Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="py-4 px-2 text-left text-5xl font-bold text-[#d5d8dc]">
                Date
              </th>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="py-4 px-2 text-center text-5xl font-bold text-[#d5d8dc]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prayerTimes.map((pt, idx) => {
              const isToday = `${pt.day_of_month} ${pt.month_label}` === today

              // Construct array of times for each column
              const times = [
                moment(pt.fajr.start, ["HH:mm"]).format("h:mm a"),
                moment(pt.fajr.congregation_start, ["HH:mm"]).format("h:mm a"),
                moment(pt.sunrise_start, ["HH:mm"]).format("h:mm a"),
                moment(pt.zuhr.start, ["HH:mm"]).format("h:mm a"),
                moment(pt.zuhr.congregation_start, ["HH:mm"]).format("h:mm a"),
                moment(pt.asr.start, ["HH:mm"]).format("h:mm a"),
                moment(pt.asr.congregation_start, ["HH:mm"]).format("h:mm a"),
                moment(pt.maghrib.start, ["HH:mm"]).format("h:mm a"),
                moment(pt.maghrib.congregation_start, ["HH:mm"]).format("h:mm a"),
                moment(pt.isha.start, ["HH:mm"]).format("h:mm a"),
                moment(pt.isha.congregation_start, ["HH:mm"]).format("h:mm a"),
              ]

              return (
                <Fragment key={`${pt.month_label}-${pt.day_of_month}`}>
                  {/* If it's the first day of the month, show a month header row */}
                  {pt.day_of_month === "1" && (
                    <tr>
                      <th
                        colSpan={12}
                        className="bg-mosqueGreen-dark py-3 pl-4 text-left text-6xl font-extrabold text-white"
                      >
                        {pt.month_label}
                      </th>
                    </tr>
                  )}
                  <tr
                    className={`${
                      isToday ? "bg-mosqueGreen-highlight text-white" : "text-[#d5d8dc]"
                    } text-4xl`}
                  >
                    {/* Date Cell */}
                    <td className="py-4 px-2 font-extrabold text-5xl">
                      {pt.day_of_month} {pt.month_label}
                    </td>
                    {/* Times */}
                    {times.map((t, i2) => (
                      <td key={i2} className="py-4 px-2 text-center font-bold text-7xl">
                        {t}
                      </td>
                    ))}
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}






