import React, { useContext } from "react";
import background from "../assets/images/Cloud-background.png";
import { IconCurrentLocation, IconMapPinFilled,IconSunHigh,IconMoon } from "@tabler/icons-react";
import { Popover } from "@headlessui/react";
import Searcher from "../components/Searcher";
import WeatherContext from "../context/Weather.Context";
import { setCurrentLocation } from "../services";
import Temperature from "../components/Temparature";
import { weatherConditionsIcons } from "../components/WeatherCard";


const SearchSideBar = ({theme, setTheme}: any) => {
  const { weatherData, isMetric } = useContext(WeatherContext);
  const { setWeatherData,  setNextDaysWeatherData, locationRef } = useContext(WeatherContext);
 

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <React.Fragment>
        <Popover className="relative h-full">
          <section className="dark:bg-gray-800 h-full relative overflow-hidden z-0 lg:min-w-[400px] bg-white  dark:text-white">
            <img
              src={background}
              alt=""
              className="absolute  top-16 lg:top-28 opacity-10 min-w-[160%] -z-10"
            />
            <div className=" flex flex-col">
              <div className="flex justify-between w-full p-5">
                <Popover.Button className="dark:bg-gray-500 bg-indigo-800 py-1.5 rounded-lg px-2 text-white outline-none block" data-cy="search-bar-button">
                  Search for places
                </Popover.Button>
                <div className="flex space-x-2">
                  <div className="w-10 h-10 rounded-full dark:bg-gray-500 bg-indigo-800 flex justify-center items-center">
                    <IconCurrentLocation
                      className="text-white cursor-pointer"
                      onClick={() => {
                        setCurrentLocation({
                          locationRef,
                          setWeatherData,
                          isMetric,
                          setNextDaysWeatherData,
                        });
                      }}
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full dark:bg-gray-500 bg-indigo-800 flex justify-center items-center">
                    {theme === "light" ? (
                      <IconMoon
                        className="text-white cursor-pointer"
                        onClick={toggleTheme}
                      />
                    ) : (
                      <IconSunHigh
                        className="text-white cursor-pointer"
                        onClick={toggleTheme}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-10 lg:h-screen md:h-screen">
                <div className="flex justify-center md:h-[20%] xl:items-start">
                  {weatherData &&
                    weatherData.weather &&
                    weatherConditionsIcons[weatherData.weather[0].icon] && (
                      <img
                        src={
                          weatherConditionsIcons[weatherData.weather[0].icon][0]
                        }
                        alt=""
                        className="w-[45%] md:w-full md:h-full"
                      />
                    )}
                </div>
                <div className="flex flex-col gap-5 dark:text-white text-black">
                  <div>
                    <p className="text-[5rem] lg:text-[6rem] md:text-[9rem] border-b border-b-gray-400 w-full">
                      <Temperature value={weatherData?.main?.temp!} />
                    </p>
                  </div>
                  <div className="">
                    <p className="text-base">
                      {weatherData?.weather[0].main}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <IconMapPinFilled size={32} />
                    <p className="text-base">{weatherData?.name}</p>
                  </div>
                </div>
              </div>
              {/* display he search bar */}
              <Searcher />               
            </div>            
          </section>
        </Popover>
    </React.Fragment>
  );
};

export default SearchSideBar;
