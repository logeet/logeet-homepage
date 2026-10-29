import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Values } from "@/components/Values";
import { Services } from "@/components/Services";
import { Flow } from "@/components/Flow";
import { Inventory3D } from "@/components/Inventory3D";
import { OsTabs } from "@/components/OsTabs";
import { QuoteForm } from "@/components/QuoteForm";
import { Stories } from "@/components/Stories";
import { Footer } from "@/components/Footer";
import { FloatingCta } from "@/components/FloatingCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Values />
        <Services />
        <Flow />
        <Inventory3D />
        <OsTabs />
        <Stories />
        <QuoteForm />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
