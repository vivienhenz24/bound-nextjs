export default function ProductsView() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-12 tracking-tight">
          The TTS marketplace
        </h1>

        <div className="space-y-8 text-lg md:text-xl text-foreground tracking-tight">
          <p>
            Bound is a marketplace for specialized local text-to-speech models. Find the perfect
            voice for your use case, or list your own models and start earning.
          </p>

          <p>
            Every model on Bound runs locally on your machine. No API calls, no usage limits, no
            recurring fees. Buy a license once and own it forever.
          </p>

          <p>For buyers:</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Browse specialized TTS models built for specific voices and use cases</li>
            <li>Run everything locally—no cloud dependencies or latency</li>
            <li>One-time license, lifetime ownership</li>
            <li>Preview before you buy</li>
          </ul>

          <p>For sellers:</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Monetize your fine-tuned TTS models</li>
            <li>Set your own pricing and terms</li>
            <li>Reach buyers looking for specialized voices</li>
            <li>Keep your weights protected</li>
          </ul>

          <p>
            Stop giving away your work for free. If you&apos;ve built something valuable, let it
            earn.
          </p>
        </div>
      </div>
    </div>
  )
}
