// src/components/CurrentWeather.jsx
export default function CurrentWeather({ data }) {
  // Guard clause: if data isn't loaded yet, show loading or empty state
  if (!data || !data.list || !data.list[0]) {
    return <div className="text-text-secondary">Loading weather...</div>;
  }

  // OpenWeatherMap Forecast API returns a list of 3-hour segments.
  // list[0] is the closest forecast to "now".
  const current = data.list[0];
  const city = data.city.name;
  const temp = Math.round(current.main.temp);
  const description = current.weather[0].description;
  const iconCode = current.weather[0].icon;
  const rainChance = current.pop * 100; // Probability of precipitation (0-1)

  return (
    <div className="flex-1 flex flex-col justify-between w-full h-full z-10 relative">
       <div className="flex justify-between items-start">
         <div>
           <h1 className="text-4xl font-bold mb-2 text-white">{city}</h1>
           <p className="text-text-secondary text-sm capitalize">
             {description} • Rain: {Math.round(rainChance)}%
           </p>
         </div>
         <h2 className="text-5xl font-bold text-white">{temp}°</h2>
       </div>
       
       <div className="self-center mt-4">
         <img 
            src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`} 
            alt={description} 
            className="w-40 h-40 drop-shadow-2xl"
         />
       </div>
    </div>
  );
}
