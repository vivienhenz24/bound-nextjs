import Link from "next/link"
import { LayersPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function HomeView() {
  return (
    <div className="flex min-h-[calc(100svh-12rem)] flex-col items-center justify-center gap-6">
      <div className="text-center"></div>
      <Empty className="bg w-full max-w-2xl">
        <EmptyHeader>
          <EmptyMedia className="bg-transparent">
            <LayersPlus className="size-5 text-primary" />
          </EmptyMedia>
          <EmptyTitle className="text-xl">You have no models yet</EmptyTitle>
          <EmptyDescription className="text-sm">
            Create a model to start training and tracking progress.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/my-models/new" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              Create a model
            </Button>
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  )
}
