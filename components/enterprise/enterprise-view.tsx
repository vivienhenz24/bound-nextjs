"use client";

import React from "react";

const EnterpriseView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-20 bg-background text-foreground">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                    Enterprise Solutions
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                    Scalable, secure, and custom-tailored for large organizations.
                </p>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <div className="p-8 rounded-2xl bg-card border border-border shadow-lg max-w-md">
                        <h3 className="text-2xl font-bold mb-4">Custom Integrations</h3>
                        <p className="text-muted-foreground mb-6">Connect with your existing stack seamlessly.</p>
                        <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                            Contact Sales
                        </button>
                    </div>
                    <div className="p-8 rounded-2xl bg-card border border-border shadow-lg max-w-md">
                        <h3 className="text-2xl font-bold mb-4">Dedicated Support</h3>
                        <p className="text-muted-foreground mb-6">24/7 priority support for your mission-critical operations.</p>
                        <button className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:opacity-90 transition-opacity">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnterpriseView;
