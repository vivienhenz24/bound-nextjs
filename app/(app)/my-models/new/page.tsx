import { ModelCard } from "@/components/(app)/my-models/ModelCard"
import { ModelForm } from "@/components/(app)/my-models/ModelForm"

export default function MyModelsNewPage() {
  return (
    <div className="grid min-h-[calc(100svh-6rem)] max-h-[calc(100svh-6rem)] gap-8 lg:grid-cols-2">
      <ModelForm />
      <ModelCard />
    </div>
  )
}
