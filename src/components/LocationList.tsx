import Locations from "./Locations";
import { Location } from "../types/index";


const LocationList: React.FC<{ locations: Location[] }> = ({ locations }) => {
    return (
      <div className="flex flex-col gap-6 mt-9 ">
        {Array.isArray(locations) && locations.length > 0 ? (
          locations.map((data) => (
            <Locations key={data.name + data.lat + data.lon} data={data} />
          ))
        ) : (
          <p className="text-center"></p>
        )}
      </div>
    );
};
  
export default LocationList;