import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-2xl p-6 shadow-sm",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
