import { ShaderGradientBackground } from "@/components/ui/shader-gradient"

export function ModelCard() {
  return (
    <div className="relative h-full overflow-hidden rounded-none">
      <ShaderGradientBackground className="absolute inset-0" />
    </div>
  )
}
