import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Star } from "react-feather";
import type { RouterOutputs } from "~/utils/api";

interface RestaurantCardProps {
  restaurant: RouterOutputs["restaurants"]["getAll"][number];
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  return (
    <Link href={`/restaurants/${restaurant._id.toString()}`}>
      <div className="relative mb-2 aspect-square w-full">
        <Image
          fill={true}
          alt="image"
          className="rounded-md md:rounded-lg"
          src={restaurant.images[0] || ""}
          // src="https://a0.muscache.com/im/pictures/0c1fc2e1-2a09-4375-9bf6-d0df1b43fba8.jpg?im_w=720"
        />
      </div>
      <div className="flex justify-between">
        <h2 className="font-semibold">{restaurant.name}</h2>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-text text-text" />
          <p className="text-sm">{restaurant.rating.toFixed(1)}</p>
        </div>
      </div>
      <p className="text-sm text-text-dimmed">
        {restaurant.address.street}, {restaurant.address.city}
      </p>
      <p className="">$$</p>
    </Link>
  );
};
