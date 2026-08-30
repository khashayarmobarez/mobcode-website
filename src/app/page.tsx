import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Products } from "@/components/products";
import { Faq } from "@/components/faq";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <Products />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
