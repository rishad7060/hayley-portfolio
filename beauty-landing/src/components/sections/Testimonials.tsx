"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RollingText } from "@/components/ui/RollingText";

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

interface TestimonialsData {
  sectionTitle: string;
  items: TestimonialItem[];
  cta: {
    label: string;
    href: string;
  };
}

interface TestimonialsProps {
  data: TestimonialsData;
}

// Easing function
const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

// Animation variants for content
const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
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

// Auto-rotation interval in milliseconds
const AUTO_ROTATE_INTERVAL = 3000;

export function Testimonials({ data }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentTestimonial = data.items[activeIndex];

  // Auto-rotate functionality
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % data.items.length);
  }, [data.items.length]);

  useEffect(() => {
    // Don't auto-rotate if user is hovering
    if (isHovered) return;

    const interval = setInterval(goToNext, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [goToNext, isHovered]);

  const handleAvatarClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 lg:py-32 bg-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Title */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8 md:mb-12"
          >
            <RollingText className="text-3xl md:text-4xl lg:text-[4.5vw] font-light tracking-tight inline-block">
              {data.sectionTitle}
            </RollingText>
          </motion.div>

          {/* Star Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-1 mb-8 md:mb-12"
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 md:w-6 md:h-6 fill-foreground text-foreground"
              />
            ))}
          </motion.div>

          {/* Testimonial Content */}
          <div className="min-h-[200px] md:min-h-[180px] flex items-center justify-center mb-8 md:mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {/* Quote */}
                <blockquote className="text-lg md:text-xl lg:text-3xl font-light leading-snug text-foreground">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest">
                  {currentTestimonial.author} - {currentTestimonial.role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Avatar Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12"
          >
            {data.items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleAvatarClick(index)}
                className={cn(
                  "relative rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
                  activeIndex === index
                    ? "ring-2 ring-red-500 ring-offset-2 ring-offset-background scale-105"
                    : "hover:scale-105 opacity-80 hover:opacity-100"
                )}
                aria-label={`View testimonial from ${item.author}`}
                aria-pressed={activeIndex === index}
              >
                <div className="relative w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href={data.cta.href}
              className="group inline-flex items-center gap-3 bg-foreground text-background p-1.5 rounded-md transition-all duration-200 hover:bg-foreground/90"
            >
              {/* Arrow Icon */}
              <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-sm bg-background text-foreground transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </span>
              {/* Label */}
              <span className="text-sm md:text-base font-medium tracking-wider mr-2">
                {data.cta.label}
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
