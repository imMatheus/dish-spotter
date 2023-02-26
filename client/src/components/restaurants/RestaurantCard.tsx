import Image from "next/image";
import React from "react";

interface RestaurantCardProps {}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({}) => {
  return (
    <div className="bg-blue-300">
      <div className="relative mb-2 aspect-square w-full">
        <Image
          fill={true}
          alt="image"
          src="https://a0.muscache.com/im/pictures/0c1fc2e1-2a09-4375-9bf6-d0df1b43fba8.jpg?im_w=720"
        />
      </div>
      <h2 className="font-bold">oyyoyyoyy</h2>
      <p className="text-text-grayed">Lorem ipsum dolor sit.</p>
      <p className="font-black">$$</p>
    </div>
  );
};
