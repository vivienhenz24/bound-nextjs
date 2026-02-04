export default function AppLoading() {
  return (
    <div className="flex min-h-[calc(100svh-12rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <img src="/logo-light.svg" alt="bound logo" className="h-20 w-auto dark:hidden" />
        <img src="/logo-dark.svg" alt="bound logo" className="hidden h-20 w-auto dark:block" />
      </div>
    </div>
  )
}
