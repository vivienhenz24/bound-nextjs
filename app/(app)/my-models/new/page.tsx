import { ModelCard } from "@/components/(app)/my-models/ModelCard"
import { ModelForm } from "@/components/(app)/my-models/ModelForm"

export default function MyModelsNewPage() {
  return (
    <div className="grid h-full gap-8 lg:grid-cols-2">
      <ModelForm />
      <ModelCard />
    </div>
  )
}
