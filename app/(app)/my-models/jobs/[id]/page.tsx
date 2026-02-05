import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobProgress } from "@/components/(app)/my-models/job-progress"

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/my-models/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Training Job</h1>
          <p className="text-muted-foreground">View training progress and details.</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <JobProgress jobId={id} />
      </div>
    </div>
  )
}
