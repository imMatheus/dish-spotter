import { Restaurant } from "@/types";
import Image from "next/image";
import React from "react";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  return (
    <div className="">
      <div className="relative mb-2 aspect-square w-full">
        <Image
          fill={true}
          alt="image"
          className="rounded-md md:rounded-lg"
          src="https://a0.muscache.com/im/pictures/0c1fc2e1-2a09-4375-9bf6-d0df1b43fba8.jpg?im_w=720"
        />
      </div>
      <h2 className="font-semibold">{restaurant.name || "defualt"}</h2>
      <p className="text-sm text-text-dimmed">Lorem ipsum dolor sit.</p>
      <p className="">$$</p>
    </div>
  );
};
