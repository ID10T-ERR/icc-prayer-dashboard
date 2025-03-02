// app/calendar/page.tsx
import Calendar from "@/components/Calendar/Calendar"
import { getAllPrayerTimes, getMetaData } from "@/services/MosqueDataService"

export default async function FullYear() {
  const prayerTimes = await getAllPrayerTimes()
  const mosqueMetadata = await getMetaData()

  return (
    <div className="bg-white min-w-full min-h-screen">
      <Calendar prayerTimes={prayerTimes} metadata={mosqueMetadata} />
    </div>
  )
}

