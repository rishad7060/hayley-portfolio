"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageLink {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

interface FooterData {
  brand: {
    name: string;
    logo: string;
  };
  address: {
    title: string;
    text: string;
  };
  contact: {
    title: string;
    phone: string;
    email: string;
  };
  pages: {
    title: string;
    column1: PageLink[];
    column2: PageLink[];
  };
  newsletter: {
    title: string;
    placeholder: string;
    buttonText: string;
    privacyText: string;
    privacyLink: {
      text: string;
      href: string;
    };
  };
  socialLinks: SocialLink[];
  copyright: string;
  credits: {
    poweredBy: {
      text: string;
      name: string;
    };
    madeBy: {
      text: string;
      name: string;
    };
  };
}

interface FooterProps {
  data: FooterData;
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

export function Footer({ data }: FooterProps) {
  return (
    <footer id="footer" className="bg-neutral-100 pt-16">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 lg:gap-12 pb-12 md:pb-16"
        >
          {/* Left Column - Logo, Address, Contact */}
          <div className="lg:col-span-4 space-y-8">
            {/* Address */}
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-foreground">
                {data.address.title}
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.address.text}
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-foreground">
                {data.contact.title}
              </h4>
              <div className="space-y-1">
                <a
                  href={`tel:${data.contact.phone.replace(/\s/g, "")}`}
                  className="block text-lg text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  {data.contact.phone}
                </a>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="block text-lg text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  {data.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column - Pages */}
          <div className="lg:col-span-4">
            <h4 className="text-xl font-semibold text-foreground mb-4">
              {data.pages.title}
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {/* Column 1 */}
              <div className="space-y-3">
                {data.pages.column1.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              {/* Column 2 */}
              <div className="space-y-3">
                {data.pages.column2.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className="hidden md:block lg:col-span-4">
            <h4 className="text-xl font-semibold text-foreground mb-4">
              {data.newsletter.title}
            </h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={data.newsletter.placeholder}
                  className="flex-1 px-4 py-3 text-sm bg-background border border-border focus:outline-none focus:ring-1 focus:ring-foreground transition-all rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors rounded-md"
                >
                  {data.newsletter.buttonText}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                {data.newsletter.privacyText}{" "}
                <Link
                  href={data.newsletter.privacyLink.href}
                  className="underline hover:text-foreground transition-colors"
                >
                  {data.newsletter.privacyLink.text}
                </Link>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
          className="py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <p className="text-xs text-muted-foreground order-2 md:order-1">
            &copy; {data.copyright}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 order-1 md:order-2">
            {data.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted-foreground transition-colors"
                aria-label={social.name}
              >
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Large Logo at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
          className="flex items-end justify-center overflow-hidden"
        >
          <span className="font-logo text-[12vw] font-bold text-foreground leading-none tracking-tighter translate-y-[15%]">{data.brand.name}</span>
        </motion.div>
      </div>
    </footer>
  );
}
