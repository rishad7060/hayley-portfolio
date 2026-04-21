"use client";

import { cn } from "@/lib/utils";

interface RollingTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
}

export function RollingText({
  children,
  className,
  as: Component = "h2",
}: RollingTextProps) {
  return (
    <Component
      className={cn(
        "group/roll overflow-hidden cursor-pointer relative",
        className
      )}
    >
      <span className="block transition-transform duration-300 ease-out group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        className="absolute top-full left-0 block transition-transform duration-300 ease-out group-hover/roll:-translate-y-full text-muted-foreground"
        aria-hidden="true"
      >
        {children}
      </span>
    </Component>
  );
}
