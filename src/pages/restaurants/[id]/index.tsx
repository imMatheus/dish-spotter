import React from "react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";
import { Star } from "react-feather";
import { MenuView } from "~/components/restaurants/MenuView";
import { ReviewsView } from "~/components/restaurants/ReviewsView";

const Restaurant: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = api.restaurants.getById.useQuery({ id });

  if (isLoading) return <div>loading...</div>;

  if (!restaurant || isError)
    return (
      <div>
        error...
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );

  return (
    <div className="px-4 sm:py-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col gap-4 sm:flex-col-reverse">
          <div className="relative grid h-44 overflow-hidden rounded-lg sm:h-72 sm:grid-cols-4 sm:grid-rows-2 sm:gap-2 md:h-96">
            <div className="relative sm:col-span-2 sm:row-span-2">
              <Image
                src={restaurant.images[0] || ""}
                alt={`${restaurant.name} image`}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>

            {restaurant.images.slice(1, 5).map((image, index) => (
              <div className="relative hidden sm:block" key={index}>
                <Image
                  src={image}
                  alt={`${restaurant.name} image`}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          <div className="">
            <h1 className="text-2xl font-semibold tracking-wide">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-[14px] w-[14px] fill-text text-text" />
                <p>{restaurant.rating.toFixed(1)}</p>
              </div>
              <div className="-mx-0.5 h-0.5 w-0.5 rounded-full bg-text"></div>
              <div className="flex items-center gap-1">
                <p>{restaurant.numberOfReviews} reviews</p>
              </div>
              <div className="-mx-0.5 h-0.5 w-0.5 rounded-full bg-text"></div>
              <div className="flex items-center gap-1">
                <p>
                  {restaurant.address.street}, {restaurant.address.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {restaurant.menu && <MenuView menu={restaurant.menu} />}

        <ReviewsView reviews={restaurant.reviews} />

        {/* <pre>{JSON.stringify(restaurant, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default Restaurant;
