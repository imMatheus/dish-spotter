import Image from "next/image";
import React from "react";
import { RouterOutputs } from "~/utils/api";

interface ReviewsViewProps {
  reviews: NonNullable<RouterOutputs["restaurants"]["getById"]>["reviews"];
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ reviews }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Juli",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <h3 className="mb-2 text-2xl font-bold">Reviews</h3>

      {!reviews || reviews.length === 0 ? (
        <p className="text-center text-lg">
          It seems like there are no reviews yet for this restaurant :/
        </p>
      ) : (
        <div className="grid gap-y-5 gap-x-10 sm:grid-cols-2 sm:gap-y-14">
          {reviews.map((review) => (
            <div key={review._id.toString()} className="">
              <div className="mb-2 flex gap-3 sm:mb-3">
                <div className="relative h-10 w-10">
                  <Image
                    src={review.user.image}
                    alt={`${review.user.name} profile image`}
                    fill={true}
                    className="rounded-full"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold leading-5">
                    {review.user.name}
                  </h4>
                  <p className="text-sm text-text-dimmed">
                    {months[review.createdAt.getMonth() - 1]},{" "}
                    {review.createdAt.getFullYear()}
                  </p>
                </div>
              </div>
              <p className="text-sm font-normal leading-relaxed sm:text-base">
                {review.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
