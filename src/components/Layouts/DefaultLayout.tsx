// 1
'use client'

import React, { useState, useLayoutEffect } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DefaultLayout ({ children } : { children : React.ReactNode}) {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { data:session , status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const publicRoutes = [
        "/auth-page/signin",
        "/auth-page/signup",
        "/verify-email",
        "/reset-password",
        "forget-password"
    ]

    useLayoutEffect(() => {
        if (status === "unauthenticated" && !publicRoutes.includes(pathname)) {
          router.push("/auth-page/signin");
        }
      }, [status, router, pathname]);

    return (
      <div className="flex min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-72.5"
            >
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`relative flex flex-1 flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-72.5' : ''}`}>
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

          <main className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10"
            >
              {children}  
            </motion.div>
          </main>
        </div>
      </div>
    );
}





