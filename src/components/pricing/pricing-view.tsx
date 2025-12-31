"use client";

import React from "react";

const PricingView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-20 bg-background text-foreground">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-700">
                    Simple Pricing
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                    Choose the plan that fits your needs. No hidden fees.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Starter */}
                    <div className="flex flex-col p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                        <h3 className="text-xl font-bold mb-2">Starter</h3>
                        <div className="text-3xl font-extrabold mb-4">$0 <span className="text-base font-normal text-muted-foreground">/mo</span></div>
                        <p className="text-muted-foreground mb-6 flex-grow">Perfect for trying out the platform.</p>
                        <ul className="text-left space-y-2 mb-6 text-sm">
                            <li>✓ 1 User</li>
                            <li>✓ Basic Analytics</li>
                            <li>✓ Community Support</li>
                        </ul>
                        <button className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground font-medium">Get Started</button>
                    </div>

                    {/* Pro */}
                    <div className="flex flex-col p-6 rounded-2xl bg-card border-2 border-primary shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">MOST POPULAR</div>
                        <h3 className="text-xl font-bold mb-2">Pro</h3>
                        <div className="text-3xl font-extrabold mb-4">$29 <span className="text-base font-normal text-muted-foreground">/mo</span></div>
                        <p className="text-muted-foreground mb-6 flex-grow">For professionals and growing teams.</p>
                        <ul className="text-left space-y-2 mb-6 text-sm">
                            <li>✓ 5 Users</li>
                            <li>✓ Advanced Analytics</li>
                            <li>✓ Priority Email Support</li>
                        </ul>
                        <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium">Start Free Trial</button>
                    </div>

                    {/* Business */}
                    <div className="flex flex-col p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                        <h3 className="text-xl font-bold mb-2">Business</h3>
                        <div className="text-3xl font-extrabold mb-4">$99 <span className="text-base font-normal text-muted-foreground">/mo</span></div>
                        <p className="text-muted-foreground mb-6 flex-grow">Unlock maximum power and control.</p>
                        <ul className="text-left space-y-2 mb-6 text-sm">
                            <li>✓ Unlimited Users</li>
                            <li>✓ Custom Reporting</li>
                            <li>✓ 24/7 Phone Support</li>
                        </ul>
                        <button className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground font-medium">Contact Sales</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingView;
