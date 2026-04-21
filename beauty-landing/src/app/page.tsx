import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { Values } from "@/components/sections/Values";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import placeholderData from "@/data/placeholder.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar data={placeholderData.navbar} />

      {/* Hero Section */}
      <Hero data={placeholderData.hero} />

      {/* About Section */}
      <About data={placeholderData.about} />

      {/* Services Section */}
      <Services data={placeholderData.services} />

      {/* Products Section */}
      <Products data={placeholderData.products} />

      {/* Values Section */}
      <Values data={placeholderData.values} />

      {/* Testimonials Section */}
      <Testimonials data={placeholderData.testimonials} />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer data={placeholderData.footer} />
    </main>
  );
}
