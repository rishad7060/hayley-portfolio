"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RollingText } from "@/components/ui/RollingText";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

interface ServicesData {
  sectionTitle: string;
  description: string;
  items: ServiceItem[];
  cta: {
    label: string;
    href: string;
  };
}

interface ServicesProps {
  data: ServicesData;
}

// Easing function
const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

// Animation variants
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

export function Services({ data }: ServicesProps) {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 mb-12 md:mb-16"
        >
          {/* Title with red accent */}
          <div className="flex-shrink-0">
            <div className="w-16 h-1.5 bg-red-500 mb-4 rounded-full" />
            <RollingText className="text-3xl md:text-4xl lg:text-[5.5vw] font-light tracking-tight">
              {data.sectionTitle}
            </RollingText>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base lg:text-2xl font-thin text-gray-400 max-w-xl leading-snug">
            {data.description}
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-0"
        >
          {data.items.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group py-8 md:py-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start cursor-pointer">
                {/* Image */}
                <div className="md:col-span-4 lg:col-span-5">
                  <div className="relative aspect-[4/3] w-full max-w-[550px] overflow-hidden ">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-8 lg:col-span-7 flex flex-col md:flex-row md:items-start lg:items-stretch gap-6 md:gap-8 h-full">
                  {/* Index & Title */}
                  <div className="flex-1 space-y-10">
                    {/* Index number */}
                    <span className="text-sm text-muted-foreground font-medium">
                      [{service.id}]
                    </span>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl lg:text-[4.5vw] font-light tracking-tight leading-[1.1]">
                      {service.title.split(" ").map((word, i) => (
                        <span key={i} className="block">
                          {word}
                        </span>
                      ))}
                    </h3>
                  </div>

                  {/* Description & Arrow */}
                  <div className="flex flex-col items-start md:items-end lg:justify-end gap-6 md:w-64 lg:w-96">
                    {/* Description */}
                    <p className="text-sm md:text-lg text-muted-foreground leading-relaxed md:text-right">
                      {service.description}
                    </p>

                    {/* Arrow Button */}
                    <Link
                      href={service.href}
                      className="group/btn flex items-center justify-center rounded-sm w-12 h-12 md:w-14 md:h-14 bg-foreground text-background transition-all duration-200 hover:bg-foreground/90"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Last border */}
          <div className="border-t border-border" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <Link
            href={data.cta.href}
            className="group inline-flex items-center gap-3 rounded-md bg-foreground text-background p-1.5 transition-all duration-200 hover:bg-foreground/90"
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
    </section>
  );
}
