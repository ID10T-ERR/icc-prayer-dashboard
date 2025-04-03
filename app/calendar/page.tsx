import Calendar from "@/components/Calendar/Calendar"
import { getMosqueData } from "@/services/MosqueDataService"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await getMosqueData()

  return {
    title: `${metadata.name} Prayer Times | MosqueScreen Project by MosqueOS`,
    description: `${metadata.address} | ${metadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function FullYear() {
  const { prayer_times, metadata } = await getMosqueData()

  return (
    <div className="bg-white min-w-full min-h-screen">
      <Calendar prayerTimes={prayer_times} metadata={metadata} />
    </div>
  )
}
