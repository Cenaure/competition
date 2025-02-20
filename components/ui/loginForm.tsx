"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ReactElement, useActionState, useEffect } from "react";
import SubmitButton from "./submitButton";
import { login } from "@/app/(client)/auth/actions/login";

const LoginForm = (): ReactElement => {
  const [state, action, pending] = useActionState(login, { success: false });
  const router = useRouter();

  useEffect(() => {
    const redirect = () => router.push("/admin");
    if (state.success) redirect();
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="shadow-xl h-[100vh] sm:h-auto w-full sm:w-96">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Вхід</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" action={action}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Пошта
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Введіть вашу пошту"
                className="mt-1"
                name="email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Пароль
              </label>
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                className="mt-1"
                required
                name="password"
              />
            </div>

            {state?.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}

            <SubmitButton
              loading={pending ? pending : state.success}
              text="Вхід"
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
