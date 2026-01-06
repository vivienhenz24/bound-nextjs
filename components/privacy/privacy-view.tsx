"use client"

import React from "react"

const PrivacyView = () => {
  return (
    <div className="min-h-screen py-20 bg-background text-foreground text-left">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: December 31, 2025</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Your Code Stays Private</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>We do not collect, store, or transmit your source code.</strong> Bound models
            run entirely on your local machine. Your codebase never leaves your environment during
            training or usage.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We may collect basic account information (email, name) and usage analytics (feature
            usage, error logs) to improve our service, but your proprietary code and intellectual
            property remain completely private.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect information you provide directly to us, such as when you create an account or
            contact support. This includes your email address, name, and company information. We do
            not collect or have access to your source code or repositories.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, and to
            communicate with you about your account. We may collect anonymized usage metrics to
            improve model performance, but these metrics never include your source code.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement industry-standard security measures to protect your information. However,
            no method of transmission over the internet is 100% secure. Because Bound runs locally,
            your code never transmits over the internet to our servers.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">5. Sharing of Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not share your personal information with third parties except as described in this
            policy or with your consent. We never share, sell, or transmit your source code to any
            third party.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">6. Your Choices</h2>
          <p className="text-muted-foreground leading-relaxed">
            You may update or delete your account information at any time by logging into your
            account settings. You maintain complete control over your locally-stored models and
            code.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyView
