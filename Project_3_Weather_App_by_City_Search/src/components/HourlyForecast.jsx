// src/components/HourlyForecast.jsx
import { format } from 'date-fns';

export default function HourlyForecast({ data }) {
  if (!data || !data.list) return null;

  // Get the next 6 segments (approx next 18 hours)
  // OpenWeatherMap returns data every 3 hours
  const nextHours = data.list.slice(0, 6);

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-4">Today's Forecast</h3>
      <div className="flex justify-between overflow-x-auto gap-4 pb-2 flex-1 items-center">
        {nextHours.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 min-w-20 p-3 rounded-2xl border-l border-white/5 first:border-l-0 hover:bg-white/5 transition-colors cursor-pointer">
             <span className="text-xs text-text-secondary font-medium">
               {format(new Date(item.dt * 1000), 'h:00 a')}
             </span>
             
             <img 
               src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
               alt="icon" 
               className="w-10 h-10"
             />
             
             <span className="text-lg font-bold text-white">
               {Math.round(item.main.temp)}°
             </span>
          </div>
        ))}
      </div>
    </div>
  );
}
