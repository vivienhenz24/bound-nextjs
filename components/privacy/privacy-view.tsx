"use client";

import React from "react";

const PrivacyView = () => {
    return (
        <div className="min-h-screen py-20 bg-background text-foreground text-left">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
                <p className="text-muted-foreground mb-6">Last updated: December 31, 2025</p>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We collect information you provide directly to us, such as when you create an account, use our tools, or contact support.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your account.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">4. Sharing of Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We do not share your personal information with third parties except as described in this policy or with your consent.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">5. Your Choices</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        You may update or delete your account information at any time by logging into your account settings.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyView;
