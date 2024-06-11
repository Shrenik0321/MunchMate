import { MoveRight, ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorised = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="py-10 flex flex-col justify-center items-center">
        <ShieldX size={50} color="#ef4444" />
        <h1 className="font-bold text-5xl text-red-500 p-2">Unauthorised !!</h1>
        <h2 className="font-bold text-xl p-2">Please login again</h2>
        <Button
          className="w-full bg-[#e5e7eb] text-black hover:bg-[#d1d5db]"
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          <div
            className="flex items-center justify-center gap-2"
            onClick={() => navigate("/sign-up")}
          >
            <span>Login</span>
            <span>
              <MoveRight />
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorised;
