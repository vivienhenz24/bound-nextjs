"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

const ShaderGradientCanvas = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradientCanvas),
  { ssr: false }
)
const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false }
)

export function ShaderGradientBackground({ className }: { className?: string }) {
  const { mounted, isDark } = useTheme()

  const preset = useMemo(
    () =>
      isDark
        ? {
            type: "plane" as const,
            shader: "defaults" as const,
            animate: "on" as const,
            uSpeed: 0.2,
            uStrength: 2.4,
            uDensity: 1.4,
            uFrequency: 5.2,
            uAmplitude: 1.0,
            color1: "#2b1740",
            color2: "#0f2b4f",
            color3: "#153b32",
            cDistance: 3.2,
            cPolarAngle: 115,
            cAzimuthAngle: 180,
            lightType: "3d" as const,
            brightness: 0.9,
            envPreset: "city" as const,
            reflection: 0.1,
            grain: "on" as const,
            grainBlending: 0.35,
          }
        : {
            type: "plane" as const,
            shader: "defaults" as const,
            animate: "on" as const,
            uSpeed: 0.25,
            uStrength: 2.0,
            uDensity: 1.2,
            uFrequency: 4.8,
            uAmplitude: 1.0,
            color1: "#f3c6a7",
            color2: "#b9d9ff",
            color3: "#c7f1e1",
            cDistance: 3.4,
            cPolarAngle: 120,
            cAzimuthAngle: 160,
            lightType: "3d" as const,
            brightness: 1.15,
            envPreset: "dawn" as const,
            reflection: 0.08,
            grain: "on" as const,
            grainBlending: 0.3,
          },
    [isDark]
  )

  if (!mounted) {
    return <div className={cn("h-full w-full bg-background", className)} />
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      <ShaderGradientCanvas
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ position: "absolute", inset: 0 }}
        pixelDensity={1.2}
        fov={45}
      >
        <ShaderGradient control="props" {...preset} />
      </ShaderGradientCanvas>
    </div>
  )
}
