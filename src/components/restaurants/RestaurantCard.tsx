import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Star } from "react-feather";
import type { RouterOutputs } from "~/utils/api";
import { ChevronLeft, ChevronRight } from "react-feather";

interface RestaurantCardProps {
  restaurant: RouterOutputs["restaurants"]["getAll"][number];
}

const debounce = (func: (e: any) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (e: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(e), delay);
  };
};

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  const [currentImageSlideIndex, setCurrentImageSlideIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = debounce(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!event.touches[0]) return;
      setTouchStartX(event.touches[0].clientX);
    },
    100
  );

  const handleTouchMove = debounce(
    (event: React.TouchEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleScroll("");
      // if (!event.touches[0] || !imageContainerRef.current) return;

      // const imageWidth =
      //   imageContainerRef.current.children[0]?.clientWidth || 0;
      // const touchCurrentX = event.touches[0].clientX;
      // const touchDistance = touchCurrentX - touchStartX;
      // if (touchDistance > 1) {
      //   setCurrentImageSlideIndex(Math.max(currentImageSlideIndex - 1, 0));
      // } else if (touchDistance < -1) {
      //   setCurrentImageSlideIndex(
      //     Math.min(currentImageSlideIndex + 1, restaurant.images.length - 1)
      //   );
      // }
    },
    100
  );

  const handleScroll = debounce(() => {
    if (!imageContainerRef.current) return;
    const scrollLeft = imageContainerRef.current.scrollLeft;
    const containerWidth = imageContainerRef.current.clientWidth;
    const totalWidth = imageContainerRef.current.scrollWidth;
    const slideWidth = totalWidth / restaurant.images?.length;
    const index = Math.floor((scrollLeft + containerWidth / 2) / slideWidth);
    setCurrentImageSlideIndex(index);
  }, 100);

  return (
    <Link href={`/restaurants/${restaurant._id.toString()}`}>
      <div>
        <div className="group relative [&>*::-webkit-scrollbar]:hidden">
          <div
            onWheel={handleScroll}
            ref={imageContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{
              scrollSnapAlign: "start",
              transition: "scroll-snap-align 0.3s ease-in-out",
            }}
            className="relative mb-2 flex aspect-square w-full overflow-x-scroll rounded-md [scroll-snap-type:x_mandatory] md:rounded-lg"
          >
            {restaurant.images?.map((image, index) => (
              <div
                id={`${restaurant._id.toString()}-card-image-${index}`}
                key={image}
                className="relative h-full min-w-full [scroll-snap-align:start]"
              >
                <Image fill={true} alt="image" src={image} loading="lazy" />
              </div>
            ))}
          </div>
          {currentImageSlideIndex > 0 && (
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white p-2 text-black opacity-0 transition-all hover:scale-110 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCurrentImageSlideIndex((c) => Math.max(c - 1, 0));

                if (!imageContainerRef.current) return;
                const imageWidth =
                  imageContainerRef.current.children[0]?.clientWidth;
                imageContainerRef.current.style.scrollBehavior = "smooth";
                imageContainerRef.current.scrollLeft = Math.max(
                  0,
                  imageWidth ? imageWidth * (currentImageSlideIndex - 1) : 0
                );
                setTimeout(() => {
                  if (!imageContainerRef.current) return;
                  imageContainerRef.current.style.scrollBehavior = "unset";
                }, 500);
              }}
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
          )}
          {currentImageSlideIndex < restaurant.images.length - 1 && (
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white p-2 text-black opacity-0 transition-all hover:scale-110 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCurrentImageSlideIndex((c) =>
                  Math.min(c + 1, restaurant.images.length - 1)
                );

                if (!imageContainerRef.current) return;
                const imageWidth =
                  imageContainerRef.current.children[0]?.clientWidth;
                imageContainerRef.current.style.scrollBehavior = "smooth";
                imageContainerRef.current.scrollLeft = Math.min(
                  imageContainerRef.current.children.length * (imageWidth || 0),
                  imageWidth ? imageWidth * (currentImageSlideIndex + 1) : 0
                );
                setTimeout(() => {
                  if (!imageContainerRef.current) return;
                  imageContainerRef.current.style.scrollBehavior = "unset";
                }, 500);
              }}
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
          <div className="absolute bottom-2 right-2 rounded-md bg-gray-100/70 py-1 px-3 text-sm md:text-xs">
            {currentImageSlideIndex + 1}/{restaurant.images.length}
          </div>
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
      </div>
    </Link>
  );
};
