// Shared news data to be used across the website
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Oppstart rundt August 2025",
    date: "TBD",
    summary: "Vi gleder oss til å åpne dørene til vår klubb rundt august 2025.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
  },
];
