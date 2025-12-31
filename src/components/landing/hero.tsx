"use client"

import Image from "next/image"
import { useTheme } from "@/hooks/use-theme"

export function Hero() {
  const { isDark, mounted } = useTheme()
  
  return (
    <section className="grid grid-cols-[2fr_1fr] gap-8 py-24">
      <div className="flex flex-col items-start">
        <h2 className="text-5xl font-semibold text-primary mb-4 max-w-xl">
          Stop shipping kernels that hang.
        </h2>
        <p className="text-xl font-normal text-foreground max-w-md">
          Bound proves your async CUDA kernels can&apos;t deadlock or read stale memory — before they hit production.
        </p>
      </div>
      <div className="flex items-center justify-center h-full">
        {mounted && (
          <Image
            src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
            alt="bound logo"
            width={500}
            height={500}
            className="w-full h-full object-contain -translate-x-8 -translate-y-8"
          />
        )}
      </div>
    </section>
  )
}

