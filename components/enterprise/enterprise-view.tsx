"use client";

import React from "react";
import Link from "next/link";
import { Shield, Lock, GitBranch, Settings, HeadphonesIcon, Users, Server, Building2, Zap, CheckCircle2, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EnterpriseView = () => {
    return (
        <div className="flex flex-col min-h-screen py-20 bg-background text-foreground">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-16 md:mb-24">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight">
                        Enterprise Solutions
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 tracking-tight">
                        Secure, compliant, and custom-tailored for large organizations. Get the verification platform built for enterprise scale.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://calendly.com/vikrambhamre/meeting" target="_blank" rel="noopener noreferrer">
                            <Button size="lg">
                                Schedule a Demo
                            </Button>
                        </a>
                        <Link href="/waitlist">
                            <Button size="lg" variant="outline">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Enterprise Features */}
                <div className="max-w-6xl mx-auto mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-12 text-center tracking-tight">
                        Built for Enterprise Scale
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Security & Compliance */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Security & Compliance</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Enterprise-grade security with SOC 2 and ISO 27001 compliance. End-to-end encryption and comprehensive audit logs.
                                        </p>
                                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>SOC 2 Type II certified</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>ISO 27001 compliant</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Comprehensive audit logs</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Custom Integrations */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <Settings className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Custom Integrations</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Seamlessly integrate with your existing CI/CD pipeline, tools, and workflows. Custom API access and webhooks.
                                        </p>
                                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Custom CI/CD integrations</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>REST API access</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Webhook configurations</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Dedicated Support & SLA */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Dedicated Support & SLA</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            24/7 priority support with dedicated account managers. SLA guarantees with response time commitments.
                                        </p>
                                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>24/7 priority support</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Dedicated account manager</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>SLA guarantees</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* On-Premise Deployment */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <Server className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">On-Premise Deployment</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Self-hosted options for air-gapped environments. Full control over your data and infrastructure.
                                        </p>
                                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Self-hosted deployment</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Air-gapped environments</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Custom infrastructure</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Enterprise Customization */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Enterprise Customization</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Custom verification rules, white-label options, and tailored reporting to match your organization's needs.
                                        </p>
                                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Custom verification rules</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>White-label options</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Custom reporting & analytics</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Advanced Analytics */}
                        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 border border-border w-fit">
                                        <BarChart3 className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">Advanced Analytics</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Comprehensive insights into your verification processes with custom dashboards and reporting.
                                        </p>
                                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Custom dashboards</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Detailed reporting</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                <span>Export capabilities</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="max-w-4xl mx-auto mb-16 md:mb-24">
                    <Card className="bg-card border-border">
                        <CardContent className="p-8 md:p-12">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4 tracking-tight">
                                    Why Choose Bound for Enterprise?
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                                    <p className="text-sm text-muted-foreground">Uptime SLA</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">&lt;1hr</div>
                                    <p className="text-sm text-muted-foreground">Response Time</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                                    <p className="text-sm text-muted-foreground">Support Available</p>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-border">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-3">Reduce Risk</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Catch security vulnerabilities before they reach production. Formal verification ensures your auth SDKs are correct and secure.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-3">Increase Efficiency</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Automate security reviews and reduce manual code audits. Your team can focus on building, not reviewing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA Section */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4 tracking-tight">
                        Ready to Get Started?
                    </h2>
                    <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Let's discuss how Bound can help secure your authentication SDKs at enterprise scale.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://calendly.com/vikrambhamre/meeting" target="_blank" rel="noopener noreferrer">
                            <Button size="lg">
                                Schedule a Demo
                            </Button>
                        </a>
                        <Link href="/waitlist">
                            <Button size="lg" variant="outline">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnterpriseView;
