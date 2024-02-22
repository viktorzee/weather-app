import useWeather  from "../hooks/useWeather";
import WeatherContext from "../context/Weather.Context";



const MainPanel = () => {
   const {
     isMetric,
     weatherData,
     nextDaysWeatherData,
     setWeatherData,
     setNextDaysWeatherData,
     locationRef,
   } = useWeather();

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
       
      </WeatherContext.Provider>
  );
};

export default MainPanel;
