"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadlineLine {
  text: string;
  style: string;
}

interface AboutData {
  headlineLines: HeadlineLine[];
  cta: {
    label: string;
    href: string;
  };
}

interface AboutProps {
  data: AboutData;
}

// Easing function
const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

// Animation variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};

const ctaVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.6,
      ease: easeOut,
    },
  },
};

export function About({ data }: AboutProps) {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden"
    >
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        {/* Headline with mixed styles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center"
        >
          {data.headlineLines.map((line, index) => (
            <motion.h2
              key={index}
              variants={lineVariants}
              className={cn(
                "text-[6vw] sm:text-[5vw] md:text-[4.5vw] lg:text-[4.5vw] font-light tracking-tight leading-[1.1] uppercase",
                line.style === "outline"
                  ? "text-stroke text-transparent"
                  : "text-foreground"
              )}
              style={
                line.style === "outline"
                  ? {
                    WebkitTextStroke: "1px currentColor",
                    WebkitTextFillColor: "transparent",
                    color: "var(--foreground)",
                  }
                  : undefined
              }
            >
              {line.text}
            </motion.h2>
          ))}

          {/* CTA Button */}
          <motion.div variants={ctaVariants} className="mt-12 md:mt-16">
            <Link
              href={data.cta.href}
              className="group inline-flex items-center gap-3 bg-foreground text-background p-1.5 rounded-md transition-all duration-200 hover:bg-foreground/90"
            >
              {/* Arrow Icon */}
              <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-sm bg-background text-foreground transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </span>
              {/* Label */}
              <span className="text-sm md:text-base font-medium tracking-wide mr-2">
                {data.cta.label}
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
