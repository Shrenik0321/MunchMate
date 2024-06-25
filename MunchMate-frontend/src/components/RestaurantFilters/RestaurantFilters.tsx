import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RestaurantFilters = () => {
  const links = [
    {
      title: "American",
      label: "128",
      icon: Inbox,
      variant: "default",
    },
    {
      title: "Indian",
      label: "9",
      icon: File,
      variant: "ghost",
    },
    {
      title: "Mexican",
      label: "",
      icon: Send,
      variant: "ghost",
    },
    {
      title: "Italian",
      label: "23",
      icon: ArchiveX,
      variant: "ghost",
    },
    {
      title: "German",
      label: "",
      icon: Trash2,
      variant: "ghost",
    },
    {
      title: "Chinese",
      label: "",
      icon: Archive,
      variant: "ghost",
    },
  ];

  return (
    <div>
      <div className="flex justify-between my-2">
        <div>
          <p className="font-bold text-xl">Filter By Cuisine</p>
        </div>
      </div>
      <TooltipProvider>
        <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
          <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            {links.map((link: any, index: any) => (
              <div
                key={index}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "justify-start bg-muted text-black hover:text-white hover:bg-orange-500 rounded-full my-2"
                )}
              >
                {link.title}
              </div>
            ))}
          </nav>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default RestaurantFilters;
