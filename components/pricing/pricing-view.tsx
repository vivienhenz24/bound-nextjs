"use client";

import React from "react";
import Link from "next/link";
import { GitBranch, CheckCircle2, Shield, HeadphonesIcon, Database, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PricingView = () => {
    return (
        <div className="flex flex-col min-h-screen py-20 bg-background text-foreground">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-16 md:mb-24">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight">
                        Custom Pricing
                </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 tracking-tight">
                        Tailored solutions for your team. Get personalized pricing based on your needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://calendly.com/vikrambhamre/meeting" target="_blank" rel="noopener noreferrer">
                            <Button size="lg">
                                Schedule a Demo
                            </Button>
                        </a>
                        <Link href="/waitlist">
                            <Button size="lg" variant="outline">
                                Join Waitlist
                            </Button>
                        </Link>
                    </div>
                    </div>

                {/* Features Showcase */}
                <div className="max-w-5xl mx-auto mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 text-center tracking-tight">
                        Everything You Need to Secure Your Auth SDKs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* CI Integration */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <GitBranch className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">CI/CD Integration</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Seamless integration with GitHub and GitLab. Automatically verify every commit and PR.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* PR Reviews */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <CheckCircle2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Automated PR Reviews</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Every pull request is automatically reviewed for security and correctness.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Security */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Security Verification</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Comprehensive security checks to catch vulnerabilities before production.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Repositories */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <Database className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Repository Management</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Monitor and verify multiple repositories with flexible limits.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Support */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <HeadphonesIcon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Priority Support</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Get dedicated support with fast response times and expert guidance.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customization */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Enterprise Customization</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Custom integrations and configurations tailored to your workflow.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingView;
