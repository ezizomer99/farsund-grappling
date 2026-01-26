import "./globals.css";

// This is a minimal root layout that doesn't wrap routes with HTML structure.
// Each route group ((frontend) and (payload)) provides its own complete layout.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

