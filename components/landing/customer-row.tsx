import React from "react"

const universities = [
    {
        name: "Harvard",
        logo: "/Harvard_University_logo.svg"
    },
    {
        name: "Berkeley",
        logo: "/University_of_California,_Berkeley_logo.svg"
    },
]

export function CustomerRow() {
    return (
        <section className="-mt-[12vh] md:-mt-[18vh] pt-36 md:pt-48 pb-8 bg-background">
            <div className="container mx-auto">
                <p className="text-center text-[13px] font-medium text-muted-foreground/50 mb-6 md:mb-8 tracking-tight">
                    built by engineers from
                </p>
                <div className="flex items-center justify-center gap-8 max-w-md mx-auto">
                    {universities.map((university) => (
                        <img
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
