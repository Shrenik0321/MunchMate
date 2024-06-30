import { useAuthContext } from "@/hooks/useAuthContext";

const AdminTopBar = () => {
  const { auth } = useAuthContext();

  return (
    <div className="flex items-center justify-center h-full w-full p-4 bg-gray-100 shadow">
      {auth && (
        <div className="hidden sm:flex items-center gap-4 font-semibold">
          <div>
            <p>{auth && auth.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTopBar;
