import { Button } from "../ui/button";
import { FileCheck, Bike } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative h-56">
      <img
        src={"/src/assets/Rectangle 44.png"}
        alt="Banner Image"
        className="w-full h-full object-cover rounded-xl"
      />
      <img
        src={"/src/assets/Rectangle 2.png"}
        alt="Overlay Image"
        className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-80"
      />
      <div className="absolute inset-0 flex items-center justify-around px-4">
        <div>
          <p className="text-md text-[#03081F]  font-sans">i'm livin it!</p>
          <p className="text-4xl font-bold text-[#03081F] font-sans">
            Burger Haven West Colombo
          </p>

          <div className="flex gap-2 my-4">
            <div>
              <Button className="bg-[#03081F] text-white rounded-full">
                <div className="flex items-center justify-center gap-2">
                  <span>
                    <FileCheck />
                  </span>
                  <span className="text-white">Minimum Order</span>
                </div>
              </Button>
            </div>

            <div>
              <Button className="bg-[#03081F] text-white rounded-full">
                <div className="flex items-center justify-center gap-2">
                  <span>
                    <Bike />
                  </span>
                  <span className="text-white">Delivery in 20-25 Minutes</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={"/src/assets/Rectangle 43.png"}
            alt="Additional Image"
            className="w-64 h-44 object-cover rounded-xl"
          />
          <img
            src={"/src/assets/Rectangle 64.png"}
            alt="Overlapping Image"
            className="absolute bottom-[-8%] left-[-8%] size-16 object-cover rounded-xl border-4 border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
