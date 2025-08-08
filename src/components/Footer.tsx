import { clubInfo } from "@/data/clubInfo";

export default function Footer() {
  return (
    <footer className="bg-black/70 backdrop-blur-sm text-white p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{clubInfo.name}</h3>
            <p className="text-white">
              {clubInfo.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Kontakt</h3>
            <address className="not-italic text-white">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${clubInfo.contact.address.street},+${clubInfo.contact.address.postalCode}+${clubInfo.contact.address.city},+${clubInfo.contact.address.country}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <p>{clubInfo.contact.address.street}</p>
                <p>{clubInfo.contact.address.postalCode} {clubInfo.contact.address.city}, {clubInfo.contact.address.country}</p>
              </a>
            </address>
            <p>E-post: <a href={`mailto:${clubInfo.contact.email}`} className="underline hover:text-blue-400 transition-colors">{clubInfo.contact.email}</a></p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Sosialt</h3>
            <p className="text-white mb-4">
              Følg oss på sosiale medier og bli en del av fellesskapet.
            </p>
            <div className="flex space-x-4">
              <a 
                href={clubInfo.contact.socialMedia.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-blue-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @farsundgrappling
              </a>
            </div>
            <div className="mt-3">
              <a 
                href={clubInfo.contact.socialMedia.facebook}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-blue-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
                Farsund Grappling - Facebook Gruppe
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} Farsund Grappling. Alle rettigheter reservert.</p>
          <p className="mt-2">Nettside utviklet av <a href="https://omerdigital.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OmerDigital</a></p>
        </div>
      </div>
    </footer>
  );
}
