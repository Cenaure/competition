"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { login } from "@/app/(client)/auth/actions/login";

const LoginForm = () => {
  const [state, action, pending] = useActionState(login, { success: false });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <form action={action}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Пошта
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Введіть вашу пошту"
            name="email"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Пароль
          </label>
          <Input
            type="password"
            id="password"
            placeholder="••••••••"
            name="password"
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={pending || state.success}
        >
          {pending || state.success ? "Вхід..." : "Увійти"}
        </Button>
      </CardFooter>
      {state?.error && (
        <p className="text-red-500 text-sm text-center mt-2">{state.error}</p>
      )}
    </form>
  );
};

export default LoginForm;
