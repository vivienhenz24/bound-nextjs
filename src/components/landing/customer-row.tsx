import React from "react"

const labs = [
    {
        name: "OpenAI",
        light: "/OpenAI_wordmark_light_dark/OpenAI_wordmark_light.svg",
        dark: "/OpenAI_wordmark_light_dark/OpenAI_wordmark_dark.svg"
    },
    {
        name: "Anthropic",
        light: "/Anthropic_wordmark_light_dark/Anthropic_wordmark_light.svg",
        dark: "/Anthropic_wordmark_light_dark/Anthropic_wordmark_dark.svg"
    },
    {
        name: "Google",
        light: "/google-wordmark.svg",
        dark: "/google-wordmark.svg"
    },
    {
        name: "Meta",
        light: "/meta.svg",
        dark: "/meta.svg"
    },
    {
        name: "NVIDIA",
        light: "/NVIDIA_wordmark_light_dark/NVIDIA_wordmark_light.svg",
        dark: "/NVIDIA_wordmark_light_dark/NVIDIA_wordmark_dark.svg"
    },
    {
        name: "xAI",
        light: "/xAI (Grok)_light_dark/xAI (Grok)_light.svg",
        dark: "/xAI (Grok)_light_dark/xAI (Grok)_dark.svg"
    },
]

export function CustomerRow() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto">
                <p className="text-center text-[13px] font-medium text-muted-foreground/50 mb-10 tracking-tight uppercase">
                    Our users work at the world&apos;s leading AI labs.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {labs.map((lab) => (
                        <div
                            key={lab.name}
                            className="flex items-center justify-center py-12 px-8 bg-secondary/50 border border-white/[0.03] rounded-[var(--radius)] hover:bg-secondary hover:border-white/[0.08] transition-all group relative overflow-hidden"
                        >
                            <div className="relative h-7 w-full opacity-100 brightness-0 invert group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 flex items-center justify-center">
                                <img
                                    src={lab.dark}
                                    alt={lab.name}
                                    className="h-full w-auto object-contain hidden dark:block"
                                />
                                <img
                                    src={lab.light}
                                    alt={lab.name}
                                    className="h-full w-auto object-contain block dark:hidden"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
