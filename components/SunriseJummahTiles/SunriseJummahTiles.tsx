import { JummahTimes } from "@/types/JummahTimesType"
import moment from "moment"

export default function SunriseJummahTiles({
  jummahTimes = [],
}: {
  jummahTimes: JummahTimes
}) {
  return (
    <dl
      // 2 columns, centered items, and `mx-auto` to center the entire grid
      className="grid grid-cols-2 justify-items-center gap-4 w-fit mx-auto text-center"
    >
      {jummahTimes.map((jummahTime, index) => (
        <div
          key={index}
          className="bg-mosqueGreen-dark text-white p-4 lg:p-6"
        >
          <dt className="text-2xl md:text-5xl font-bold">
            {jummahTime.label}
          </dt>
          <dd className="mt-2 text-3xl md:text-6xl font-extrabold tracking-tight">
            {moment(jummahTime.time, ["HH:mm"]).format("h:mm")}
          </dd>
        </div>
      ))}
    </dl>
  )
}



