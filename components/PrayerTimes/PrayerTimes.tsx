"use client";

import { useEffect, useState } from "react";
import { getNextPrayer } from "@/services/PrayerTimeService";
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType";
import moment from "moment";

export default function PrayerTimes({
  today,
  tomorrow,
}: {
  today: DailyPrayerTime;
  tomorrow: DailyPrayerTime;
}) {
  const PrayerTimesArray = [
    {
      label: "Fajr",
      arabicLabel: "الفجر",
      data: today.fajr,
      tomorrow: tomorrow.fajr,
    },
    {
      label: "Zuhr",
      arabicLabel: "الظهر",
      data: today.zuhr,
      tomorrow: tomorrow.zuhr,
    },
    {
      label: "Asr",
      arabicLabel: "العصر",
      data: today.asr,
      tomorrow: tomorrow.asr,
    },
    {
      label: "Maghrib",
      arabicLabel: "المغرب",
      data: today.maghrib,
      tomorrow: tomorrow.maghrib,
    },
    {
      label: "Isha",
      arabicLabel: "العشاء",
      data: today.isha,
      tomorrow: tomorrow.isha,
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
    <table className="w-full border-collapse border-none text-white mx-auto table-auto">
      <thead>
        <tr className="text-center [&>*]:p-3 md:[&>*]:p-6 md:[&>*]:border [&>*]:border-mosqueGreen-dark [&>th]:border-t-0 [&>th:last-of-type]:border-r-0">
          <th className="sr-only">Prayer time</th>
          <th className="text-3xl md:text-6xl font-extrabold">
            <div>أذان</div>
            Athan
          </th>
          <th className="text-3xl md:text-6xl font-extrabold">
            <div>إقامة</div>
            Iqama
          </th>
          <th className="text-3xl md:text-6xl font-extrabold">
            <div>غداً</div>
            Tomorrow
          </th>
        </tr>
      </thead>
      <tbody>
        {PrayerTimesArray.map((prayer, index) => (
          <>
            {/* Main Prayer Row */}
            <tr
              key={prayer.label}
              className="
                text-center
                [&>*]:p-3
                md:[&>*]:p-6
                md:[&>*]:border
                md:[&>*]:border-b-0
                [&>*]:border-mosqueGreen-dark
                md:[&>th]:w-20
                [&>th]:border-l-0
                [&>td:last-of-type]:border-r-0
                border border-mosqueGreen-dark border-l-0 border-r-0
                last-of-type:border-b-0
              "
            >
              <th className="text-left md:text-right text-3xl md:text-6xl font-bold">
                <div className="arabic-label mb-1">{prayer.arabicLabel}</div>
                {prayer.label}
              </th>
              <td className="text-3xl md:text-6xl font-semibold">
                {moment(prayer.data.start, ["HH:mm"]).format("h:mm")}
              </td>
              <td className="text-3xl md:text-6xl font-bold">
                <span
                  className={
                    nextPrayerTime.today === true &&
                    nextPrayerTime.prayerIndex === index
                      ? "underline decoration-mosqueGreen-highlight underline-offset-8"
                      : ""
                  }
                >
                  {moment(prayer.data.congregation_start, ["HH:mm"]).format("h:mm")}
                </span>
              </td>
              <td className="text-3xl md:text-6xl font-bold">
                <span
                  className={
                    nextPrayerTime.today === false &&
                    nextPrayerTime.prayerIndex === index
                      ? "underline decoration-mosqueGreen-highlight underline-offset-8"
                      : ""
                  }
                >
                  {moment(prayer.tomorrow.congregation_start, ["HH:mm"]).format("h:mm")}
                </span>
              </td>
            </tr>

            {/* Insert smaller Sunrise row AFTER Fajr */}
            {prayer.label === "Fajr" && (
              <tr>
                <td colSpan={4} className="text-center text-xl md:text-3xl py-3 font-bold">
                  <img
                    src="/sun-128.png"
                    alt="Sunrise"
                    className="inline-block h-8 w-8 mr-2 align-middle"
                  />
                  Sunrise{" "}
                  {moment(today.sunrise_start, ["HH:mm"]).format("h:mm")}
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
}
