import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { ChevronLeft, Upload } from "react-feather";

interface RestaurantImageGalleryProps {
  images: string[];
}

export const RestaurantImageGallery: React.FC<RestaurantImageGalleryProps> = ({
  images,
}) => {
  const router = useRouter();
  const showImageGallery = router.query.showImages === "true";

  return (
    <div
      className={classNames(
        "pointer-events-[all] fixed inset-0 z-50 flex h-screen flex-col overflow-scroll bg-white transition-transform duration-500",
        showImageGallery ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="sticky top-0 z-50 flex justify-between bg-white p-4">
        <div
          className="relative flex-shrink-0 rounded-full p-1 transition-colors hover:bg-gray-200/50"
          onClick={() => {
            router.query.showImages = "";
            void router.push(router);
          }}
        >
          <ChevronLeft className="h-5 w-5 cursor-pointer" />
        </div>
        <div className="flex-shrink-0">
          <Upload className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 p-4 pb-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={classNames(
                "relative h-60 md:h-80",
                index % 3 === 0 && "col-span-2"
              )}
            >
              <Image
                src={image}
                loading="lazy"
                alt={`Restaurant image ${1 + index}`}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
