import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Services } from "@/components/Services";
import { WhyLogeet } from "@/components/WhyLogeet";
import { CompanyInfo } from "@/components/CompanyInfo";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <Services />
        <WhyLogeet />
        <CompanyInfo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
