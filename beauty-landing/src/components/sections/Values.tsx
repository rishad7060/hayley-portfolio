"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RollingText } from "@/components/ui/RollingText";

interface ValueItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ValuesData {
  sectionTitle: string;
  description: string;
  items: ValueItem[];
}

interface ValuesProps {
  data: ValuesData;
}

// Easing function
const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

// Image popover animation variants
const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    x: 20,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    x: 10,
    transition: {
      duration: 0.2,
      ease: easeOut,
    },
  },
};

export function Values({ data }: ValuesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="values" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        {/* Header - Centered */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-6xl mx-auto mb-16 md:mb-20"
        >
          <RollingText className="text-3xl md:text-4xl lg:text-[5vw] font-light tracking-tight mb-6 inline-block">
            {data.sectionTitle}
          </RollingText>
          <p className="text-sm md:text-2xl max-w-2xl mx-auto text-gray-500 leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* Values List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {data.items.map((value, index) => (
            <motion.div
              key={value.id}
              variants={itemVariants}
              className="relative group border-t border-border py-10 md:py-14"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onMouseMove={handleMouseMove}
            >
              <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
                {/* Index Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="text-sm text-muted-foreground font-medium">
                    [{value.id}]
                  </span>
                </div>

                {/* Content */}
                <div className="col-span-10 md:col-span-7 lg:col-span-6">
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-[3.5vw] font-light tracking-tight mb-4 transition-colors duration-200 group-hover:text-muted-foreground/80">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-xl text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Image Container - Shows on hover (desktop) */}
                <div className="hidden md:block col-span-4 lg:col-span-5 relative h-full">
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                        style={{
                          perspective: "1000px",
                        }}
                      >
                        <div
                          className="relative w-45 h-55 md:w-50 md:h-62.5 lg:w-75 lg:h-87.5 overflow-hidden shadow-2xl rounded-2xl"
                          style={{
                            transform: "rotate(-3deg)",
                          }}
                        >
                          <Image
                            src={value.image}
                            alt={value.title}
                            fill
                            className="object-cover"
                          />
                          {/* Subtle overlay gradient */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Last border */}
          <div className="border-t border-border" />
        </motion.div>
      </div>
    </section>
  );
}
