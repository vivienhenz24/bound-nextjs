"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"


export function Hero() {


  return (
    <section className="grid grid-cols-2 gap-8 pt-10 pb-24">
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-7xl font-semibold text-primary mb-6 max-w-xl tracking-tight">
          We will prove you wrong.
        </h2>
        <p className="text-2xl font-normal text-foreground max-w-md mb-8 tracking-tight">
          Bound proves your async CUDA kernels can&apos;t deadlock before they hit production.
        </p>
        <div className="flex gap-4">
          <Button size="lg">
            Join Waitlist
          </Button>
          <Button size="lg" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center h-full relative">
        <Image
          src="/logo-dark.svg"
          alt="bound logo"
          width={500}
          height={500}
          priority
          className="w-full h-full object-contain hidden dark:block"
        />
        <Image
          src="/logo-light.svg"
          alt="bound logo"
          width={500}
          height={500}
          priority
          className="w-full h-full object-contain block dark:hidden"
        />
      </div>
    </section>
  )
}

