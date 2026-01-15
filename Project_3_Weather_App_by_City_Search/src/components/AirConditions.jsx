// src/components/AirConditions.jsx
import { Thermometer, Wind, Droplets, Sun } from 'lucide-react';

export default function AirConditions({ data }) {
  if (!data || !data.list || !data.list[0]) return null;

  const current = data.list[0];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider">Air Conditions</h3>
        <button className="bg-highlight-blue text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors">See more</button>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        
        {/* Real Feel */}
        <div className="flex items-start gap-3">
          <Thermometer className="text-text-secondary w-6 h-6" />
          <div>
            <p className="text-text-secondary text-sm font-medium">Real Feel</p>
            <p className="text-xl font-bold text-white">{Math.round(current.main.feels_like)}°</p>
          </div>
        </div>

        {/* Wind */}
        <div className="flex items-start gap-3">
          <Wind className="text-text-secondary w-6 h-6" />
          <div>
            <p className="text-text-secondary text-sm font-medium">Wind</p>
            <p className="text-xl font-bold text-white">{current.wind.speed} m/s</p>
          </div>
        </div>

        {/* Humidity (Replacing Rain Chance which isn't always available directly) */}
        <div className="flex items-start gap-3">
          <Droplets className="text-text-secondary w-6 h-6" />
          <div>
            <p className="text-text-secondary text-sm font-medium">Humidity</p>
            <p className="text-xl font-bold text-white">{current.main.humidity}%</p>
          </div>
        </div>

        {/* UV Index (Placeholder - standard OWM free tier doesn't include UV) */}
        <div className="flex items-start gap-3">
          <Sun className="text-text-secondary w-6 h-6" />
          <div>
            <p className="text-text-secondary text-sm font-medium">Pressure</p>
            <p className="text-xl font-bold text-white">{current.main.pressure} hPa</p>
          </div>
        </div>

      </div>
    </div>
  );
}
