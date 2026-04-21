"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RollingText } from "@/components/ui/RollingText";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  currency: string;
  image: string;
  href: string;
}

interface ProductsData {
  sectionTitle: string;
  description: string;
  items: ProductItem[];
  cta: {
    label: string;
    href: string;
  };
}

interface ProductsProps {
  data: ProductsData;
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
    y: 40,
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

export function Products({ data }: ProductsProps) {
  return (
    <section id="products" className="py-16 md:py-24 lg:py-32 bg-background">
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

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {data.items.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              {/* Product Card */}
              <Link href={product.href} className="block">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-neutral-200 rounded-2xl mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 "
                  />

                  {/* Arrow Button Overlay */}
                  <div className="absolute bottom-4 right-4">
                    <span className="flex items-center justify-center rounded-sm w-10 h-10 md:w-12 md:h-12 bg-foreground text-background transition-all duration-200 group-hover:bg-foreground/90 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex items-start justify-between gap-4">
                  {/* Product Name */}
                  <h3 className="text-sm md:text-lg font-medium text-foreground leading-tight">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <span className="text-sm md:text-lg text-muted-foreground whitespace-nowrap">
                    £{product.price}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <Link
            href={data.cta.href}
            className="group inline-flex items-center gap-3 bg-foreground text-background p-1.5 rounded-md transition-all duration-200 hover:bg-foreground/90"
          >
            {/* Arrow Icon */}
            <span className="flex items-center justify-center rounded-sm w-8 h-8 md:w-10 md:h-10 bg-background text-foreground transition-transform duration-200 group-hover:translate-x-1">
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
