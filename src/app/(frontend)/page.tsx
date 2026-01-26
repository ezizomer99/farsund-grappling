import { getNewsArticles, getHomepage } from "@/lib/payload-data";
import HomeClient from "./HomeClient";

export default async function Home() {
  const [newsArticles, homepage] = await Promise.all([
    getNewsArticles(),
    getHomepage(),
  ]);

  return <HomeClient newsArticles={newsArticles} homepage={homepage} />;
}

