import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Services } from "@/components/home/Services";
import { Calculator } from "@/components/home/Calculator";
import { Process } from "@/components/home/Process";
import { WhyUs } from "@/components/home/WhyUs";
import { Testimonials } from "@/components/home/Testimonials";
import { Coverage } from "@/components/home/Coverage";
import { FAQ, homeFaqs } from "@/components/FAQ";
import { QuoteCTA } from "@/components/home/QuoteCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Calculator />
      <Process />
      <WhyUs />
      <Testimonials />
      <Coverage />
      <FAQ items={homeFaqs} />
      <QuoteCTA />
    </>
  );
}
