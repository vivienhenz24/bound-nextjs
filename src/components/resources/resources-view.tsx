"use client";

import React from "react";

const ResourcesView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-20 bg-background text-foreground">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
                    Resources
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                    Guides, documentation, and inspiration to help you succeed.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    <a href="#" className="block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Documentation</h3>
                        <p className="text-sm text-muted-foreground">Technical guides and API references.</p>
                    </a>
                    <a href="#" className="block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Blog</h3>
                        <p className="text-sm text-muted-foreground">Latest news, updates and articles.</p>
                    </a>
                    <a href="#" className="block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Community</h3>
                        <p className="text-sm text-muted-foreground">Join the discussion on our forums.</p>
                    </a>
                    <a href="#" className="block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Help Center</h3>
                        <p className="text-sm text-muted-foreground">FAQs and support articles.</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResourcesView;
