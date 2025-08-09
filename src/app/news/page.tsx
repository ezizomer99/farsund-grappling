import { getNewsArticles } from "@/lib/sanity.queries";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { RichText } from "@/components/RichText";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.queries";

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <FadeIn>
          <h1 className="text-4xl font-bold mb-8 text-white">Nyheter</h1>
        </FadeIn>
      
        <StaggerContainer>
          <div className="grid gap-8 max-w-4xl mx-auto">
            {articles.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">Ingen nyheter tilgjengelig for øyeblikket.</p>
              </div>
            ) : (
              articles.map((article) => (
                <StaggerItem key={article._id}>
                  <article className="bg-white rounded-lg shadow-md overflow-hidden">
                    {article.featuredImage && (
                      <div className="relative h-64 w-full">
                        <Image
                          src={urlFor(article.featuredImage.asset).width(800).height(400).url()}
                          alt={article.featuredImage.alt || article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold mb-2 text-gray-900">{article.title}</h2>
                      <div className="flex items-center text-gray-500 mb-4 space-x-4">
                        <p>{new Date(article.publishedAt).toLocaleDateString('en-GB', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}</p>
                        {article.author && (
                          <p>av {article.author.name}</p>
                        )}
                      </div>
                      
                      <p className="text-gray-700 mb-4">{article.summary}</p>
                      <div className="text-gray-700">
                        <RichText content={article.content} />
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))
            )}
          </div>
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
