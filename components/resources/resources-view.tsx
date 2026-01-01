"use client";

import React from "react";

const ResourcesView = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
            <div className="container mx-auto px-4 py-20 flex-1 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">
                    {/* Left Column - Hero Section */}
                    <div className="flex flex-col justify-start lg:sticky lg:top-20 lg:h-fit">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight">
                            Changelog
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground tracking-tight">
                            Stay up to date with the latest features, improvements, and updates to Bound.
                        </p>
                    </div>

                    {/* Right Column - Coming Soon */}
                    <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground italic">Coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourcesView;
