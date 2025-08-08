'use client';

import Link from "next/link";
import { newsItems } from "@/data/news";
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem, PageTransition } from "@/components/animations";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
        <div className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center max-w-5xl px-4">
            <FadeIn delay={0.3}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Velkommen til Farsund Grappling</h1>
            </FadeIn>
            <FadeIn delay={0.6}>
              <div className="flex gap-4 justify-center">
                <Link 
                  href="/training" 
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md transition-colors"
                >
                  Se Timeplanen
                </Link>
                <Link 
                  href="/become-member" 
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded-md transition-colors"
                >
                  Bli Medlem
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Hvorfor Trene Med Oss?</h2>
          </ScrollReveal>
          
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StaggerItem>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                  <div className="text-blue-700 text-4xl mb-4">🥋</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Erfaren Instruktør</h3>
                  <p className="text-gray-800">Lær fra en erfaren instruktør, som vil veilede deg gjennom teknikker og konsepter.</p>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                  <div className="text-blue-700 text-4xl mb-4" >👨‍👩‍👧‍👦</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Støttende Fellesskap</h3>
                  <p className="text-gray-800">Bli med i et vennlig og inkluderende miljø hvor alle hjelper hverandre med å bli bedre.</p>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                  <div className="text-blue-700 text-4xl mb-4">🏆</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Alle Ferdighetsnivåer</h3>
                  <p className="text-gray-800">Uansett om du er helt nybegynner eller en erfaren utøver, har vi klasser for deg.</p>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 px-4 relative text-white">
        <div className="absolute inset-0 backdrop"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-6 text-white">🤼‍♂️ Hva er Grappling?</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl mb-8">
              Grappling er en fellesnevner for kampsporter som er grepsbaserte (BJJ / judo / bryting / submission wrestling), i motsetning til de som benytter slag og spark. I stedet brukes teknikker som kast, posisjonering og bakkekontroll – med mål om å avslutte kampen ved hjelp av leddlåser eller kvelinger.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-xl mb-8">
              Disse avslutningene kalles submissions, fordi motstanderen må gi seg (&quot;tappe ut&quot;) for å unngå skade når teknikken utføres korrekt. (obs: man skader ikke hverandre på trening med vilje)          
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link 
              href="/become-member" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-md inline-block transition-colors"
            >
              Start i Dag
            </Link>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Latest News Preview Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Siste Nytt</h2>
              <Link href="/news" className="text-blue-700 hover:underline">
                Se Alle
              </Link>
            </div>
          </ScrollReveal>
          
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newsItems.slice(0, 3).map((item) => (
                <StaggerItem key={item.id}>
                  <div className="border rounded-lg overflow-hidden shadow-md">
                    <div className="bg-gray-200 h-48 flex items-center justify-center">
                      <span className="text-gray-500">Nyhetsbilde plassholder</span>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-800 mb-4">{item.summary}</p>
                      <Link href="/news" className="text-blue-700 hover:underline">
                        Les Mer
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
}
