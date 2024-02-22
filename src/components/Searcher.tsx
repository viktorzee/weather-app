import {  useState } from "react";
import { Location } from "../types/index";
import SearchBar from "./SearchBar";
import LocationList from "./LocationList";
import { Popover } from "@headlessui/react";


const Searcher: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  return (
    <Popover.Panel className="absolute  z-40 h-screen w-[400px] md:w-full">
      <div className="dark:bg-[#1E213A] bg-indigo-700 shadow-xl">
        <SearchBar setLocations={setLocations} />
        <LocationList locations={locations} />
      </div>
    </Popover.Panel>
  );
};

export default Searcher;
