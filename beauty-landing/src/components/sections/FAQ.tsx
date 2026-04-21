"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Plus } from "lucide-react"
import placeholderData from "@/data/placeholder.json"
import { RollingText } from "@/components/ui/RollingText"

const { faq } = placeholderData

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// FAQ Item component
function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: typeof faq.items[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="border-b border-border/50 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between gap-4 text-left group"
      >
        <span className="text-base md:text-2xl font-normal text-foreground group-hover:text-foreground/80 transition-colors">
          {index + 1}. {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center mt-0.5"
        >
          <Plus className="w-3.5 h-3.5 text-muted-foreground" />
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
                height: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm md:text-lg text-muted-foreground leading-snug pr-10">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="py-20 md:py-28 lg:py-32 bg-white">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-12 lg:gap-16">
          {/* Left Column - Header Content */}
          <div className="lg:col-span-2 max-w-3xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-5"
            >
              <RollingText className="text-3xl md:text-4xl lg:text-[4.5vw] font-light tracking-tight text-center leading-[1.15] inline-block">
                {faq.headline}
              </RollingText>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-sm md:text-xl tracking-tight text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto text-center"
            >
              {faq.description}
            </motion.p>
          </div>

          {/* Right Column - FAQ Accordion */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="rounded-2xl border border-border/50 bg-gray-100 overflow-hidden lg:col-span-2"
          >
            <div className="divide-y divide-border/50 m-1.5 bg-white rounded-xl">
              {faq.items.map((item, index) => (
                <div key={item.id} className="px-6">
                  <FAQItem
                    item={item}
                    index={index}
                    isOpen={openId === item.id}
                    onToggle={() => toggleItem(item.id)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
