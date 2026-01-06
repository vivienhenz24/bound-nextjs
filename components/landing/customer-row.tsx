import React from "react"
import Image from "next/image"

const universities = [
  {
    name: "Harvard",
    logo: "/Harvard_University_logo.svg",
  },
  {
    name: "Berkeley",
    logo: "/University_of_California,_Berkeley_logo.svg",
  },
]

export function CustomerRow() {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-background">
      <div className="container mx-auto px-4">
        <p className="text-center text-[13px] font-medium text-muted-foreground/50 mb-6 md:mb-8 tracking-tight">
          built by engineers from
        </p>
        <div className="flex items-center justify-center gap-8 max-w-md mx-auto">
          {universities.map((university) => (
            <Image
              key={university.name}
              src={university.logo}
              alt={university.name}
              className="h-10 md:h-12 w-auto object-contain brightness-0 dark:invert"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
