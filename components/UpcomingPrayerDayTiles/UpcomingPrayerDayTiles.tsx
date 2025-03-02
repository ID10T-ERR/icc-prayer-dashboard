// components/UpcomingPrayerDayTiles/UpcomingPrayerDayTiles.tsx

export default function UpcomingPrayerDayTiles() {
  return (
    <div className="bg-mosqueGreen-dark text-white p-4 lg:p-6 overflow-auto w-full">
      <h2 className="text-center text-xl md:text-3xl font-bold mb-3">
        Iqama Schedule for the Month of Ramadan
      </h2>
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="border border-white">
            <th className="p-2 border border-white">Dates</th>
            <th className="p-2 border border-white">1–08</th>
            <th className="p-2 border border-white">9–19</th>
            <th className="p-2 border border-white">20–30</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="p-2 border border-white">Fajr</th>
            <td className="p-2 border border-white">5:45</td>
            <td className="p-2 border border-white">6:30</td>
            <td className="p-2 border border-white">6:15</td>
          </tr>
          <tr>
            <th className="p-2 border border-white">Duhr</th>
            <td className="p-2 border border-white">1:00</td>
            <td className="p-2 border border-white">2:00</td>
            <td className="p-2 border border-white">2:00</td>
          </tr>
          <tr>
            <th className="p-2 border border-white">Aser</th>
            <td className="p-2 border border-white">4:15</td>
            <td className="p-2 border border-white">5:30</td>
            <td className="p-2 border border-white">5:30</td>
          </tr>
          <tr>
            <th className="p-2 border border-white">Maghrib</th>
            {/* Merged columns to show "Iqama is 5 Athan" */}
            <td colSpan={3} className="p-2 border border-white">
              Iqama is 5 Athan
            </td>
          </tr>
          <tr>
            <th className="p-2 border border-white">Isha</th>
            <td className="p-2 border border-white">8:00</td>
            <td className="p-2 border border-white">9:00</td>
            <td className="p-2 border border-white">9:15</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


