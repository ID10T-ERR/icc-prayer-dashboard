"use client";

import { useEffect, useState } from "react";
import { getNextPrayer } from "@/services/PrayerTimeService";
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType";
import moment from "moment";

export default function PrayerTimesLandscape({
  today,
  tomorrow,
}: {
  today: DailyPrayerTime;
  tomorrow?: DailyPrayerTime;
}) {
  const PrayerTimesArray = [
    {
      label: "Fajr",
      arabicLabel: "الفجر",
      englishLabel: "Fajr",
      todayData: today.fajr,
      tomorrowData: tomorrow?.fajr,
    },
    {
      label: "Zuhr",
      arabicLabel: "الظهر",
      englishLabel: "Zuhr",
      todayData: today.zuhr,
      tomorrowData: tomorrow?.zuhr,
    },
    {
      label: "Asr",
      arabicLabel: "العصر",
      englishLabel: "Asr",
      todayData: today.asr,
      tomorrowData: tomorrow?.asr,
    },
    {
      label: "Maghrib",
      arabicLabel: "المغرب",
      englishLabel: "Maghrib",
      todayData: today.maghrib,
      tomorrowData: tomorrow?.maghrib,
    },
    {
      label: "Isha",
      arabicLabel: "العشاء",
      englishLabel: "Isha",
      todayData: today.isha,
      tomorrowData: tomorrow?.isha,
    },
  ];

  const [nextPrayerTime, setNextPrayerTime] = useState(getNextPrayer(today));

  useEffect(() => {
    const interval = setInterval(() => {
      setNextPrayerTime(getNextPrayer(today));
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [today]);

  return (
    <div className="w-full max-w-5xl">
      <table className="w-full border-collapse text-white table-auto">
        <thead>
          <tr className="text-center border-b-2 border-white/30">
            <th className="text-left pb-4"></th>
            <th className="text-3xl font-bold pb-4 px-6">Begins</th>
            <th className="text-3xl font-bold pb-4 px-6">Jama'ah</th>
            <th className="text-3xl font-bold pb-4 px-6">Tomorrow</th>
          </tr>
        </thead>
        <tbody>
          {PrayerTimesArray.map((prayer, index) => (
            <tr
              key={prayer.label}
              className="border-b border-white/20 hover:bg-white/5"
            >
              <th className="text-left text-4xl font-bold py-6 px-4">
                {prayer.englishLabel}
              </th>
              {/* Begins (Athan) */}
              <td className="text-5xl font-semibold py-6 px-6 text-center">
                {moment(prayer.todayData.start, ["HH:mm"]).format("h:mm")}
              </td>
              {/* Jama'ah (Iqama) */}
              <td className="text-5xl font-bold py-6 px-6 text-center">
                <span
                  className={
                    nextPrayerTime.today === true &&
                    nextPrayerTime.prayerIndex === index
                      ? "underline decoration-4 decoration-yellow-400 underline-offset-8"
                      : ""
                  }
                >
                  {moment(prayer.todayData.congregation_start, ["HH:mm"]).format("h:mm")}
                </span>
              </td>
              {/* Tomorrow */}
              <td className="text-5xl font-semibold py-6 px-6 text-center">
                {prayer.tomorrowData 
                  ? moment(prayer.tomorrowData.congregation_start, ["HH:mm"]).format("h:mm")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
