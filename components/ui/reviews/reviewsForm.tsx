"use client";

import { sendReview } from "@/app/(client)/(main)/reviews/actions/sendReview";
import { Button } from "../button";
import { Textarea } from "../textarea";
import { useActionState } from "react";
import { User } from "@/payload-types";

const ReviewsForm = ({ user }: { user: User | null }) => {
  const [reviewState, action, isPending] = useActionState(sendReview, {
    success: false,
  });

  const handleSubmit = (formData: FormData) => {
    if (user) {
      formData.append("userId", user.id);
    }
    action(formData);
  };

  return (
    <>
      <form action={handleSubmit} className="space-y-4 flex flex-col items-end">
        <Textarea
          name="content"
          placeholder="Ваш коментар..."
          className="w-full"
          rows={4}
        />
        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={isPending || !user}
        >
          {user
            ? "Відправити коментар"
            : "Увійдіть до акаунту щоб залишити коментар"}
        </Button>
      </form>
      {reviewState?.error && (
        <p className="text-red-500 mt-2">{reviewState.error}</p>
      )}
    </>
  );
};

export default ReviewsForm;
