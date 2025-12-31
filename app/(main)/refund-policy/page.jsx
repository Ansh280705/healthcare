import React from "react";

export const metadata = {
  title: "Refund Policy - DoctorDesk",
  description: "Refund policy for platform usage on DoctorDesk.",
};

const RefundPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Refunds are applicable only for platform subscription or software usage issues.
        </p>

        <p>
          DoctorDesk does not offer refunds for sessions scheduled or conducted with
          independent professionals.
        </p>

        <p>
          If a user experiences a technical issue related to platform access, they may
          contact support for review as per the refund policy.
        </p>
      </div>
    </div>
  );
};

export default RefundPage;
