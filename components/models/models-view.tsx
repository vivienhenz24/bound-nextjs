import { Sparkles } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function ModelsView() {
  return (
    <div className="px-4 py-20">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <Empty className="bg-card/40">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Sparkles className="size-6 text-primary" />
            </EmptyMedia>
            <EmptyTitle>Models coming soon</EmptyTitle>
            <EmptyDescription>
              We’re still prepping the first set of models. This page will be the home for new
              releases, languages, and creators.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Creator login
                </Button>
              </Link>
            </div>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  )
}
