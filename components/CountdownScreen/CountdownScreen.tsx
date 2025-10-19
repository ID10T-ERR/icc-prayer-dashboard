"use client";

import { useEffect, useState } from "react";
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType";
import moment from "moment";

interface CountdownScreenProps {
  today: DailyPrayerTime;
}

interface CountdownInfo {
  show: boolean;
  prayerName: string;
  type: "Athan" | "Iqamah";
  secondsRemaining: number;
}

export default function CountdownScreen({ today }: CountdownScreenProps) {
  const [countdown, setCountdown] = useState<CountdownInfo>({
    show: false,
    prayerName: "",
    type: "Athan",
    secondsRemaining: 0,
  });

  const [currentTime, setCurrentTime] = useState(moment().format("h:mm A"));

  const PrayerTimesArray = [
    {
      label: "Fajr",
      arabicLabel: "الفجر",
      data: today.fajr,
    },
    {
      label: "Zuhr",
      arabicLabel: "الظهر",
      data: today.zuhr,
    },
    {
      label: "Asr",
      arabicLabel: "العصر",
      data: today.asr,
    },
    {
      label: "Maghrib",
      arabicLabel: "المغرب",
      data: today.maghrib,
    },
    {
      label: "Isha",
      arabicLabel: "العشاء",
      data: today.isha,
    },
  ];

  useEffect(() => {
    const checkCountdown = () => {
      const now = moment();
      
      // Update current time display
      setCurrentTime(now.format("h:mm A"));

      for (const prayer of PrayerTimesArray) {
        // Check Athan time
        const athanTime = moment(prayer.data.start, "HH:mm");
        const secondsToAthan = athanTime.diff(now, "seconds");

        if (secondsToAthan > 0 && secondsToAthan <= 60) {
          setCountdown({
            show: true,
            prayerName: prayer.label,
            type: "Athan",
            secondsRemaining: secondsToAthan,
          });
          return;
        }

        // Check Iqamah time
        const iqamahTime = moment(prayer.data.congregation_start, "HH:mm");
        const secondsToIqamah = iqamahTime.diff(now, "seconds");

        if (secondsToIqamah > 0 && secondsToIqamah <= 60) {
          setCountdown({
            show: true,
            prayerName: prayer.label,
            type: "Iqamah",
            secondsRemaining: secondsToIqamah,
          });
          return;
        }
      }

      // No countdown needed
      setCountdown({
        show: false,
        prayerName: "",
        type: "Athan",
        secondsRemaining: 0,
      });
    };

    // Check immediately
    checkCountdown();

    // Check every second
    const interval = setInterval(checkCountdown, 1000);

    return () => clearInterval(interval);
  }, [today]);

  if (!countdown.show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Border container with pattern */}
      <div className="border-container">
        {/* Inner content */}
        <div className="inner-content relative overflow-hidden">
          {/* Small Clock in Top Left Corner */}
          <div className="absolute top-8 left-8 bg-mosqueGreen-dark rounded-2xl px-6 py-3 shadow-lg border-2 border-mosqueGreen-highlight z-10">
            <time className="text-4xl font-bold text-white">
              {currentTime}
            </time>
          </div>

          <div className="flex items-center justify-center h-full w-full relative z-10">
            <div className="text-center text-white px-8">
              {/* Countdown Number */}
              <div className="text-[20rem] font-bold leading-none mb-8">
                {countdown.secondsRemaining}
              </div>

              {/* Text Information */}
              <div className="space-y-4">
                <p className="text-4xl uppercase tracking-wider">SECONDS TO</p>
                <p className="text-8xl font-bold text-yellow-300 uppercase tracking-wide">
                  {countdown.prayerName}
                </p>
                <p className="text-6xl uppercase tracking-wider">
                  {countdown.type === "Athan" ? "ATHAN" : "IQAMAH"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
