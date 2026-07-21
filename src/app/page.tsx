import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
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
        <TrustStrip />
        <Services />
        <WhyLogeet />
        <CompanyInfo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
