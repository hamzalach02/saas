import Benefit from "@/components/Benifit";

import Features from "@/components/Feature";


import { Hero } from "@/components/Hero";
import HowItWorks from "@/components/HowItworks";



export default async function Home() {
  return (
    <>
     
     <div className="flex gap-6 pt-6 justify-center min-h-screen scroll-smooth"> 
      <div className="flex flex-col gap-12 items-center ">
        <section id="hero">
          <Hero />
        </section>
        
        <section id="features">
          <Features />
        </section>
        
        <section id="benefits">
          <Benefit />
        </section>
        
        <section id="how-it-works " className="mb-12">
          <HowItWorks />
        </section>
        
       
       
      </div>
    </div>
    </>
  );
}
