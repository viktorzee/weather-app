import  { useContext } from "react";
import WeatherContext from "../context/Weather.Context";


const temperature = ({ value }:any) => {
  const { isMetric } = useContext(WeatherContext);

  const data = Math.round(value || 0);
  const unit = isMetric ? "℃" : "℉";

  return (
    <div>
      {data}
      <span>{unit}</span>
    </div>
  );
};

export default temperature;
