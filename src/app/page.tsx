import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Models from "@/components/Models";
import Pricing from "@/components/Pricing";
import Compatibility from "@/components/Compatibility";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Models />
      <Pricing />
      <Compatibility />
      <Footer />
    </main>
  );
}
