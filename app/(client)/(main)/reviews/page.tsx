import { payload } from "@/lib/payload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { headers as getHeaders } from "next/headers";
import ReviewsForm from "@/components/ui/reviews/reviewsForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Media, User } from "@/payload-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const REVIEWS_PER_PAGE = 5;

const ReviewsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1");

  const reviews = await payload.find({
    collection: "reviews",
    locale: "uk",
    limit: REVIEWS_PER_PAGE,
    page: page,
    sort: "-createdAt",
  });

  const totalPages = Math.ceil(reviews.totalDocs / REVIEWS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Залишити коментар</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Форма коментаря</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewsForm user={user} />
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 mb-4 mt-8">
        <h3>Коментарі</h3>
        <Badge variant="secondary">{reviews.totalDocs}</Badge>
      </div>

      <div className="space-y-4">
        {reviews.docs.map((review, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between space-x-4">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <Avatar>
                    {((review.author as User).avatar as Media)?.url && (
                      <AvatarImage
                        src={
                          ((review.author as User).avatar as Media).url || ""
                        }
                        alt={(review.author as User).name || ""}
                      />
                    )}
                    <AvatarFallback>
                      {(review.author as User).name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <p className="font-bold">{(review.author as User).name}</p>
                    <p className="text-sm break-words">{review.content}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right max-w-[150px]">
                  <p>
                    {new Date(review.createdAt).toLocaleDateString("uk-UK")} о{" "}
                    {new Date(review.createdAt).toLocaleTimeString("uk-UK", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {reviews.docs.length === 0 ? <p>Залиште перший коментар</p> : null}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button variant="outline" disabled={page === 1} asChild>
            <a href={`/reviews?page=${page - 1}`}>Попередня</a>
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                asChild
              >
                <a href={`/reviews?page=${pageNum}`}>{pageNum}</a>
              </Button>
            ),
          )}

          <Button variant="outline" disabled={page === totalPages} asChild>
            <a href={`/reviews?page=${page + 1}`}>Наступна</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
