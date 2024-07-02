import { useAuthContext } from "@/hooks/useAuthContext";

const AdminTopBar = () => {
  const { auth } = useAuthContext();

  return (
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {auth && (
          <div className="flex items-center gap-4 font-semibold">
            <div>
              <p>{auth.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopBar;
