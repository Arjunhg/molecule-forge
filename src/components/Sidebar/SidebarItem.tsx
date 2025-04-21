// S-2
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  route: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, label, route, isActive, isCollapsed }: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={route}
        className={`group relative flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
          isActive 
            ? "bg-primary/10 text-primary dark:bg-primary/20" 
            : "text-text hover:bg-gray-100 dark:text-text-light dark:hover:bg-card-dark"
        }`}
      >
        <span className={`${isActive ? "text-primary" : "text-text-light dark:text-text"}`}>
          {icon}
        </span>
        
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
        
        {isActive && !isCollapsed && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-primary"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;
