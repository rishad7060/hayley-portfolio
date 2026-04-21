// Site Configuration Types
export interface Logo {
  default: string;
  light?: string;
  alt: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  accentColor: string;
  foregroundColor?: string;
  mutedColor?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  logo: Logo;
  seo: SEO;
  theme: Theme;
}

// Navbar Types
export interface NavLink {
  name: string;
  href: string;
}

export interface CTAButton {
  label: string;
  href: string;
  price?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon?: string;
}

export interface NavbarConfig {
  brandName: string;
  tagline?: string;
  logo: Logo;
  heroImage?: string;
  links: NavLink[];
  cta: CTAButton;
  contact?: {
    phone: string;
    email: string;
  };
  socialLinks?: SocialLink[];
}

// Hero Types
export interface HeroConfig {
  backgroundText: string;
  tagline: string;
  scrollText: string;
  images: string[];
  cta: CTAButton;
  marqueeText: string;
  socialLinks: SocialLink[];
}

// About (homepage section) Types
export interface HeadlineLine {
  text: string;
  style: "outline" | "filled";
}

export interface AboutConfig {
  headlineLines: HeadlineLine[];
  cta: CTAButton;
}

// About Page (Meet Hayley) Types
export interface AboutPageConfig {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
}

// Services (homepage teaser) Types
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface ServicesConfig {
  sectionTitle: string;
  description: string;
  items: ServiceItem[];
  cta: CTAButton;
}

// Services Page (full menu) Types
export type ServiceDetailSection =
  | { type: "paragraph"; text: string }
  | { type: "note"; text: string }
  | { type: "list"; title: string; items: string[] };

export interface ServiceMenuItem {
  id: string;
  title: string;
  subtitle?: string;
  brief: string;
  consultationRequired: boolean;
  consultationNote?: string;
  sections: ServiceDetailSection[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  serviceIds: string[];
}

export interface ServicesPageConfig {
  heading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  categories: ServiceCategory[];
  services: ServiceMenuItem[];
  cta: CTAButton;
}

// Products Types
export interface ProductItem {
  id: string;
  name: string;
  price: string;
  currency: string;
  image: string;
  href: string;
}

export interface ProductsConfig {
  sectionTitle: string;
  description: string;
  items: ProductItem[];
  cta: CTAButton;
}

// Values Types
export interface ValueItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ValuesConfig {
  sectionTitle: string;
  description: string;
  items: ValueItem[];
}

// Testimonials Types
export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface TestimonialsConfig {
  sectionTitle: string;
  items: TestimonialItem[];
  cta: CTAButton;
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  sectionLabel: string;
  sectionNumber: string;
  headline: string;
  description: string;
  items: FAQItem[];
  cta: CTAButton;
}

// Footer Types
export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterConfig {
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
    column1: FooterLink[];
    column2: FooterLink[];
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

// Main Placeholder Data Type
export interface PlaceholderData {
  site: SiteConfig;
  navbar: NavbarConfig;
  hero: HeroConfig;
  about: AboutConfig;
  aboutPage: AboutPageConfig;
  services: ServicesConfig;
  servicesPage: ServicesPageConfig;
  products: ProductsConfig;
  values: ValuesConfig;
  testimonials: TestimonialsConfig;
  faq: FAQConfig;
  footer: FooterConfig;
}
