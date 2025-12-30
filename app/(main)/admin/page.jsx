// app/(main)/admin/page.jsx
import {
  getPendingDoctors,
  getVerifiedDoctors,
  getPendingPayouts,
  getAllBlogs,
} from "@/actions/admin";
import { TabsContent } from "@radix-ui/react-tabs";
import { PendingDoctors } from "./components/pending-doctors";
import { VerifiedDoctors } from "./components/verified-doctors";
import { PendingPayouts } from "./components/pending-payouts";
import { AdminBlogs } from "./components/admin-blogs";
import { LabsManager } from "./components/labs-manager";
import { getLabs } from "@/actions/labs";

export default async function AdminPage() {
  const [pendingDoctorsData, verifiedDoctorsData, pendingPayoutsData, blogsData,labsData] =
    await Promise.all([
      getPendingDoctors(),
      getVerifiedDoctors(),
      getPendingPayouts(),
      getAllBlogs(),
      getLabs(),
    ]);

  return (
    <>
      <TabsContent value="pending" className="border-none p-0">
        <PendingDoctors doctors={pendingDoctorsData.doctors || []} />
      </TabsContent>

      <TabsContent value="doctors" className="border-none p-0">
        <VerifiedDoctors doctors={verifiedDoctorsData.doctors || []} />
      </TabsContent>

      <TabsContent value="payouts" className="border-none p-0">
        <PendingPayouts payouts={pendingPayoutsData.payouts || []} />
      </TabsContent>

      <TabsContent value="blogs" className="border-none p-0">
        <AdminBlogs blogs={blogsData.blogs || []} />
      </TabsContent>

       <TabsContent value="labs" className="border-none p-0">
        <LabsManager labs={labsData|| []} />
      </TabsContent>
    </>
  );
}
