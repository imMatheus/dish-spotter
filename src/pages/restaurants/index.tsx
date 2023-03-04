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
    [-43, 33],
    [-63, 80],
    [60, 33],
    [20, 33],
    [-43, 33],
  ]);

  const {
    data: restaurants,
    isLoading,
    refetch,
  } = api.restaurants.getAll.useQuery({
    coordinates,
  });

  return (
    <main className="flex w-full flex-col">
      <div className="flex h-screen flex-1">
        <div className="grid h-full w-[63%] grid-cols-3 gap-6 px-6">
          {/* <div className="bg-red-500">
            <button
              className="bg-blue-500"
              onClick={() => {
                refetch().catch(() => {
                  return;
                });
              }}
            >
              hej
            </button>
            <pre>{JSON.stringify(coordinates, null, 2)}</pre>
          </div> */}
          {isLoading ? (
            <p>loading...</p>
          ) : restaurants?.length === 0 ? (
            <p>no records</p>
          ) : (
            restaurants?.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id.toString()}
                restaurant={restaurant}
              />
            ))
          )}
        </div>
        <div className="sticky top-[52px] h-screen max-h-[calc(100vh_-_52px)] flex-1 flex-shrink-0 bg-gray-300">
          <Map
            restaurants={restaurants || []}
            setCoordinates={setCoordinates}
          />
        </div>
      </div>
      <footer className="bg-pink-500 py-12">hej</footer>
      {/* <div className="h-[200vh] bg-gradient-to-b from-teal-500 to-lime-500"></div> */}
    </main>
  );
};

export default Restaurants;
