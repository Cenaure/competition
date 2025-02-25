import { ReactElement } from "react";
import { headers as getHeaders } from "next/headers";
import { payload } from "@/lib/payload";
import { redirect } from "next/navigation";
import AuthTabs from "@/components/ui/authComponents/authTabs";

const AuthPage = async (): Promise<ReactElement> => {
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  if (user) redirect("/dashboard");

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <AuthTabs />
    </div>
  );
};

export default AuthPage;
