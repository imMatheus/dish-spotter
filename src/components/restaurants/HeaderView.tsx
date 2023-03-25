import Image from "next/image";
import React from "react";
import { Star } from "react-feather";
import type { RouterOutputs } from "~/utils/api";
import { useRouter } from "next/router";

interface HeaderViewProps {
  restaurant: NonNullable<RouterOutputs["restaurants"]["getById"]>;
}

export const HeaderView: React.FC<HeaderViewProps> = ({ restaurant }) => {
  const router = useRouter();

  function navigateToImagesScreen() {
    router.query.showImages = "true";
    void router.push(router);
  }

  return (
    <div className="mb-4 flex flex-col gap-4 sm:flex-col-reverse">
      <div className="relative grid h-44 overflow-hidden rounded-lg sm:h-72 sm:grid-cols-4 sm:grid-rows-2 sm:gap-2 md:h-96">
        <div
          className="group relative cursor-pointer sm:col-span-2 sm:row-span-2"
          onClick={navigateToImagesScreen}
        >
          <Image
            src={restaurant.images[0] || ""}
            alt={`${restaurant.name} image`}
            fill={true}
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-transparent transition-colors group-hover:bg-black/10"></div>
        </div>

        {restaurant.images.slice(1, 5).map((image, index) => (
          <div
            className="group relative hidden cursor-pointer sm:block"
            key={index}
            onClick={navigateToImagesScreen}
          >
            <Image
              src={image}
              alt={`${restaurant.name} image`}
              fill={true}
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-transparent transition-colors group-hover:bg-black/10"></div>
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
  );
};
