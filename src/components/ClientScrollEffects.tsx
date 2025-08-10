'use client';

import dynamic from "next/dynamic";

// Dynamically import ScrollEffectsWrapper to ensure it only runs on client
const ScrollEffectsWrapper = dynamic(() => import("@/components/ScrollEffectsWrapper"), {
  ssr: false
});

export default function ClientScrollEffects() {
  return <ScrollEffectsWrapper />;
}
