import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Flow } from "@/components/Flow";
import { DataProof } from "@/components/DataProof";
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
        <Services />
        <Flow />
        <DataProof />
        <OsTabs />
        <Company />
        <QuoteForm />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
