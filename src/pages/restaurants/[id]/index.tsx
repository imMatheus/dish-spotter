import React from "react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";
import { Star } from "react-feather";
import { MenuView } from "~/components/restaurants/MenuView";
import { ReviewsView } from "~/components/restaurants/ReviewsView";
import { HeaderView } from "~/components/restaurants/HeaderView";

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
        <HeaderView restaurant={restaurant} />

        {restaurant.menu && <MenuView menu={restaurant.menu} />}

        <ReviewsView reviews={restaurant.reviews} />

        {/* <pre>{JSON.stringify(restaurant, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default Restaurant;
