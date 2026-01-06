"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const ResourcesView = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-12 tracking-tight">
          Changelog
        </h1>

        <div className="space-y-8 text-lg md:text-xl text-foreground tracking-tight">
          <p>
            Stay up to date with the latest features, improvements, and updates to Bound. Coming
            soon.
          </p>

          <div>
            <Link href="https://calendly.com/vikrambhamre/meeting" target="_blank" rel="noreferrer">
              <Button size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesView
