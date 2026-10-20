import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Values } from "@/components/Values";
import { Services } from "@/components/Services";
import { Dashboard } from "@/components/Dashboard";
import { Flow } from "@/components/Flow";
import { OsTabs } from "@/components/OsTabs";
import { Company } from "@/components/Company";
import { QuoteForm } from "@/components/QuoteForm";
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
        <Dashboard />
        <OsTabs />
        <Company />
        <QuoteForm />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
