import { clubInfo } from "@/data/clubInfo";
import { PageTransition, FadeIn, ScrollReveal } from "@/components/animations";

export default function BecomeMemberPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl font-bold mb-8 text-white">Medlemskaps-informasjon</h1>
          </FadeIn>
        
        {/* Registration */}
        <ScrollReveal>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Medlemsregistrering</h2>
          
          <p className="text-gray-800 text-lg mb-8">
            Medlemsregistrering og betalinger for {clubInfo.name} håndteres gjennom Løft Gym.
            Klikk på knappen nedenfor for å bli omdirigert til deres registreringsside for å fullføre
            din medlemsregistrering.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="https://loftgym.ibooking.no/?page=signup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white text-lg font-medium rounded-md hover:bg-blue-800 transition-colors shadow-md"
            >
              Registrer deg hos Løft Gym
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-medium mb-4 text-gray-900">Spørsmål om medlemskap?</h3>
          <p className="text-gray-800">
            Hvis du har spørsmål om våre medlemsalternativer eller trenger hjelp,
            ikke nøl med å kontakte oss gjennom våre sosiale medier-kanaler eller
            snakk med en instruktør i løpet av timen.
          </p>
        </div>
        </ScrollReveal>
      </div>
    </div>
    </PageTransition>
  );
}
