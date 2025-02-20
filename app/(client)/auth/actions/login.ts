"use server";

import { User } from "@/payload-types";
import { cookies } from "next/headers";
import { payload } from "@/lib/payload";

interface LoginResponse {
  success: boolean;
  error?: string;
}

export type Result = {
  exp?: number;
  token?: string;
  user?: User;
};

export async function login(
  _state: LoginResponse,
  formData: FormData,
): Promise<LoginResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email та пароль обов'язкові" };
  }

  try {
    const result: Result = await payload.login({
      collection: "users",
      data: { email, password },
    });

    if (!result?.token) {
      return { success: false, error: "Невірний email або пароль" };
    }

    const cookieStore = await cookies();

    cookieStore.set("payload-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login Error", error);
    return { success: false, error: "Виникла помилка під час входу" };
  }
}
