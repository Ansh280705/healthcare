import React from "react";

export const metadata = {
  title: "Terms & Conditions - DoctorDesk",
  description: "Terms and conditions for using the DoctorDesk SaaS platform.",
};

const TermsPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          DoctorDesk is a SaaS-based technology platform that provides appointment booking
          and practice management software tools.
        </p>

        <p>
          DoctorDesk does not provide medical consultation, diagnosis, treatment, or
          prescriptions. The platform only facilitates scheduling, communication, and
          workflow management between users and independent professionals.
        </p>

        <p>
          All payments made on the platform are for software usage and platform access.
          DoctorDesk is not responsible for the outcome, quality, or nature of sessions
          conducted by independent professionals.
        </p>

        <div className="bg-muted/40 p-6 rounded-lg border border-border/50 mt-8">
            <h3 className="font-semibold text-foreground mb-2">Disclaimer</h3>
            <p className="text-sm">
                DoctorDesk is a technology platform and does not provide medical consultation,
                diagnosis, treatment, or prescriptions. All services are provided independently
                by professionals using the platform.
            </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
