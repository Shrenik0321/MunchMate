import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminTopBar from "../AdminTopBar/AdminTopBar";

const ManageRestaurant = () => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <AdminTopBar />

          <main className="flex-1">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ManageRestaurant;
