// component for header
import DropDownMessage from "./DropDownMessage";
import DropDownUser from "./DropDownUser";
import { motion } from "framer-motion";
import { Bell, Menu, Search } from "lucide-react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white shadow-sm dark:bg-background-dark dark:shadow-lg transition-all duration-300">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-md border border-border bg-white p-1.5 shadow-sm dark:border-border-dark dark:bg-card-dark lg:hidden"
          >
            <Menu className="h-6 w-6 text-text dark:text-white" />
          </motion.button>
        </div>

        <div className="hidden sm:block">
          <div className="relative">
            <motion.div 
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Search className="h-5 w-5 text-text-light dark:text-text" />
            </motion.div>
            <input
              type="search"
              className="block w-full rounded-lg border border-border bg-white py-2 pl-10 pr-3 text-sm placeholder-text-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-border-dark dark:bg-card-dark dark:text-white dark:placeholder-text"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-border bg-white dark:border-border-dark dark:bg-card-dark"
          >
            <Bell className="h-5 w-5 text-text dark:text-white" />
            <span className="absolute -right-0.5 -top-0.5 z-1 h-4 w-4 rounded-full bg-danger">
              <span className="absolute -right-0.5 -top-0.5 z-1 h-4 w-4 animate-ping rounded-full bg-danger opacity-75"></span>
            </span>
          </motion.div>

          <DropDownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
