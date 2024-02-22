import { Popover } from "@headlessui/react";
import { useContext } from "react";
import { getWeather, getNextDaysWeather } from "../services";
import { Location } from "../types/index"
import WeatherContext from "../context/Weather.Context";

const Locations: React.FC<{ data: Location }> = ({ data }) => {
  const { setWeatherData, isMetric, setNextDaysWeatherData, locationRef } =
    useContext(WeatherContext);

  const handleClick = async () => {
    locationRef.current = { lat: data.lat, lon: data.lon };

    setWeatherData(await getWeather(data.lat, data.lon, isMetric));
    setNextDaysWeatherData(
      await getNextDaysWeather(data.lat, data.lon, isMetric)
    );
  };

  const label = `${data.name}${data.state ? `, ${data.state}` : ""}, ${
    data.country
  }`;

  return (
    <Popover.Button
      onClick={handleClick}
      className="flex items-start justify-between py-6 px-3 group border border-transparent hover:border-gray-2 transition hover:border-2 hover:border-gray-900 text-white"
    >
      {label}
    </Popover.Button>
  );
};


export default Locations;