"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const ResourcesView = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      <div className="container mx-auto px-4 py-20 flex-1 flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight">
            Changelog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground tracking-tight mb-8">
            Stay up to date with the latest features, improvements, and updates to Bound. Coming
            soon.
          </p>
          <Link href="https://calendly.com/vikrambhamre/meeting" target="_blank" rel="noreferrer">
            <Button size="lg">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResourcesView
