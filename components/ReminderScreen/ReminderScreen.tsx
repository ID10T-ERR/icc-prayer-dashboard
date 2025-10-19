"use client";

import { useEffect, useState } from "react";
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType";
import moment from "moment";

interface ReminderScreenProps {
  today: DailyPrayerTime;
}

interface ReminderInfo {
  show: boolean;
  prayerName: string;
  arabicName: string;
}

export default function ReminderScreen({ today }: ReminderScreenProps) {
  const [reminder, setReminder] = useState<ReminderInfo>({
    show: false,
    prayerName: "",
    arabicName: "",
  });

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
    const checkReminder = () => {
      const now = moment();

      for (const prayer of PrayerTimesArray) {
        // Check if it's Iqamah time (within 10 minutes after Iqamah starts)
        const iqamahTime = moment(prayer.data.congregation_start, "HH:mm");
        const secondsSinceIqamah = now.diff(iqamahTime, "seconds");

        // Show reminder for 10 minutes (600 seconds) after Iqamah time
        if (secondsSinceIqamah >= 0 && secondsSinceIqamah <= 600) {
          setReminder({
            show: true,
            prayerName: prayer.label,
            arabicName: prayer.arabicLabel,
          });
          return;
        }
      }

      // No reminder needed
      setReminder({
        show: false,
        prayerName: "",
        arabicName: "",
      });
    };

    // Check immediately
    checkReminder();

    // Check every second
    const interval = setInterval(checkReminder, 1000);

    return () => clearInterval(interval);
  }, [today]);

  if (!reminder.show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Background Image - Dimmed for less distraction during prayer */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070')",
          filter: "brightness(0.15)"
        }}
      ></div>

      {/* Content Overlay - Dimmed opacity for less distraction during prayer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-8 opacity-60">
        {/* Icons at top */}
        <div className="flex gap-8 mb-12">
          {/* No Talk Icon */}
          <div className="w-24 h-24 rounded-full border-4 border-red-500 flex items-center justify-center relative">
            <span className="text-4xl">🗣️</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-red-500 rotate-45"></div>
            </div>
          </div>
          
          {/* No Phone Icon */}
          <div className="w-24 h-24 rounded-full border-4 border-red-500 flex items-center justify-center relative">
            <span className="text-4xl">📱</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-red-500 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Reminder Label */}
        <div className="bg-white bg-opacity-70 text-gray-800 px-8 py-3 rounded-lg mb-8 text-xl font-semibold">
          Reminder
        </div>

        {/* Arabic Prayer Name */}
        <div className="text-9xl font-bold mb-6" style={{ fontFamily: 'serif' }}>
          {reminder.arabicName}
        </div>

        {/* Prayer Name in English */}
        <div className="text-8xl font-bold text-yellow-300 mb-12 uppercase">
          {reminder.prayerName}
        </div>

        {/* Main Message */}
        <div className="bg-white bg-opacity-70 text-gray-900 px-16 py-8 rounded-2xl max-w-4xl text-center">
          <p className="text-5xl font-bold">
            Please turn off your cell phone
          </p>
        </div>

        {/* Additional reminders */}
        <div className="mt-8 text-2xl text-center space-y-2">
          <p>🤫 Please maintain silence</p>
          <p>📵 Turn off or silence all devices</p>
        </div>
      </div>
    </div>
  );
}
