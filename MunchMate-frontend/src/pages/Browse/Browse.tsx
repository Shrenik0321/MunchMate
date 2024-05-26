import FilterSection from "@/components/FilterSection/FilterSection";
import ItemSection from "@/components/ItemSection/ItemSection";

const Browse = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 px-10 py-5">
        <div>
          <FilterSection />
        </div>
        <div className="col-span-2">
          <ItemSection />
        </div>
      </div>
    </div>
  );
};

export default Browse;
