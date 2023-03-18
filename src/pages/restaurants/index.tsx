import React, { useState } from "react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import { RestaurantCard } from "~/components/restaurants/RestaurantCard";
import { Map } from "~/components/Map";

const Restaurants: NextPage = () => {
  type Coordinates = [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
    [number, number]
  ];

  const [coordinates, setCoordinates] = useState<Coordinates>([
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
        <div className="grid h-full w-full gap-4 py-4 px-6 sm:grid-cols-2 md:w-[63%] md:grid-cols-3 md:gap-6 md:py-0">
          {isLoading ? (
            <p>loading...</p>
          ) : !restaurants || restaurants?.length === 0 ? (
            <p>no records</p>
          ) : (
            <>
              <h4 className="text-center text-sm">
                Over {restaurants.length || 1} restaurants
              </h4>
              {restaurants?.map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id.toString()}
                  restaurant={restaurant}
                />
              ))}
            </>
          )}
        </div>
        <div className="h-64 flex-shrink-0 bg-gray-300 md:sticky md:top-[44px] md:h-screen md:max-h-[calc(100vh_-_52px)] md:flex-1">
          <Map
            restaurants={restaurants || []}
            setCoordinates={setCoordinates}
          />
        </div>
      </div>
      {/* <div className="h-[200vh] bg-gradient-to-b from-teal-500 to-lime-500"></div> */}
    </main>
  );
};

export default Restaurants;
