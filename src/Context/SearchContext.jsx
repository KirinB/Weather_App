import React, { createContext, useRef, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [historySearch, setHistorySearch] = useState([]);
  const [clickTime, setClickTime] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temperature: "--",
    high: "--",
    low: "--",
    city: "--",
    country: "--",
    time: "--",
    humidity: "--",
    weather: "--",
    rain: false,
  });
  const [data, setData] = useState([]);

  const fetchData = async (city) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        return setData(res);
      });
  };

  const handleDeleteItemHistory = (i) => {
    const newHistory = [...historySearch];
    newHistory.splice(i, 1);
    setHistorySearch(newHistory);
  };

  const handleInfoItemHistory = (i) => {
    setWeatherData(historySearch[i]);
  };

  const contextValue = {
    searchValue,
    setSearchValue,
    searchResult,
    setSearchResult,
    inputRef,
    fetchData,
    data,
    setData,
    clickTime,
    setClickTime,
    weatherData,
    setWeatherData,
    historySearch,
    setHistorySearch,
    handleDeleteItemHistory,
    handleInfoItemHistory,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
