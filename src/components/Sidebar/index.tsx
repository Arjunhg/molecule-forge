// this will contain link to navigate to various pages. S-3.0 (useLocalStorage)
'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import {
    LayoutGrid,
    Atom,
    Network,
    Microscope,
    Settings,
    MessageSquareText,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import useLocalStorage from "@/hook/useLocalStorage";
import { motion } from "framer-motion";

interface SidebarProps{
    sidebarOpen: boolean
    setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
    {
      name: "",
      menuItems: [
        {
          icon: <LayoutGrid size={22} />,
          label: "Dashboard",
          route: "/",
        },
        {
          icon: <Atom size={22} />,
          label: "Molecules Bank",
          route: "/molecule-bank",
        },
        {
          icon: <Network size={22} />,
          label: "Model",
          route: "/model",
        },
        {
          icon: <Microscope size={22} />,
          label: "Research",
          route: "/research",
        },
        {
          icon: <MessageSquareText size={22} />,
          label: "Messages",
          route: "/message",
        },
      ],
    },
    {
      name: "Settings",
      menuItems: [
        {
          icon: <Settings size={22} />,
          label: "Settings",
          route: "/settings",
        },
      ],
    },
  ];

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useLocalStorage("sidebar-collapsed", false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside className={`h-screen overflow-y-auto bg-white dark:bg-background-dark border-r border-border dark:border-border-dark transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72.5'}`}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border dark:border-border-dark">
                    <Link href="/" className="flex items-center">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center"
                        >
                            <Image
                                src="/images/logo/logo.svg"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="mr-2"
                            />
                            {!isCollapsed && (
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xl font-bold text-primary"
                                >
                                    Molecule-Forge
                                </motion.span>
                            )}
                        </motion.div>
                    </Link>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleCollapse}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-card-dark"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </motion.button>
                </div>

                <div className="flex-1 py-4">
                    {menuGroups.map((group, index) => (
                        <div key={index} className="mb-6">
                            {!isCollapsed && group.name && (
                                <h3 className="px-4 mb-2 text-xs font-semibold text-text-light dark:text-text uppercase tracking-wider">
                                    {group.name}
                                </h3>
                            )}
                            <ul className="space-y-1">
                                {group.menuItems.map((item, itemIndex) => (
                                    <motion.li 
                                        key={itemIndex}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <SidebarItem 
                                            icon={item.icon} 
                                            label={item.label} 
                                            route={item.route} 
                                            isActive={pathname === item.route}
                                            isCollapsed={isCollapsed}
                                        />
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-border dark:border-border-dark">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                            <span className="text-sm font-medium">PQ</span>
                        </div>
                        {!isCollapsed && (
                            <div className="ml-3">
                                <p className="text-sm font-medium text-text dark:text-white">Molecule-Forge</p>
                                <p className="text-xs text-text-light dark:text-text">v1.0.0</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

// sidebar renders and calles useLocalStorage('selectedMenu', 'dashboard')
// If localStorage contains a value for selectedMenu, useLocalStorage retrieves it. Otherwise, it uses 'dashboard' as the initial value.

// useLocalStorage('selectedMenu', 'dashboard')     -> Initial state (dashboard or stored value)
// |
// v
// Sidebar renders -> Renders SidebarItem
// |
// v
// SidebarItem renders -> Receives (pageName, setPageName)
// |
// v
// User clicks a menu item -> handleClick() -> Updates pageName using setPageName
// |
// v
// SidebarItem checks isActive -> Applies active styles if matches pathname
// |
// v
// useEffect in useLocalStorage -> Saves updated pageName in localStorage
