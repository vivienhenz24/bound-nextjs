"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { useAuth } from "@/hooks/use-auth"

export function SignupForm() {
  const router = useRouter()
  const { register } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.")
      return
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    setLoading(true)

    try {
      await register({
        email,
        password,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
      })

      // Redirect to login after successful registration
      router.push("/login?registered=true")
    } catch (err) {
      setError("Registration failed. This email may already be in use.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = (e: React.MouseEvent) => {
    e.preventDefault()
    setError("Google Sign-Up coming soon. Please use email/password for now.")
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Create Account</h1>
        <p className="text-sm font-medium text-muted-foreground/60 tracking-tight">
          Get started with bound by creating your account
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm font-medium text-destructive tracking-tight">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FieldSet>
          <FieldGroup className="gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel
                  htmlFor="firstName"
                  className="text-[13px] font-medium text-foreground/70 uppercase tracking-wider"
                >
                  First Name
                </FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-11 bg-secondary/30 border-border/50 focus-visible:ring-0 focus-visible:border-primary transition-colors rounded-[var(--radius)]"
                />
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="lastName"
                  className="text-[13px] font-medium text-foreground/70 uppercase tracking-wider"
                >
                  Last Name
                </FieldLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-11 bg-secondary/30 border-border/50 focus-visible:ring-0 focus-visible:border-primary transition-colors rounded-[var(--radius)]"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-[13px] font-medium text-foreground/70 uppercase tracking-wider"
              >
                Email Address
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-secondary/30 border-border/50 focus-visible:ring-0 focus-visible:border-primary transition-colors rounded-[var(--radius)]"
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-[13px] font-medium text-foreground/70 uppercase tracking-wider"
              >
                Password
              </FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-secondary/30 border-border/50 focus-visible:ring-0 focus-visible:border-primary transition-colors rounded-[var(--radius)]"
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="confirmPassword"
                className="text-[13px] font-medium text-foreground/70 uppercase tracking-wider"
              >
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 bg-secondary/30 border-border/50 focus-visible:ring-0 focus-visible:border-primary transition-colors rounded-[var(--radius)]"
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
          <Button
            variant="outline"
            className="w-full h-11"
            onClick={handleGoogleSignUp}
            type="button"
          >
            Sign up with Google
          </Button>
        </div>
      </form>

      <div className="text-center text-[13px] font-medium text-muted-foreground/60">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </div>
  )
}
