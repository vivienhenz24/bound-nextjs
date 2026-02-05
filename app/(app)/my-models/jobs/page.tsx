import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobList } from "@/components/(app)/my-models/job-list"

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Training Jobs</h1>
          <p className="text-muted-foreground">Monitor and manage your TTS model training jobs.</p>
        </div>
        <Button asChild>
          <Link href="/my-models/new">
            <Plus className="mr-2 h-4 w-4" />
            New Training Job
          </Link>
        </Button>
      </div>

      <JobList />
    </div>
  )
}
