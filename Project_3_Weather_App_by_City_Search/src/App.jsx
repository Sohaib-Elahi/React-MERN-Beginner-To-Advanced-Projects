import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import AirConditions from './components/AirConditions';
import SevenDayForecast from './components/SevenDayForecast';

function App() {
  const [city, setCity] = useState('Cairo');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ⚠️ REPLACE WITH YOUR ACTUAL API KEY
  const API_KEY = 'YOUR_API_KEY'; 

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        // We'll use the 'forecast' endpoint to get current + future data
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError('City not found');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="flex min-h-screen bg-dashboard-bg text-text-primary font-sans overflow-hidden">
      
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 flex flex-col gap-6 overflow-y-auto">
        
        <SearchBar setCity={setCity} />

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-text-secondary">Loading weather data...</div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center text-red-400">{error}</div>
        ) : weatherData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Pass real data to components */}
              <div className="h-64 bg-component-bg rounded-[30px] p-8 flex items-center justify-between border border-white/5 relative overflow-hidden">
                <CurrentWeather data={weatherData} />
              </div>

              <div className="h-48 bg-component-bg rounded-[30px] p-6 flex flex-col justify-center border border-white/5">
                <HourlyForecast data={weatherData} />
              </div>

              <div className="h-48 bg-component-bg rounded-[30px] p-6 flex flex-col justify-center border border-white/5">
                 <AirConditions data={weatherData} />
              </div>

            </div>

            <div className="lg:col-span-1 h-full">
              <div className="h-full min-h-125 bg-component-bg rounded-[30px] p-8 flex flex-col border border-white/5">
                 <SevenDayForecast data={weatherData} />
              </div>
            </div>

          </div>
        ) : null}

      </main>
    </div>
  );
}

export default App;
