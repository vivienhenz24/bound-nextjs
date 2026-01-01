"use client";

import React from "react";
import { GitBranch, CheckCircle2, Bug, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesView = () => {
    return (
        <div className="flex flex-col min-h-screen py-20 bg-background text-foreground">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-16 md:mb-24">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight">
                    Powerful Features
                </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto tracking-tight">
                        Bound verifies your auth SDKs are secure and correct before they hit production.
                    </p>
                </div>

                {/* Feature Sections */}
                <div className="flex flex-col gap-16 md:gap-24 max-w-4xl mx-auto">
                    {/* Feature 1: CI Integration */}
                    <section className="flex flex-col gap-8">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-primary/10 border border-border">
                                    <GitBranch className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">
                                        Seamless CI Integration
                                    </h2>
                                    <p className="text-muted-foreground mt-2 text-sm md:text-base">
                                        Integrate with GitHub and GitLab as a CI app
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                            Bound integrates directly into your existing CI/CD pipeline as a GitHub App or GitLab CI integration. 
                            No complex setup required—just install the app and configure your workflow. Bound automatically 
                            runs verification checks on every commit and pull request.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="bg-secondary/30 border-border/50">
                                <CardContent className="p-4">
                                    <h3 className="text-sm font-semibold mb-2 text-foreground">GitHub Actions</h3>
                                    <pre className="text-xs font-mono text-foreground/80 overflow-x-auto">
                                        <code>{`name: Bound Verification

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Bound
        uses: bound/verify@v1
        with:
          sdk-path: ./src/auth`}</code>
                                    </pre>
                                </CardContent>
                            </Card>
                            <Card className="bg-secondary/30 border-border/50">
                                <CardContent className="p-4">
                                    <h3 className="text-sm font-semibold mb-2 text-foreground">GitLab CI</h3>
                                    <pre className="text-xs font-mono text-foreground/80 overflow-x-auto">
                                        <code>{`.bound-verify:
  image: bound/verify:latest
  script:
    - bound verify --path ./src/auth
  only:
    - merge_requests
    - main`}</code>
                                    </pre>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Feature 2: PR Review & Checks */}
                    <section className="flex flex-col gap-8">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-primary/10 border border-border">
                                    <CheckCircle2 className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">
                                        Automated PR Reviews
                                    </h2>
                                    <p className="text-muted-foreground mt-2 text-sm md:text-base">
                                        Reviews and checks on every pull request
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                            Every pull request is automatically reviewed by Bound. We verify authentication flows, 
                            check for security vulnerabilities, validate token handling, and ensure your SDK follows 
                            best practices. Get instant feedback on your code before it merges.
                        </p>
                        <Card className="bg-secondary/30 border-border/50">
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">Token Validation</p>
                                            <p className="text-xs text-muted-foreground">All token validation paths verified</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">Authentication Flow</p>
                                            <p className="text-xs text-muted-foreground">OAuth2 flow correctness confirmed</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">Security Checks</p>
                                            <p className="text-xs text-muted-foreground">No known vulnerabilities detected</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 border-t border-border pt-4">
                                        <Bug className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">Potential Issue Found</p>
                                            <p className="text-xs text-muted-foreground">Session expiration not validated in edge case</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Feature 3: Bug Detection with Fix Suggestions */}
                    <section className="flex flex-col gap-8">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-primary/10 border border-border">
                                    <Lightbulb className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">
                                        Intelligent Fix Suggestions
                                    </h2>
                                    <p className="text-muted-foreground mt-2 text-sm md:text-base">
                                        Get actionable suggestions when bugs are found
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                            When Bound detects a bug or security issue, it doesn't just tell you what's wrong—it shows you 
                            exactly how to fix it. Our AI-powered analysis provides specific code suggestions, explains the 
                            vulnerability, and offers multiple fix strategies tailored to your codebase.
                        </p>
                        
                        {/* GitHub PR Discussion Style */}
                        <Card className="bg-card border-border">
                            <CardContent className="p-0">
                                {/* PR Header */}
                                <div className="border-b border-border bg-secondary/30 px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-muted-foreground">src/auth/token.ts</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground">Lines 12-15</span>
                                    </div>
                                </div>

                                {/* Comment Thread */}
                                <div className="divide-y divide-border">
                                    {/* First Comment - Issue Detection */}
                                    <div className="p-4 hover:bg-secondary/20 transition-colors">
                                        <div className="flex gap-3">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div className="h-8 w-8 rounded-full bg-primary/20 border border-border flex items-center justify-center">
                                                    <span className="text-xs font-semibold text-primary">B</span>
                                                </div>
                                            </div>
                                            {/* Comment Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-semibold text-sm text-foreground">bound[bot]</span>
                                                    <span className="text-xs text-muted-foreground">commented</span>
                                                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                                                </div>
                                                <div className="text-sm text-foreground/90 mb-3">
                                                    <p className="mb-2">
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-destructive/10 text-destructive text-xs font-medium">
                                                            <Bug className="h-3 w-3" />
                                                            Security Issue
                                                        </span>
                                                    </p>
                                                    <p className="mt-2">
                                                        Missing token expiration check. The <code className="px-1 py-0.5 rounded bg-secondary/50 text-xs font-mono">validateToken</code> function doesn't verify if the token has expired before returning the decoded payload.
                                                    </p>
                                                </div>
                                                {/* Code Block */}
                                                <div className="rounded-lg border border-border bg-background overflow-hidden">
                                                    <div className="bg-secondary/30 px-3 py-1.5 border-b border-border flex items-center justify-between">
                                                        <span className="text-xs font-mono text-muted-foreground">src/auth/token.ts</span>
                                                        <div className="flex gap-1">
                                                            <span className="text-xs text-muted-foreground">12</span>
                                                            <span className="text-xs text-muted-foreground">-</span>
                                                            <span className="text-xs text-muted-foreground">15</span>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 overflow-x-auto">
                                                        <pre className="text-xs font-mono text-foreground/90">
                                                            <code>{`function validateToken(token) {
  const decoded = jwt.verify(token, secret);
  return decoded; // Missing expiration check
}`}</code>
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Comment - Suggested Fix */}
                                    <div className="p-4 hover:bg-secondary/20 transition-colors">
                                        <div className="flex gap-3">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div className="h-8 w-8 rounded-full bg-primary/20 border border-border flex items-center justify-center">
                                                    <Lightbulb className="h-4 w-4 text-primary" />
                                                </div>
                                            </div>
                                            {/* Comment Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-semibold text-sm text-foreground">bound[bot]</span>
                                                    <span className="text-xs text-muted-foreground">suggested</span>
                                                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                                                </div>
                                                <div className="text-sm text-foreground/90 mb-3">
                                                    <p className="mb-2">
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                                                            <Lightbulb className="h-3 w-3" />
                                                            Suggested Fix
                                                        </span>
                                                    </p>
                                                    <p className="mt-2">
                                                        Add explicit expiration check and handle expired tokens gracefully. This ensures tokens are validated before use.
                                                    </p>
                                                </div>
                                                {/* Code Block with Suggestion */}
                                                <div className="rounded-lg border border-border bg-background overflow-hidden">
                                                    <div className="bg-secondary/30 px-3 py-1.5 border-b border-border flex items-center justify-between">
                                                        <span className="text-xs font-mono text-muted-foreground">src/auth/token.ts</span>
                                                        <div className="flex gap-1">
                                                            <span className="text-xs text-muted-foreground">12</span>
                                                            <span className="text-xs text-muted-foreground">-</span>
                                                            <span className="text-xs text-muted-foreground">20</span>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 overflow-x-auto">
                                                        <pre className="text-xs font-mono text-foreground/90">
                                                            <code>{`function validateToken(token) {
  const decoded = jwt.verify(token, secret);
  
  // Check expiration explicitly
  if (decoded.exp && decoded.exp < Date.now() / 1000) {
    throw new Error('Token expired');
  }
  
  return decoded;
}`}</code>
                                                        </pre>
                                                    </div>
                                                </div>
                                                {/* Action Button */}
                                                <div className="mt-3">
                                                    <button className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                                                        Apply suggestion
                                                    </button>
                                                </div>
                                            </div>
                    </div>
                    </div>
                    </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FeaturesView;
