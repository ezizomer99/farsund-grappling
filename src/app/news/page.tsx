import { newsItems } from "@/data/news";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function NewsPage() {

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <FadeIn>
          <h1 className="text-4xl font-bold mb-8 text-white">Nyheter</h1>
        </FadeIn>
      
      <StaggerContainer>
        <div className="grid gap-8 max-w-4xl mx-auto">
          {newsItems.map((item) => (
            <StaggerItem key={item.id}>
              <article className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">{item.title}</h2>
                  <p className="text-gray-500 mb-4">{item.date}</p>
                  
                  <p className="text-gray-700 mb-4">{item.summary}</p>
                  <div className="prose max-w-none text-gray-700">
                    {item.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
      </div>
    </PageTransition>
  );
}
