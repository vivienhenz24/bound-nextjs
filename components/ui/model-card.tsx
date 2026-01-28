import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type ModelCardProps = {
  title: string
  description: string
  tags?: string[]
  metrics?: { label: string; value: string }[]
  href?: string
  className?: string
}

export function ModelCard({
  title,
  description,
  tags = [],
  metrics = [],
  href,
  className,
}: ModelCardProps) {
  const content = (
    <Card className={cn("h-full transition-shadow hover:shadow-md", className)}>
      <CardHeader className="gap-1">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        {metrics.length ? (
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border px-3 py-2">
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-sm font-semibold">{metric.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}
