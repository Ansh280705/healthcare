// app/(main)/admin/layout.js

import { redirect } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  AlertCircle, Users, CreditCard, BookOpen, FlaskConical } from "lucide-react";

import { verifyAdmin } from "@/actions/admin";
import DynamicBackLink from "@/components/DynamicBackLink"; 

export const metadata = {
  title: "Admin Settings - DoctorDesk",
  description: "Manage doctors, patients, blogs, and platform settings",
};

export default async function AdminLayout({ children }) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/onboarding");

  // Step 3: Calculate backLink dynamically
  
  

  return (
    <div className="container mx-auto px-4 py-5">
   <DynamicBackLink/>

      <Tabs defaultValue="pending" className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <TabsList className="md:col-span-1 bg-muted/30 border-client border-2 flex sm:flex-row md:flex-col w-full h-70 p-2 md:p-1 rounded-md md:space-y-2 sm:space-x-2 md:space-x-0">
          <TabsTrigger value="pending" className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full">
            <AlertCircle className="h-4 w-4 hidden md:inline" /> Pending Verification
          </TabsTrigger>
          <TabsTrigger value="doctors" className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full">
            <Users className="h-4 w-4 hidden md:inline" /> Doctors
          </TabsTrigger>
          <TabsTrigger value="payouts" className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full">
            <CreditCard className="h-4 w-4 hidden md:inline" /> Payouts
          </TabsTrigger>
          <TabsTrigger value="blogs" className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full">
            <BookOpen className="h-4 w-4 hidden md:inline" /> Blogs
          </TabsTrigger>
          <TabsTrigger
            value="labs"
            className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
          >
            <FlaskConical className="h-4 w-4 mr-2 hidden md:inline" />
            <span>Labs</span>
          </TabsTrigger>
        </TabsList>

        <div className="md:col-span-3">{children}</div>
      </Tabs>
    </div>
  );
}
