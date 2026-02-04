// src/components/layout/full-bleed.tsx
import type { ReactNode } from "react";

export function FullBleed({ children }: { children: ReactNode }) {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      {children}
    </div>
  );
}
