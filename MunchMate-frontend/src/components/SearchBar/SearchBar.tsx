import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchBar = ({ setItemSearch }: any) => {
  const handleOnChange = (e: any) => {
    setItemSearch(e.target.value);
  };

  return (
    <div>
      <div className="flex w-full items-center space-x-2">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <Search size={20} color="#f97316" />
          </span>
          <Input
            onChange={handleOnChange}
            type="search"
            placeholder="Search by Name, City or Town"
            className="pl-10 border border-gray-700 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
