import React, { useState } from "react";
import type { NextPage } from "next";
import { api, type RouterOutputs } from "~/utils/api";
import { RestaurantCard } from "~/components/restaurants/RestaurantCard";
import { Map } from "~/components/Map";
import type { BoundCoordinates } from "~/types/BoundCoordinates";

interface RestaurantViewProps {
  restaurants: RouterOutputs["restaurants"]["getAll"] | undefined;
  isLoading: boolean;
}

export const RestaurantView: React.FC<RestaurantViewProps> = ({
  restaurants,
  isLoading,
}) => {
  if (isLoading) return <p>loading...</p>;
  if (!restaurants || restaurants?.length === 0) return <p>no records</p>;

  return (
    <div className="py-4 px-6 md:py-0">
      <h4 className="mb-5 text-center text-sm md:hidden">
        Over {restaurants.length || 1} restaurants
      </h4>
      <div className="grid h-full gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id.toString()}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

const Restaurants: NextPage = () => {
  // TODO: Change this to be dynamic
  const [coordinates, setCoordinates] = useState<BoundCoordinates>([
    [18.07334, 59.434591],
    [18.07334, 59.334591],
    [18.05334, 59.334591],
    [18.05334, 59.334591],
    [18.07334, 59.434591],
  ]);

  const { data: restaurants, isLoading } = api.restaurants.getAll.useQuery({
    coordinates,
  });

  return (
    <main className="flex w-full flex-col">
      <div className="flex flex-1 flex-col-reverse md:h-screen md:flex-row">
        <div className="flex-1">
          <RestaurantView restaurants={restaurants} isLoading={isLoading} />
        </div>
        <div className="h-64 flex-shrink-0 bg-gray-300 md:sticky md:top-[44px] md:h-screen md:max-h-[calc(100vh_-_52px)] md:w-[37%]">
          <Map
            restaurants={restaurants || []}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
          />
        </div>
      </div>
      {/* <div className="h-[200vh] bg-gradient-to-b from-teal-500 to-lime-500"></div> */}
    </main>
  );
};

export default Restaurants;
