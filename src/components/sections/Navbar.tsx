"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarLink {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

interface NavbarData {
  brandName: string;
  tagline?: string;
  logo: {
    default: string;
    light: string;
    alt: string;
  };
  heroImage?: string;
  links: NavbarLink[];
  cta: {
    label: string;
    price?: string;
    href: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  socialLinks: SocialLink[];
}

interface NavbarProps {
  data: NavbarData;
}

// Custom X (Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Social icon component
const SocialIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const iconClass = cn("h-5 w-5", className);

  switch (name.toLowerCase()) {
    case "facebook":
      return <Facebook className={iconClass} />;
    case "instagram":
      return <Instagram className={iconClass} />;
    case "twitter":
      return <XIcon className={iconClass} />;
    case "linkedin":
      return <Linkedin className={iconClass} />;
    case "youtube":
      return <Youtube className={iconClass} />;
    default:
      return null;
  }
};


// Easing function
const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

// Animation variants
const menuOverlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: easeOut,
    },
  },
};

const menuContentVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

const socialContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.4,
    },
  },
};

const socialItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

export function Navbar({ data }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Sticky Menu Icon - Always visible when scrolling */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 md:top-6 right-4 md:right-6 lg:right-16 z-50 p-2 text-foreground hover:text-muted-foreground transition-colors bg-background/80 backdrop-blur-sm rounded-full"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
      </button>

      {/* Main Navbar - Scrolls with page */}
      <header className="relative">
        <nav className="">
          <div className="container mx-auto px-4 md:px-6 lg:px-16">
            <div className="flex h-16 md:h-20 items-center justify-between">
              {/* Left - Tagline */}
              <div className="flex-1">
                <span className="text-sm md:text-xl font-light tracking-wider text-gray-500">
                  {data.tagline}
                </span>
              </div>

              {/* Center - Logo with Image */}
              <Link
                href="/"
                className="flex-shrink-0 flex items-center relative font-logo text-2xl md:text-3xl lg:text-4xl font-bold text-foreground"
              >
                {data.brandName}
              </Link>

              {/* Right - Spacer to balance layout */}
              <div className="flex-1 flex items-center justify-end gap-3 md:gap-4">
                {/* Empty spacer to maintain layout balance */}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Expanded Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] bg-background"
          >
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 pt-6 md:pt-8">
              <Link
                href="/"
                className="flex-shrink-0 flex items-center relative font-logo text-2xl md:text-3xl font-bold text-foreground"
              >
                {data.brandName}
              </Link>
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                onClick={closeMenu}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Menu Content */}
            <motion.div
              variants={menuContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col justify-between h-[calc(100vh-80px)] px-6 md:px-12 lg:px-16 pb-8"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col justify-center mt-4">
                <ul className="space-y-2 md:space-y-4">
                  {data.links.map((link) => (
                    <motion.li key={link.name} variants={menuItemVariants}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="group inline-block overflow-hidden"
                      >
                        <div className="relative">
                          <span className="block text-4xl sm:text-5xl md:text-5xl font-light tracking-tight text-foreground transition-transform duration-300 ease-out group-hover:-translate-y-full">
                            {link.name}
                          </span>
                          <span className="absolute top-full left-0 block text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-muted-foreground transition-transform duration-300 ease-out group-hover:-translate-y-full">
                            {link.name}
                          </span>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer - Social Links & CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="pt-4 border-t border-border"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  {/* Social Links */}
                  <motion.div
                    variants={socialContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-4"
                  >
                    {data.socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        variants={socialItemVariants}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-muted-foreground transition-colors duration-200"
                        aria-label={social.name}
                      >
                        <SocialIcon name={social.name} className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <Link
                      href={data.cta.href}
                      onClick={closeMenu}
                      className="group inline-flex items-center gap-3 bg-foreground rounded-md text-background p-1.5 transition-all duration-200 hover:bg-foreground/90"
                    >
                      {/* Arrow Icon */}
                      <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-sm bg-background text-foreground transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                      </span>
                      {/* Label with Price */}
                      <span className="text-sm md:text-base font-normal tracking-wide mr-2">
                        {data.cta.label}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
