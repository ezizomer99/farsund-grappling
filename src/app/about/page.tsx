'use client';

import Image from "next/image";
import { clubInfo } from "@/data/clubInfo";
import { instructors } from "@/data/instructors";
import { facilityInfo } from "@/data/facilities";
import { PageTransition, FadeIn } from "@/components/animations";

export default function AboutPage() {
  return (
    <PageTransition> 
      <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="text-4xl font-bold mb-8 text-white">Om Farsund Grappling</h1>
      </FadeIn>
      
      {/* Club Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Vår Historie</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {clubInfo.story.map((paragraph, index) => (
            <p key={index} className={`text-gray-700 ${index < clubInfo.story.length - 1 ? 'mb-4' : ''}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>
      
      {/* Instructors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Vår Instruktør</h2>
        <div className="max-w-3xl mx-auto">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 bg-gray-200 flex items-center justify-center relative">
                  <Image
                    src={instructor.imagePlaceholder}
                    alt={instructor.imageAlt}
                    fill
                    className="object-cover grayscale"
                    style={{ objectPosition: '50% 30%' }}
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">{instructor.name}</h3>
                  <p className="text-blue-700 font-medium mb-3">{instructor.title} • {instructor.beltLevel}</p>
                  <p className="text-gray-700">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Facilities */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Våre Fasiliteter</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Training area info and image */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Treningsarealet er inne hos Løft Gym.
              </h3>
              <p className="text-lg font-medium mb-6 text-gray-700 flex items-center">
                Dette er vårt område
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </p>
              <div className="relative h-100 rounded-lg overflow-hidden">
                <Image
                  src={facilityInfo.trainingAreaImage}
                  alt={facilityInfo.trainingAreaAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Right side - Opportunities */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Muligheter</h3>
              <p className="text-gray-800 mb-4">
                Det å ha et BJJ-område inne i et styrketreningsstudio gir deg unike muligheter.
              </p>
              <p className="text-gray-800 mb-4">
                Du kan kombinere kampsporttrening med styrketrening i samme økt, noe som gir deg en komplett treningsopplevelse.
              </p>
              <p className="text-gray-800">
                Etter en intens BJJ-økt kan du fokusere på styrke og kondisjon, eller omvendt - starte med styrketrening før du går over til teknikk og sparring.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Location */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Beliggenhet</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-96 w-full">
            <iframe
              src={facilityInfo.location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              title="Farsund Grappling Location"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-t-lg"
            ></iframe>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-medium mb-2 text-gray-900">Finn Oss</h3>
            <p className="text-gray-800 mb-4">
              Vi holder til i Vanse. Her finner du oss:
            </p>
            <address className="not-italic text-gray-800">
              <p>{clubInfo.name}</p>
              <p>
                <a 
                  href={facilityInfo.location.directionsUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {clubInfo.contact.address.street}
                  <br />
                  {clubInfo.contact.address.postalCode} {clubInfo.contact.address.city}, {clubInfo.contact.address.country}
                </a>
              </p>
              <p className="mt-4">E-post: <a href={`mailto:${clubInfo.contact.email}`} className="underline hover:text-blue-400 transition-colors">{clubInfo.contact.email}</a></p>
              <p>Telefon: {clubInfo.contact.phone}</p>
            </address>
            
            <div className="mt-6">
              <a 
                href={facilityInfo.location.directionsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-700 hover:text-blue-800"
              >
                Få veibeskrivelser i Google Maps
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
    
  );
}
