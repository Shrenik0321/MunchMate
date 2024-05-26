import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

const SearchBar = () => {
  return (
    <div>
      <div className="flex w-full  items-center space-x-2">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <Search size={20} color="#f97316" />
          </span>
          <Input
            type="search"
            placeholder="Search by Name, City or Town"
            className="rounded-full pl-10 border border-gray-700 w-full"
          />
        </div>
        <Button type="submit" className="bg-[#6b7280]">
          Reset
        </Button>
        <Button type="submit" className="bg-orange-500">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
