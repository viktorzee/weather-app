import { HightlightsCardProps } from "../types";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

const WeatherHighlightCard = ({value:{unit,value, sunrise, sunset},title, emotion}:HightlightsCardProps) => {
  return (
    <div className="hightlightcardStyle">
      {title === "Sunrise & Sunset" ? (
            <div>
              <div>
              <h1 className="text-base mb-5">{title}</h1>
            </div>
            <div className="flex items-center  dark:text-white mb-5 justify-around text-black font-medium">
            <BsArrowUpCircle
              size={28}
              strokeWidth={1}
              color={'yellow'}
              fill="yellow"
            />
              {sunrise}
            </div>
            <div className="flex items-center dark:text-white  justify-around text-black font-medium">
              <BsArrowDownCircle
                size={28}
                strokeWidth={1}
                color={'yellow'}
                fill="yellow"
              />
              {sunset}
            </div>           
          </div>
      ): (
        <>
          <div>
            <h1 className="text-base mb-5  dark:text-white">{title}</h1>
          </div>
          <div>
            <p className="text-[40px] text-black  dark:text-white">{value} {unit}</p>
          </div>
          <p>
            {emotion === "unhealthy" ? "Unhealthy 👎" : 
            emotion === "normal" ? "Normal 🤙" :
            emotion === "average" ? "Average 🙁" :
            ""}
          </p>
        </>
          )}
    </div>
  );
}
export  default WeatherHighlightCard