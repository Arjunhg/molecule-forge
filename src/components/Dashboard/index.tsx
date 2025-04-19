"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Beaker, 
  Search, 
  Users 
} from "lucide-react";
import CTACard from "./components/CTACard";
import dynamic from "next/dynamic";

const DashboardCardChart = dynamic(() => import("@/components/Dashboard/components/DashboardCardChart"), {
  ssr: false,
});

const DashboardCardMap = dynamic(() => import("@/components/Dashboard/components/DashboardCardMap"), {
  ssr: false,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Dashboard: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <motion.div variants={itemVariants}>
        <CTACard
          title="Molecule Bank"
          subtitle="Access our database of molecules"
          icon={<Database size={24} />}
          color="primary"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CTACard
          title="Generate Molecule"
          subtitle="Create new molecules with AI"
          icon={<Beaker size={24} />}
          color="secondary"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CTACard
          title="Search Compounds"
          subtitle="Find specific compounds"
          icon={<Search size={24} />}
          color="accent"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CTACard
          title="Collaborative Research"
          subtitle="Work with other researchers"
          icon={<Users size={24} />}
          color="info"
        />
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-4"
      >
        <DashboardCardChart />
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-4"
      >
        <DashboardCardMap />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;