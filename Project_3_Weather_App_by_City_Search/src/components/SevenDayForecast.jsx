// src/components/SevenDayForecast.jsx
import { format } from 'date-fns';

export default function SevenDayForecast({ data }) {
  if (!data || !data.list) return null;

  // Filter list to get one reading per day (e.g., roughly every 8th item since 8 * 3h = 24h)
  // This is a simplified way to show "Daily" data from the 3-hour forecast API
  const dailyForecast = data.list.filter((reading, index) => index % 8 === 0).slice(0, 7);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-6">5-Day Forecast</h3>
      
      <div className="flex flex-col flex-1 gap-2">
        {dailyForecast.map((day, idx) => (
          <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
             <span className="text-text-secondary text-sm font-medium w-12">
               {idx === 0 ? 'Today' : format(new Date(day.dt * 1000), 'EEE')}
             </span>
             
             <div className="flex items-center gap-2 flex-1 justify-center">
               <img 
                 src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                 alt="icon" 
                 className="w-8 h-8"
               />
               <span className="text-text-primary text-sm font-semibold capitalize">
                 {day.weather[0].main}
               </span>
             </div>

             <div className="text-sm font-bold">
               <span className="text-text-primary">{Math.round(day.main.temp_max)}</span>
               <span className="text-text-secondary">/{Math.round(day.main.temp_min)}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
