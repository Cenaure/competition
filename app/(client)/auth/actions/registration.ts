"use server";

import { cookies } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";

interface RegistrationResponse {
  success: boolean;
  error?: string;
}

export async function registration(
  _state: RegistrationResponse,
  formData: FormData,
): Promise<RegistrationResponse> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  if (!email || !password) {
    return { success: false, error: "Email та пароль обов'язкові" };
  }

  const payload = await getPayload({ config });

  try {
    // Создание пользователя
    const user = await payload.create({
      collection: "users",
      data: { email, password },
    });

    if (!user) {
      return { success: false, error: "Не вдалося створити користувача" };
    }

    // Аутентификация, чтобы получить токен
    const loginResult = await payload.login({
      collection: "users",
      data: { email, password },
    });

    if (!loginResult.token) {
      return { success: false, error: "Не вдалося отримати токен" };
    }

    // Устанавливаем токен в куки
    const cookieStore = await cookies();
    cookieStore.set("payload-token", loginResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Registration Error", error);
    return { success: false, error: "Виникла помилка під час реєстрації" };
  }
}
