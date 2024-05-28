import { Button, buttonVariants } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-20">
        <div>
          <img
            src="/src/assets/hero.png"
            alt="PDF Image"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="m-20 flex justify-center items-center text-center">
        <div className="flex-col">
          <div className="mb-5">
            <p className="font-semibold text-6xl mr-10">
              Feast Your Senses,{" "}
              <span className="text-orange-500">Fast and Fresh</span>
            </p>
          </div>

          <div className="my-5">
            <p className="font-semibold text-xl text-[#6b7280]">
              Tuck into a takeaway today with just a click!
            </p>
          </div>

          <Button
            className={buttonVariants({
              size: "lg",
              className:
                "bg-[#f97316] hover:bg-[#f97316] hover:text-lg hover:p-6",
            })}
            onClick={() => navigate("/browse")}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-white">Order Now</span>
              <span>
                <MoveRight />
              </span>
            </div>
          </Button>
        </div>

        <div className="size-4/6">
          <img
            src="/src/assets/friends-laughing-using-mobiles 2.png"
            alt="PDF Image"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="m-20 flex justify-center items-center text-center">
        <div className="size-5/12">
          <img
            src="/src/assets/Untitled-2 1 (1).png"
            alt="PDF Image"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-col">
          <div className="mb-5">
            <p className="font-semibold text-6xl mr-10">
              Join Our Journey,{" "}
              <span className="text-orange-500">Grow Your Business</span>
            </p>
          </div>

          <div className="my-5">
            <p className="font-semibold text-xl text-[#6b7280]">
              Partner with us today and start managing your restaurant
              seamlessly!
            </p>
          </div>

          <Button
            className={buttonVariants({
              size: "lg",
              className:
                "bg-[#f97316] hover:bg-[#f97316] hover:text-lg hover:p-6",
            })}
            onClick={() => navigate("/manage-restaurant")}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-white">Manage Restaurant</span>
              <span>
                <MoveRight />
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
