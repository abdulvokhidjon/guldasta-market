import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosLogOut } from "react-icons/io";
import { useAppStore } from "../lib/zustand";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const admin = useAppStore((state) => state.setAdmin);

  function logOut() {
    const cheker = confirm("Rostdan ham tizimdan chiqmoqchimisz ?");
    if (cheker) {
      admin(null);
    }
  }

  return (
    <div className="mt-3 flex h-16 items-center bg-white shadow-sm transition-colors duration-300 dark:bg-[#171717]">
      <div className="base-container flex justify-between">
        <NavLink className="text-xl font-bold text-gray-900 transition-colors dark:text-gray-100">
          Guldasta Market
        </NavLink>
        <div className="flex items-center gap-3">
          {/* ModeToggle */}
          <ModeToggle />

          <Button
            variant="outline"
            onClick={logOut}
            className="gap-2 border-gray-300 text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            Chiqish <IoIosLogOut />
          </Button>
        </div>
      </div>
    </div>
  );
}
