'use client';

import { PageTransition } from "@/components/animations";

export default function ClientPageWrapper({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
