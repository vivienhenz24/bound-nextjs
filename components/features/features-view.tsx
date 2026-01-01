"use client";

import React from "react";

const FeaturesView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-20 bg-background text-foreground">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Powerful Features
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                    Discover the tools that will power your workflow and boost productivity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {/* Example Feature Cards */}
                    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-2">Automated Workflows</h3>
                        <p className="text-muted-foreground">Streamline your processes with our intelligent automation engine.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
                        <p className="text-muted-foreground">Gain insights instantly with our powerful real-time data dashboard.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-2">Secure Collaboration</h3>
                        <p className="text-muted-foreground">Work together safely with enterprise-grade security protocols.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesView;
