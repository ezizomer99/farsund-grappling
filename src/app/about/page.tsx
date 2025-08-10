import Image from "next/image";
import { getInstructors, getFacility, getClubInfo } from "@/lib/sanity.queries";
import { PageTransition, FadeIn } from "@/components/animations";
import { RichText } from "@/components/RichText";
import { urlFor } from "@/lib/sanity.queries";

export default async function AboutPage() {
  const instructors = await getInstructors();
  const facility = await getFacility();
  const clubInfo = await getClubInfo();
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
          {clubInfo?.story ? (
            <div className="text-gray-700">
              <RichText content={clubInfo.story} />
            </div>
          ) : (
            <p className="text-gray-700">
              Club story not available. Please add content in Sanity CMS.
            </p>
          )}
        </div>
      </section>
      
      {/* Instructors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Våre Instruktører</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {instructors.map((instructor) => (
            <div key={instructor._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 bg-gray-200 flex items-center justify-center relative">
                  {instructor.profileImage?.asset ? (
                    <Image
                      src={urlFor(instructor.profileImage.asset).width(400).height(400).url()}
                      alt={instructor.profileImage.alt || instructor.name}
                      fill
                      className="object-cover grayscale"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-300">
                      <span className="text-gray-500 text-4xl">👤</span>
                    </div>
                  )}
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">{instructor.name}</h3>
                  <p className="text-blue-700 font-medium mb-3">{instructor.title} • {instructor.beltLevel}</p>
                  <div className="text-gray-700">
                    <RichText content={instructor.bio} />
                  </div>
                  {(instructor.email || instructor.phone) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {instructor.email && (
                        <p className="text-sm text-gray-600">
                          📧 <a href={`mailto:${instructor.email}`} className="text-blue-600 hover:underline">{instructor.email}</a>
                        </p>
                      )}
                      {instructor.phone && (
                        <p className="text-sm text-gray-600">
                          📞 <a href={`tel:${instructor.phone}`} className="text-blue-600 hover:underline">{instructor.phone}</a>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Facilities */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">{facility?.title || 'Våre Fasiliteter'}</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Training area info and image */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {facility?.trainingArea?.title || ''}
              </h3>
              <p className="text-lg font-medium mb-6 text-gray-700 flex items-center">
                {facility?.trainingArea?.subtitle || 'Dette er vårt område'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </p>
              <div className="relative h-100 rounded-lg overflow-hidden">
                {facility?.trainingArea?.image ? (
                  <Image
                    src={urlFor(facility.trainingArea.image.asset).url()}
                    alt={facility.trainingArea.image.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 border-2 border-dashed border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 text-sm text-center px-4">Treningsområde bilde kommer snart</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right side - Opportunities */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {facility?.opportunities?.title || 'Muligheter'}
              </h3>
              {facility?.opportunities?.description ? (
                <div className="text-gray-800">
                  <RichText content={facility.opportunities.description} />
                </div>
              ) : (
                <>
                  <p className="text-gray-800 mb-4">
                    Det å ha et BJJ-område inne i et styrketreningsstudio gir deg unike muligheter.
                  </p>
                  <p className="text-gray-800 mb-4">
                    Du kan kombinere kampsporttrening med styrketrening i samme økt, noe som gir deg en komplett treningsopplevelse.
                  </p>
                  <p className="text-gray-800">
                    Etter en intens BJJ-økt kan du fokusere på styrke og kondisjon, eller omvendt - starte med styrketrening før du går over til teknikk og sparring.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Location */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">{clubInfo?.location?.title || 'Beliggenhet'}</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-96 w-full">
            <iframe
              src={clubInfo?.location?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2126.0447605433777!2d6.662111315906984!3d58.09529538122932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463a1c3789a47b93%3A0xd2030cbcc7839aba!2sOreveien%2017%2C%204560%20Vanse%2C%20Norway!5e0!3m2!1sen!2sus!4v1626244892015!5m2!1sen!2sus"}
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
            <h3 className="text-xl font-medium mb-2 text-gray-900">{clubInfo?.location?.findUsTitle || 'Finn Oss'}</h3>
            <p className="text-gray-800 mb-4">
              {clubInfo?.location?.description || 'Vi holder til i Vanse. Her finner du oss:'}
            </p>
            <address className="not-italic text-gray-800">
              <p>{clubInfo?.title || 'Farsund Grappling'}</p>
              <div className="mt-2">
                {clubInfo?.contactInfo?.address && (
                  <p className="whitespace-pre-line">
                    <a 
                      href={clubInfo?.location?.directionsUrl || "https://www.google.com/maps/search/?api=1&query=Oreveien+17+4560+Vanse+Norge"}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      {clubInfo.contactInfo.address}
                    </a>
                  </p>
                )}
              </div>
              {clubInfo?.contactInfo?.email && (
                <p className="mt-4">E-post: <a href={`mailto:${clubInfo.contactInfo.email}`} className="underline hover:text-blue-400 transition-colors">{clubInfo.contactInfo.email}</a></p>
              )}
              {clubInfo?.contactInfo?.phone && (
                <p>Telefon: {clubInfo.contactInfo.phone}</p>
              )}
            </address>
            
            <div className="mt-6">
              <a 
                href={clubInfo?.location?.directionsUrl || "https://www.google.com/maps/search/?api=1&query=Oreveien+17+4560+Vanse+Norge"}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-700 hover:text-blue-800"
              >
                {clubInfo?.location?.directionsText || 'Få veibeskrivelser i Google Maps'}
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
