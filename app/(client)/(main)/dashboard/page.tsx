import { UserDashboard } from "@/components/ui/dashboard/userDashboard";
import { payload } from "@/lib/payload";
import { Suspense } from "react";
import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardSkeleton } from "@/components/ui/dashboard/dashboardSkeleton";

const DashboardPage = async () => {
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  if (!user) redirect("/auth");

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <UserDashboard user={user} />
    </Suspense>
  );
};

export default DashboardPage;
