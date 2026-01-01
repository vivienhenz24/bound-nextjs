"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export function Hero() {


  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 pb-12 md:pt-10 md:pb-24">
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-primary mb-6 max-w-xl tracking-tight">
          We can prove you wrong
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl font-normal text-foreground max-w-md mb-8 tracking-tight">
          Bound verifies your auth SDKs are secure and correct before they hit production.
        </p>
        <div className="flex flex-row gap-4">
          <Link href="/waitlist">
            <Button size="lg">
              Join Waitlist
            </Button>
          </Link>
          <a href="https://calendly.com/vikrambhamre/meeting" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline">
              Let's Talk
            </Button>
          </a>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center h-full relative">
        <Image
          src="/logo-dark.svg"
          alt="bound logo"
          width={500}
          height={500}
          priority
          className="w-full max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px] h-auto object-contain hidden dark:block"
        />
        <Image
          src="/logo-light.svg"
          alt="bound logo"
          width={500}
          height={500}
          priority
          className="w-full max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px] h-auto object-contain block dark:hidden"
        />
      </div>
    </section>
  )
}

