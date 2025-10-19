import { JummahTimes } from "@/types/JummahTimesType"
import moment from "moment"

export default function SunriseJummahTiles({
  jummahTimes = [],
  titleM,
}: {
  jummahTimes: JummahTimes;
  titleM: string;
}) {
  return (
    <div className="text-center">
      {/* Add a shaded box around the title */}
      <div className="bg-gray-700 text-white p-3 rounded-md shadow-md mb-2">
        <h2 className="text-xl md:text-3xl font-bold text-center">{titleM}</h2>
      </div>
      <dl
        className={`grid ${
          jummahTimes.length > 1 ? "grid-cols-2" : "grid-cols-1"
        } justify-items-center gap-3 w-fit mx-auto text-center`}
      >
        {jummahTimes.map((jummahTime, index) => (
          <div
            key={index}
            className="bg-mosqueGreen-dark text-white p-3 rounded-md shadow-md w-full"
          >
            <dt className="text-xl md:text-3xl font-bold">
              {jummahTime.label.replace(/Jummah/g, "Jumu'ah")}
            </dt>
            <dd className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight">
              {moment(jummahTime.time, ["HH:mm"]).format("h:mm")}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}