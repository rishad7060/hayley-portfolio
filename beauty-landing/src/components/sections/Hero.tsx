"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

interface HeroData {
  backgroundText: string;
  tagline: string;
  scrollText: string;
  images: string[];
  cta: {
    label: string;
    href: string;
  };
  marqueeText: string;
  socialLinks: SocialLink[];
}

interface HeroProps {
  data: HeroData;
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

// BONGO Logo Component with decorative asterisk
const BongoLogo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center", className)}>
    <span className="text-2xl md:text-3xl font-bold tracking-tight">B</span>
    <span className="relative mx-0.5">
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 md:w-6 md:h-6 text-red-500"
        fill="currentColor"
      >
        <path d="M12 2L12.9 8.1L18 5L14.9 10.1L21 12L14.9 13.9L18 19L12.9 15.9L12 22L11.1 15.9L6 19L9.1 13.9L3 12L9.1 10.1L6 5L11.1 8.1L12 2Z" />
      </svg>
    </span>
    <span className="text-2xl md:text-3xl font-bold tracking-tight">NGO</span>
  </div>
);

// Decorative Asterisk
const DecorativeAsterisk = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={cn("text-border/60", className)}
    fill="currentColor"
  >
    <path d="M12 2L12.9 8.1L18 5L14.9 10.1L21 12L14.9 13.9L18 19L12.9 15.9L12 22L11.1 15.9L6 19L9.1 13.9L3 12L9.1 10.1L6 5L11.1 8.1L12 2Z" />
  </svg>
);

// Marquee Component
const Marquee = ({
  children,
  className,
  reverse = false,
  speed = 100,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number;
}) => {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: reverse ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

// 3D Continuous Rotating Image Component
const RotatingImage = ({ images }: { images: string[] }) => {
  const [state, setState] = useState({
    rotationDeg: 0,
    frontIndex: 0,
    backIndex: 1,
    halfRotationCount: 0,
  });
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const rotationSpeed = 360 / 10000; // 10 seconds per full rotation (slow)

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setState((prev) => {
        const newRotation = prev.rotationDeg + deltaTime * rotationSpeed;
        const newHalfRotationCount = Math.floor(newRotation / 180);

        if (newHalfRotationCount > prev.halfRotationCount) {
          // Crossed a half-rotation boundary - update the hidden card
          if (newHalfRotationCount % 2 === 1) {
            // Front card is now in back, update it with next image
            return {
              rotationDeg: newRotation,
              frontIndex: (prev.frontIndex + 2) % images.length,
              backIndex: prev.backIndex,
              halfRotationCount: newHalfRotationCount,
            };
          } else {
            // Back card is now in back, update it with next image
            return {
              rotationDeg: newRotation,
              frontIndex: prev.frontIndex,
              backIndex: (prev.backIndex + 2) % images.length,
              halfRotationCount: newHalfRotationCount,
            };
          }
        }

        return { ...prev, rotationDeg: newRotation };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [images.length]);

  const { rotationDeg, frontIndex, backIndex } = state;

  return (
    <div
      className="relative w-[280px] h-[340px] sm:w-[350px] sm:h-[420px] md:w-[420px] md:h-[500px] lg:w-[650px]"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateY(${rotationDeg}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl bg-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={images[frontIndex]}
            alt="Beauty model"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Back face - rotated 180deg */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl bg-white"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src={images[backIndex]}
            alt="Beauty model"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export function Hero({ data }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Main Content */}
      <div className="relative flex-1 flex flex-col">
        {/* Center Section - Logo, Image, Scroll Text */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative">
          {/* Marquee Behind Image */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <Marquee
              speed={5}
              className="text-[15vw] md:text-[18vw] lg:text-[20vw] font-normal tracking-tighter text-gray-100 whitespace-nowrap"
            >
              <span className="mx-8">{data.marqueeText}</span>
              <span className="mx-8">{data.marqueeText}</span>
            </Marquee>
          </div>

          {/* Rotating Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute z-10 pt-2"
          >
            <RotatingImage images={data.images} />
          </motion.div>
        </div>

        {/* Bottom Section - Tagline, Social Icons, CTA */}
        <div className="relative px-6 md:px-12 lg:px-20 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            {/* Left - Tagline & Social Icons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-xs md:text-base font-thin tracking-wide text-foreground max-w-xs leading-relaxed">
                {data.tagline}
              </p>
              <div className="flex items-center gap-4">
                {data.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-muted-foreground transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <SocialIcon name={social.name} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right - CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                href={data.cta.href}
                className="group inline-flex items-center gap-3 bg-foreground text-background p-1.5 rounded-md transition-all duration-200 hover:bg-foreground/90"
              >
                <span className="flex items-center justify-center rounded-sm w-8 h-8 md:w-10 md:h-10 bg-background text-foreground transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </span>
                <span className="text-sm md:text-base font-medium tracking-wide mr-2">
                  {data.cta.label}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
