import SearchSideBar from "./SearchSideBar";
import WeatherContext from "../context/Weather.Context";
import useWeather from "../hooks/useWeather"
import { IconLoader } from "@tabler/icons-react";
import CelsiusToggle from "../components/CelsiusToggle";
import  { weatherConditionsIcons } from "../components/WeatherCard";
import WeatherHighlightCard from "../components/WeatherHighlightCard"
import {  useEffect, useState } from "react";
import { getNextDaysWeatherData } from "../services";
import Temperature from "../components/Temparature";
import { WeatherInfo } from "../types";


const Homepage = () => {
  
   const {
     isMetric,
     weatherData,
     setWeatherData,
     setNextDaysWeatherData,
     locationRef,
     setIsMetric,
     isLoading,nextDaysWeatherData
   } = useWeather()
   const windSpeed = Math.round(weatherData?.wind?.speed || 0);
   const humidity = weatherData?.main?.humidity;
   const visibility = weatherData?.visibility;
   const pressure = weatherData?.main?.pressure;
   const sunriseTimeStamp = weatherData?.sys?.sunrise;
   const sunsetTimeStamp = weatherData?.sys?.sunset;

   const sunriseDate = sunriseTimeStamp &&  new Date(sunriseTimeStamp * 1000); // Multiply by 1000 to convert to milliseconds
    const sunsetDate = sunsetTimeStamp && new Date(sunsetTimeStamp * 1000);

    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };

    const formattedSunriseTime = sunriseDate && sunriseDate.toLocaleTimeString(undefined, timeOptions);
    const formattedSunsetTime = sunsetDate && sunsetDate.toLocaleTimeString(undefined, timeOptions);
    const [daySettings, setDaySettings] = useState<Record<
    string,
    WeatherInfo
  > | null>(null);
  const [theme, setTheme] = useState('light');
  

  useEffect(() => {
    if (nextDaysWeatherData) {
      const showWeatherData = getNextDaysWeatherData(nextDaysWeatherData);
      setDaySettings(showWeatherData);
    }
  }, [nextDaysWeatherData]);

 const formatDate = (date: Date): string => {
   const options: Intl.DateTimeFormatOptions = {
     weekday: "short",
     day: "2-digit",
     month: "short",
   };
   return new Intl.DateTimeFormat("en-US", options).format(date);
 };

  const windSpeedUnit = isMetric ? "m/s" : "mph";

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        nextDaysWeatherData,
        setWeatherData,
        setNextDaysWeatherData,
        isMetric,
        locationRef,
      }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen bg-gray-800">
          <IconLoader size={30} className="animate-spin mx-auto text-white" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-2 xl:gap-16 xl:h-screen bg-gray-100">
          <div className={`lg:flex-1 xl:w-[20%] ${theme === 'dark' && 'bg-gray-800'} bg-white`}>
            <SearchSideBar theme={theme} setTheme={setTheme} />
          </div>
          <div className="lg:w-[80%] h-full  lg:overflow-y-auto">
            <header className="flex justify-between items-center"> 
              <div className="flex items-center text-lg font-semibold">
                <h1 className="text-gray-300">Today</h1>
                <h1 className="underline ml-5">Week</h1>
              </div>             
              <div className="flex space-x-4 items-center">
                <CelsiusToggle isMetric={isMetric} setIsMetric={setIsMetric} />
                <img src={`https://picsum.photos/200/300`}  className="rounded-full h-12 w-16 mt-4" />
              </div>
            </header>
            <section className="lg:p-10 space-y-10 p-7">
              <main className="flex flex-col justify-center gap-4">                
                <div className="grid grid-cols-2 lg:gap-x-4 lg:gap-y-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 md:gap-4 gap-3">
                  {daySettings &&
                    Object.entries(daySettings).map(([date, info]) => {
                      const formattedDate = formatDate(new Date(date));
                      return (
                        <div
                          key={date}
                          className=" dark:bg-[#1E213A] p-5 bg-white md:w-[8rem] rounded-xl"
                        >
                          <div className="flex flex-col justify-center items-center">
                            <div>
                              <p className="dark:text-white text-black">
                                {formattedDate}
                              </p>
                            </div>
                            <div className="flex justify-center w-full">
                              <img
                                src={weatherConditionsIcons[info.icon][0]}
                                alt=""
                                className="mb-5 md:h-[5rem]"
                              />
                            </div>
                            {/* <div className="flex justify-between w-full absolute bottom-4 p-3"> */}
                              {/* <p className="text-white">{info.weather}</p> */}
                              <p className="dark:text-gray-500 text-black">
                                <Temperature value={info.temps[0]} />
                              </p>
                            {/* </div> */}
                          </div>
                        </div>
                      );
                    })}
                </div>
                  {/* Today's highlight  */}
                <section className="">
                  <h1 className="text-xl text-black font-bold">
                    Today’s Highlights
                  </h1>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-8 lg:grid-cols-3 lg:gap-x-12">
                    <WeatherHighlightCard
                      title={"Wind Status"}
                      value={{
                        unit: windSpeedUnit,
                        value: windSpeed,
                      }}
                    />

                    <WeatherHighlightCard
                      title={"Sunrise & Sunset"}
                      value={{
                        unit: "",
                        value: "",
                        sunrise: formattedSunriseTime,
                        sunset: formattedSunsetTime,
                      }}
                    />
                    <WeatherHighlightCard
                      title={"Humidity"}
                      value={{
                        unit: "%",
                        value: humidity,
                      }}
                      emotion={`${humidity && humidity  > 12 ? "normal" : "average"}`}
                    />
                    <WeatherHighlightCard
                      title={"Visibility"}
                      value={{
                        unit: "m",
                        value: visibility,
                      }}
                      emotion={`${visibility && visibility  > 5.2 ? "average" : "unhealthy"}`}
                    />
                    <WeatherHighlightCard
                      title={"Air Quality"}
                      value={{
                        unit: "",
                        value: pressure,
                      }}
                       emotion={`${pressure && pressure  > 1000 ? "unhealthy" : "average"}`}
                    />
                  </div>
                </section>
              </main>
            </section>
          </div>
        </div>
      )}
    </WeatherContext.Provider>
  );
};

export default Homepage


