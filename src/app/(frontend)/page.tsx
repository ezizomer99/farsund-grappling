import { getNewsArticles, getHomepage } from "@/lib/payload-data";
import HomeClient from "./HomeClient";
import { unstable_noStore as noStore } from "next/cache";

// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function Home() {
  // Opt out of caching to get fresh data
  noStore();
  
  const [newsArticles, homepage] = await Promise.all([
    getNewsArticles(),
    getHomepage(),
  ]);

  return <HomeClient newsArticles={newsArticles} homepage={homepage} />;
}

