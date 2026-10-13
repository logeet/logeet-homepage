import { MessageSquareText } from "lucide-react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Flow } from "@/components/Flow";
import { DataProof } from "@/components/DataProof";
import { OsTabs } from "@/components/OsTabs";
import { Company } from "@/components/Company";
import { QuoteForm } from "@/components/QuoteForm";
import { Footer } from "@/components/Footer";

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

      <a
        href="#quote"
        className="fixed bottom-4 right-4 z-40 flex size-14 sm:bottom-5 sm:right-5 sm:size-16 flex-col items-center justify-center gap-0.5 rounded-2xl bg-blue text-[11px] font-bold text-white shadow-[0_12px_30px_-8px_rgba(37,99,235,0.7)] transition-colors duration-200 hover:bg-blue-strong"
      >
        <MessageSquareText aria-hidden="true" className="size-5" />
        상담문의
      </a>
    </>
  );
}
