"use server";

import { payload } from "@/lib/payload";
import { User } from "@/payload-types";
import { headers as getHeaders } from "next/headers";

interface UserUpdateData {
  [key: string]: unknown;
}

// interface AuthResult {
//   user: {
//     id: string;
//     email: string;
//   };
//   token?: string;
// }

function validatePassword(password: string): boolean {
  return password.length >= 8;
}

async function getCurrentUser() {
  try {
    const headers = await getHeaders();
    const authResult = await payload.auth({ headers });
    return authResult.user;
  } catch (error) {
    console.log(error);
  }
}

interface UpdateResponse {
  success: boolean;
  error?: string;
  data?: User;
}

export async function updateUser(
  _state: UpdateResponse,
  formData: FormData,
): Promise<UpdateResponse> {
  const data = Object.fromEntries(formData) as UserUpdateData;

  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return { success: false, error: "Користувач не авторизован" };
  }

  try {
    const updatedUser = await payload.update({
      collection: "users",
      id: currentUser.id,
      data,
    });

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Не вдалося оновити профіль" };
  }
}

interface ChangePasswordResponse {
  success: boolean;
  error?: string;
  data?: User;
}

export async function changePassword(
  _state: ChangePasswordResponse,
  formData: FormData,
): Promise<ChangePasswordResponse> {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const currentUser = await getCurrentUser();
  if (!currentUser?.id || !currentUser?.email) {
    return { success: false, error: "Користувач не авторизован" };
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, error: "Обов'язкові поля не заповнені" };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, error: "Нові паролі не збігаються" };
  }

  if (!validatePassword(newPassword)) {
    return {
      success: false,
      error: "Новий пароль має бути довше за 8 символів",
    };
  }

  if (newPassword === currentPassword) {
    return {
      success: false,
      error: "Новий пароль має відрізнятися від поточного",
    };
  }

  try {
    await payload.login({
      collection: "users",
      data: {
        email: currentUser.email,
        password: currentPassword,
      },
    });

    const updatedUser = await payload.update({
      collection: "users",
      id: currentUser.id,
      data: {
        password: newPassword,
      },
    });

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error changing password:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Невідома помилка";
    return {
      success: false,
      error: errorMessage.includes("Invalid email or password")
        ? "Поточний пароль хибний"
        : "Не вдалося оновити пароль",
    };
  }
}
