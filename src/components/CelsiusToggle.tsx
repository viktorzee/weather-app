
import WeatherContext from "../context/Weather.Context";
import { getNextDaysWeather, getWeather } from "../services/index";
import React, { useContext } from "react";

const ToggleButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children,  }) => {
     return (
       <div className="w-10 h-10 rounded-full bg-gray-500 flex justify-center items-center">
         <button onClick={onClick} className="text-white">{children}</button>
       </div>
     );
};

interface CelsiusToggleProps {
  isMetric: boolean;
  setIsMetric: React.Dispatch<React.SetStateAction<boolean>>;
}

const CelsiusToggle: React.FC<CelsiusToggleProps> = ({
  setIsMetric,
}) => {
  const { setWeatherData, setNextDaysWeatherData, locationRef } =
    useContext(WeatherContext);

  const handleToggle = async (value: boolean) => {
    setWeatherData(
      await getWeather(locationRef.current.lat, locationRef.current.lon, value)
    );

    setNextDaysWeatherData(
      await getNextDaysWeather(
        locationRef.current.lat,
        locationRef.current.lon,
        value
      )
    );
    setIsMetric(value);
  };

  return (
    <div className="hidden w-full lg:flex lg:justify-end gap-3 mt-4">
      
      <ToggleButton
        onClick={() => {
          handleToggle(true);
        }}
      >
        ℃
      </ToggleButton>
      <ToggleButton onClick={() => handleToggle(false)} >
        ℉
      </ToggleButton>
    </div>
  );
};

export default CelsiusToggle;
