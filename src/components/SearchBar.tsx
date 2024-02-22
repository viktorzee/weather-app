import { useState } from "react";
import { getLocations } from "../services";
import { Location } from "../types/index";
import { Popover } from "@headlessui/react";
import { IconSearch } from "@tabler/icons-react";


const SearchBar: React.FC<{
    setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  }> = ({ setLocations }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setNotFound(false);
      const locations = await getLocations(searchQuery);
      if (locations.length === 0) {
        setNotFound(true);
        setLocations([]);
      } else {
        setLocations(await getLocations(searchQuery));
        setSearchQuery("");
      }
      setIsLoading(false);
    };
  
    return (
        <form className="flex flex-col p-5" onClick={handleSubmit} data-cy="search-form">
          <div className="flex justify-between">
              <div></div>
              <div>
              <Popover.Button className="text-xl text-white cursor-pointer dark:bg-gray-600  bg-blue-600 py-1 px-2">
                  X
              </Popover.Button>
              </div>
          </div>
          <div className="flex space-x-10 items-center mt-5">
              <div className=" px-2 py-2 relative border-2 border-gray-500">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                  <IconSearch className="h-[20px] text-slate-500" />
              </div>
              <input
                type="text"
                name="search"
                id=""
                value={searchQuery}
                onChange={(e) => handleChange(e)}
                className="bg-inherit outline-none pl-10 text-white"
                data-cy="location-input"
              />
              </div>
              <div>
              <button
                className="px-2 py-2 bg-blue-600 text-white disabled:bg-gray-600 search-button "            
                type="submit"
                disabled={isLoading || searchQuery.length === 0}
                data-cy="search-button"
              >
                  Search
              </button>
              </div>
          </div>
          {notFound && (
              <p className="text-center mt-10 text-white">
              Location not found please try another
              </p>
          )}
        </form>
    );
};
  
export default SearchBar;