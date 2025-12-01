import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { TechStack } from "../components/sections/TechStack";
import { Services } from "../components/sections/Services";
import { HowWeWork } from "../components/sections/HowWeWork";
import { WhyChooseUs } from "../components/sections/WhyChooseUs";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-[var(--color-electric)] selection:text-black">
      <Header />
      <Hero />
      <TechStack />
      <Services />
      <HowWeWork />

      {/* Dark Footer Section */}
      <div className="bg-black text-white border-t border-gray-800">
        <WhyChooseUs />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
