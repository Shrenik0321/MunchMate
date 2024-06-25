import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <LoaderCircle className="animate-spin text-orange-500" size={48} />
    </div>
  );
};

export default Loader;
