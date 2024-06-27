import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import AdminTopBar from "../AdminTopBar/AdminTopBar";

const ManageRestaurant = () => {
  return (
    <div className="h-screen w-screen">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel minSize={15} maxSize={20}>
          <div className="flex h-full items-center justify-center p-6 overflow-auto">
            <AdminSidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical" className="h-full w-full">
            <ResizablePanel defaultSize={10} minSize={10} maxSize={15}>
              <div className="flex items-center justify-center h-full w-full p-2 bg-gray-100 shadow">
                <AdminTopBar />
              </div>
            </ResizablePanel>
            <ResizablePanel defaultSize={90}>
              <div className="h-full overflow-auto flex-1 space-y-4 p-8 pt-6">
                <Outlet />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ManageRestaurant;
