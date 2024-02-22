import {  useEffect, useState } from "react";
import Sun from "../../assets/images/sun.png";
import LightCloud from "../../assets/images/LightCloud.png";
import Cloud from "../../assets/images/cloud.png";
import Shower from "../../assets/images/Shower.png";
import Rainy from "../../assets/images/rainy.png";
import Thunderstorm from "../../assets/images/Thunderstorm.png";
import Snow from "../../assets/images/Snow.png";
import { getOrganizedNextDaysWeatherData } from "../services";
import Temperature from "./Temparature";
import WeatherContext from "../context/Weather.Context";
import  useWeather  from "../hooks/useWeather";

interface WeatherInfo {
  icon: string;
  weather: string;
  temps: number[];
}
 export const weatherConditionsIcons: { [key: string]: string[] } = {
    "01d": [Sun, "Clear sky"],
    "02d": [LightCloud, "Few clouds"],
    "03d": [Cloud, "Scattered clouds"],
    "04d": [Cloud, "Broken clouds"],
    "09d": [Shower, "Shower rain"],
    "10d": [Rainy, "Rain"],
    "11d": [Thunderstorm, "Thunderstorm"],
    "13d": [Snow, "Snow"],
    "01n": [Sun, "Clear sky"],
    "02n": [LightCloud, "Few clouds"],
    "03n": [Cloud, "Scattered clouds"],
    "04n": [Cloud, "Broken clouds"],
    "09n": [Shower, "Shower rain"],
    "10n": [Rainy, "Rain"],
    "11n": [Thunderstorm, "Thunderstorm"],
    "13n": [Snow, "Snow"],
  };
const WeatherCard = () => {
  const [dayMeasurements, setDayMeasurements] = useState<Record<
    string,
    WeatherInfo
  > | null>(null);
 const {
   isMetric,
   weatherData,
   setWeatherData,
   setNextDaysWeatherData,
   locationRef,
   nextDaysWeatherData
 } = useWeather();
  useEffect(() => {
    if (nextDaysWeatherData) {
      const organizedData =
        getOrganizedNextDaysWeatherData(nextDaysWeatherData);
      setDayMeasurements(organizedData);
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
      <div className="grid grid-cols-2 lg:gap-x-6 lg:gap-y-8 md:grid-cols-3 lg:grid-cols-5 md:gap-6 gap-5">
        {dayMeasurements &&
          Object.entries(dayMeasurements).map(([date, info]) => {
            const formattedDate = formatDate(new Date(date));
            return (
              <div
                key={date}
                className="relative dark:bg-[#1E213A] lg:w-[200px] md:w-[200px] w-[160px] h-[290px] p-5 bg-blue-600"
              >
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <p className="dark:text-white text-slate-100">
                      {formattedDate}
                    </p>
                  </div>
                  <div className="flex justify-center w-full h-[50%]">
                    <img
                      src={weatherConditionsIcons[info.icon][0]}
                      alt=""
                      className="mb-5"
                    />
                  </div>
                  <div className="flex justify-between w-full absolute bottom-4 p-3">
                    <p className="text-white">{info.weather}</p>
                    <p className="dark:text-gray-500 text-white">
                      <Temperature value={info.temps[0]} />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </WeatherContext.Provider>
  );
};

export default WeatherCard;
