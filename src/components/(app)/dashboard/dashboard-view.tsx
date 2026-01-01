"use client";

import React from "react";

export default function DashboardView() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-20 bg-background text-foreground">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 text-primary">
                    Dashboard
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mb-10">
                    Welcome to your dashboard.
                </p>
            </div>
        </div>
    );
}

