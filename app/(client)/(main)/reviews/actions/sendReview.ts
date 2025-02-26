"use server";

import { payload } from "@/lib/payload";
import { Review } from "@/payload-types";

interface SendResponse {
  success: boolean;
  error?: string;
  review?: Review;
}

export const sendReview = async (
  _state: SendResponse,
  formData: FormData,
): Promise<SendResponse> => {
  const content = formData.get("content");
  const userId = formData.get("userId");

  if (!userId || typeof userId !== "string") {
    return { success: false, error: "Необхідно увійти до акаунту." };
  }

  if (typeof content !== "string" || content.length < 10) {
    return {
      success: false,
      error: "Коментар повинен містити щонайменше 10 символів.",
    };
  }

  if (content.length > 500) {
    return {
      success: false,
      error: "Коментар не може містити більше 500 символів.",
    };
  }

  try {
    const newReview = await payload.create({
      collection: "reviews",
      data: { content, author: userId },
      locale: "uk",
    });

    return { success: true, review: newReview };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Виникла помилка" };
  }
};
