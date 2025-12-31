import React from "react";

export const metadata = {
  title: "Privacy Policy - DoctorDesk",
  description: "Privacy policy for user data on the DoctorDesk SaaS platform.",
};

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          DoctorDesk values user privacy and data security.
        </p>

        <p>
          The platform collects limited information required for account creation,
          appointment scheduling, and platform functionality.
        </p>

        <p>
          DoctorDesk does not access or control the professional services provided by
          independent practitioners using the platform.
        </p>

        <p>
          All data is handled as per standard SaaS data protection practices.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
