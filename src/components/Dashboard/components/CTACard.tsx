import { ArrowRight } from "lucide-react";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";

interface CTACardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "danger";
}

const CTACard: React.FC<CTACardProps> = ({ title, subtitle, icon, color = "primary" }) => {
  const router = useRouter();

  const handleClick = () => {
    const routeMap: { [key: string]: string } = {
      "Molecule Bank": "molecule-bank",
      "Generate Molecule": "model",
      "Search Compounds": "research",
      "Collaborative Research": "message",
    };

    const path = routeMap[title];
    if (path) {
      router.push(`/${path}`);
    }
  };

  const colorClasses = {
    primary: "bg-primary/10 text-primary dark:bg-primary/20",
    secondary: "bg-secondary/10 text-secondary dark:bg-secondary/20",
    accent: "bg-accent/10 text-accent dark:bg-accent/20",
    info: "bg-info/10 text-info dark:bg-info/20",
    success: "bg-success/10 text-success dark:bg-success/20",
    warning: "bg-warning/10 text-warning dark:bg-warning/20",
    danger: "bg-danger/10 text-danger dark:bg-danger/20",
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border-dark dark:bg-card-dark hover-lift"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClasses[color]}`}>
        {icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-lg font-semibold text-text dark:text-white">
            {title}
          </h4>
          <span className="text-sm text-text-light dark:text-text">{subtitle}</span>
        </div>
      </div>

      <motion.div
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 flex w-min cursor-pointer items-center gap-1 rounded-full bg-text-light p-2 text-white transition-colors hover:bg-primary dark:bg-text dark:hover:bg-primary"
        onClick={handleClick}
      >
        <span className="text-sm">
          <ArrowRight size={18} />
        </span>
      </motion.div>
    </motion.div>
  );
};

export default CTACard;
