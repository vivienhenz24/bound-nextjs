"use client";

import React from "react";

const TermsView = () => {
    return (
        <div className="min-h-screen py-20 bg-background text-foreground text-left">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms of Service</h1>
                <p className="text-muted-foreground mb-6">Last updated: December 31, 2025</p>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing and using bound, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        bound provides formal verification tools for CUDA kernels. We reserve the right to modify or discontinue the service at any time without notice.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">3. User Obligations</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        All content and software related to bound are the property of bound and are protected by applicable intellectual property laws.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        bound shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsView;
