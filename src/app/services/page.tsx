"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, Info } from "lucide-react";
import placeholderData from "@/data/placeholder.json";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { RollingText } from "@/components/ui/RollingText";
import { cn } from "@/lib/utils";
import type { ServiceDetailSection } from "@/data/types";

const { servicesPage, navbar, footer } = placeholderData;

// Easing used across the site
const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

// Animation variants (match FAQ / section conventions)
const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

function ServiceDetail({
  sections,
}: {
  sections: readonly ServiceDetailSection[];
}) {
  return (
    <div className="space-y-5 pb-6 md:pb-8 pr-2 md:pr-10">
      {sections.map((section, idx) => {
        if (section.type === "paragraph") {
          return (
            <p
              key={idx}
              className="text-sm md:text-lg text-muted-foreground leading-relaxed"
            >
              {section.text}
            </p>
          );
        }

        if (section.type === "note") {
          return (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-border bg-neutral-50 p-4 md:p-5"
            >
              <Info className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5 text-foreground" />
              <p className="text-xs md:text-base text-foreground leading-relaxed">
                {section.text}
              </p>
            </div>
          );
        }

        if (section.type === "list") {
          return (
            <div key={idx} className="space-y-2">
              <h4 className="text-sm md:text-base font-medium tracking-wide text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-1.5">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm md:text-lg text-muted-foreground leading-relaxed"
                  >
                    <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

function ServiceRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: (typeof servicesPage.services)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="border-b border-border/50 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 md:py-7 flex items-start justify-between gap-4 md:gap-8 text-left group"
        aria-expanded={isOpen}
      >
        {/* Left: index + title + brief */}
        <div className="flex-1 min-w-0 flex gap-4 md:gap-6">
          <span className="text-xs md:text-sm text-muted-foreground font-medium pt-2 hidden sm:inline-block">
            [{String(index + 1).padStart(3, "0")}]
          </span>
          <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 gap-1">
              <h3 className="text-xl md:text-3xl lg:text-4xl font-light tracking-tight text-foreground group-hover:text-foreground/80 transition-colors leading-tight">
                {service.title}
              </h3>
              {service.subtitle && (
                <span className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground">
                  {service.subtitle}
                </span>
              )}
              {service.consultationRequired && (
                <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-foreground/30 bg-neutral-50 px-2.5 py-0.5 text-[10px] md:text-xs uppercase tracking-wider text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Consultation Required
                </span>
              )}
            </div>
            <p className="text-sm md:text-lg text-muted-foreground leading-snug max-w-3xl">
              {service.brief}
            </p>
          </div>
        </div>

        {/* Right: plus icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center mt-1"
        >
          <Plus className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: easeOut },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: easeOut },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="pl-0 sm:pl-10 md:pl-12">
              <ServiceDetail
                sections={service.sections as readonly ServiceDetailSection[]}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  // Build a quick lookup and ordered render list that respects categories
  const serviceMap = new Map(
    servicesPage.services.map((s) => [s.id, s])
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar data={navbar} />

      {/* Heading */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20 bg-background">
        <div className="mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="max-w-5xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="h-1.5 w-10 bg-red-500 rounded-full" />
              <span className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground">
                {servicesPage.heading.eyebrow}
              </span>
            </div>

            {/* Title */}
            <RollingText
              as="h1"
              className="text-4xl md:text-6xl lg:text-[6vw] font-light tracking-tight leading-[1.05] inline-block whitespace-pre-line"
            >
              {servicesPage.heading.title}
            </RollingText>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
              className="mt-6 md:mt-8 max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed"
            >
              {servicesPage.heading.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Categorised service menu */}
      <section className="pb-20 md:pb-28 lg:pb-32 bg-background">
        <div className="mx-auto px-6 md:px-12 lg:px-20 space-y-16 md:space-y-20">
          {servicesPage.categories.map((category, catIdx) => {
            const categoryServices = category.serviceIds
              .map((id) => serviceMap.get(id))
              .filter((s): s is (typeof servicesPage.services)[number] =>
                Boolean(s)
              );

            if (categoryServices.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
              >
                {/* Category label */}
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-24 space-y-3">
                    <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase">
                      {String(catIdx + 1).padStart(2, "0")} / {String(servicesPage.categories.length).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-[2.8vw] font-light tracking-tight leading-tight">
                      {category.title}
                    </h2>
                  </div>
                </div>

                {/* Accordion list */}
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-50px" }}
                  className={cn(
                    "lg:col-span-8 rounded-2xl border border-border/50 bg-gray-100 overflow-hidden"
                  )}
                >
                  <div className="divide-y divide-border/50 m-1.5 bg-white rounded-xl">
                    {categoryServices.map((service, sIdx) => {
                      const globalIndex = servicesPage.services.findIndex(
                        (s) => s.id === service.id
                      );
                      return (
                        <div key={service.id} id={service.id} className="px-5 md:px-7">
                          <ServiceRow
                            service={service}
                            index={globalIndex === -1 ? sIdx : globalIndex}
                            isOpen={openId === service.id}
                            onToggle={() => toggle(service.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="flex flex-col items-center gap-4 pt-6 text-center"
          >
            <p className="text-sm md:text-base text-muted-foreground max-w-xl">
              Not sure where to start? Get in touch and we&rsquo;ll help you find the right service for your curls.
            </p>
            <Link
              href={servicesPage.cta.href}
              className="group inline-flex items-center gap-3 bg-foreground text-background p-1.5 rounded-md transition-all duration-200 hover:bg-foreground/90"
            >
              <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-sm bg-background text-foreground transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </span>
              <span className="text-sm md:text-base font-medium tracking-wide mr-2">
                {servicesPage.cta.label}
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer data={footer} />
    </main>
  );
}
