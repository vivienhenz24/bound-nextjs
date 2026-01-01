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
        <section className="py-20 bg-background">
            <div className="container mx-auto">
                <p className="text-center text-[13px] font-medium text-muted-foreground/50 mb-10 tracking-tight">
                    built by engineers from
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                    {universities.map((university) => (
                        <div
                            key={university.name}
                            className="flex items-center justify-center aspect-square bg-secondary/50 border border-border rounded-[var(--radius)] relative overflow-hidden"
                        >
                            <div className="relative h-10 w-full flex items-center justify-center">
                                <img
                                    src={university.logo}
                                    alt={university.name}
                                    className="h-full w-auto object-contain brightness-0 invert"
                                    style={{ 
                                        imageRendering: 'auto',
                                        WebkitImageRendering: 'auto'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
