import { useContext, useEffect } from "react";
import "./App.css";

import sun from "./assets/sun.png";
import cloud from "./assets/cloud.png";
import SearchHistory from "./Components/SearchHistory";
import Search from "./Components/Search";
import { SearchContext } from "./Context/SearchContext";

function App() {
  const { data, clickTime, weatherData, setWeatherData, setHistorySearch } =
    useContext(SearchContext);

  const fetchLatLon = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appId=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );
    const res2 = await res.json();

    const updatedWeatherData = {
      temperature: Math.floor(data.main.temp - 273.15),
      high: Math.floor(data.main.temp_max - 273.15),
      low: Math.floor(data.main.temp_min - 273.15),
      time: clickTime,
      humidity: data.main.humidity,
      weather: data.weather[0].main,
      rain: data.weather[0].main === "Rain",
      city: res2.name,
      country: res2.sys.country,
    };

    setWeatherData(updatedWeatherData);
    setHistorySearch((prev) => [...prev, updatedWeatherData]);
  };

  useEffect(() => {
    if (data.main) {
      const Lat = data.coord.lat;
      const Lon = data.coord.lon;
      fetchLatLon(Lat, Lon);
    }
  }, [data]);

  return (
    <div className=" bg-[url('./assets/bg-dark.png')] bg-cover bg-no-repeat h-screen flex flex-col items-center">
      <div className="container max-w-[700px] mx-auto flex flex-col gap-y-28">
        <Search />

        <div className="w-full bg-[#1A1A1A]/30 border border-transparent rounded-[40px] text-white text-lg font-normal">
          <div className="py-[46px] px-10 relative">
            <div>
              <h4 className="mb-[18px]">Today's Weather</h4>
              <h1 className="text-8xl mb-[10px] font-bold">
                {weatherData.temperature}
                <sup>o</sup>
              </h1>
              <p className="mb-[10px]">
                H:{weatherData.high}
                <sup>o</sup> L:{weatherData.low} <sup>o</sup>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">
                {weatherData.city},{weatherData.country}
              </p>
              <p>{weatherData.time}</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>{weatherData.weather}</p>
            </div>
            <div>
              {weatherData.rain ? (
                <img
                  className="w-[300px] h-[300px] absolute top-[-100px] right-0"
                  src={cloud}
                  alt=""
                />
              ) : (
                <img
                  className="w-[300px] h-[300px] absolute top-[-100px] right-0"
                  src={sun}
                  alt=""
                />
              )}
            </div>
            <SearchHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
