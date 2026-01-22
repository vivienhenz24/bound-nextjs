import Link from "next/link"

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-40 pb-20 min-h-[60vh]">
      <h1 className="text-6xl md:text-8xl font-semibold text-primary mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-6 tracking-tight">
        Page not found
      </h2>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Go home
      </Link>
    </section>
  )
}
