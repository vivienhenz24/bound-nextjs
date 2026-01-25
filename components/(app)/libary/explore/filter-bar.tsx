"use client"

import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"

export function LibaryExploreFilterBar() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 md:flex-row md:items-center">
      <div className="flex-1">
        <Input placeholder="Search models, languages, or creators" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Toggle variant="outline" size="sm">
          Open source
        </Toggle>
        <Toggle variant="outline" size="sm">
          Multi-speaker
        </Toggle>
        <Toggle variant="outline" size="sm">
          Fast inference
        </Toggle>
      </div>
      <div className="flex items-center gap-2 md:ml-auto">
        <Button variant="outline" size="sm">
          Sort: Trending
        </Button>
      </div>
    </div>
  )
}
