import { Map } from "@/components/Map";
import { RestaurantCard } from "@/components/restaurants";
import { useRestaurants } from "@/hooks";
import React from "react";

interface RestaurantViewProps {}

export const RestaurantView: React.FC<RestaurantViewProps> = ({}) => {
  const { data: restaurants, isLoading } = useRestaurants();
  console.log(restaurants);

  return (
    <div className="flex h-screen flex-1">
      <div className="grid h-full w-[63%] grid-cols-3 gap-6 px-6">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          restaurants?.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        )}
      </div>
      <div className="sticky top-[52px] h-screen max-h-[calc(100vh_-_52px)] flex-1 flex-shrink-0 bg-gray-300">
        <Map restaurants={restaurants || []} />
      </div>
    </div>
  );
};
