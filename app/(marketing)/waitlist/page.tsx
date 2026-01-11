import { WaitlistForm } from "@/components/waitlist/waitlist-form"

export default function WaitlistPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background">
      <div className="w-full max-w-[440px] px-4 md:px-6 py-8 md:py-12">
        <WaitlistForm />
      </div>
    </div>
  )
}
