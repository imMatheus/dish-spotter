import { Map } from "@/components/Map";
import { RestaurantCard } from "@/components/restaurants";

export default function Home() {
  return (
    <main className="flex w-full flex-col">
      <div className="flex flex-1">
        <div className="grid h-full w-[63%] grid-cols-3 gap-6 px-6">
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
        </div>
        <div className="sticky top-[52px] h-full max-h-[calc(100vh_-_52px)] flex-1 flex-shrink-0 bg-gray-300">
          <Map />
        </div>
      </div>
      <footer className="bg-pink-500 py-12">hej</footer>
      <div className="h-[200vh] bg-gradient-to-b from-teal-500 to-lime-500"></div>
    </main>
  );
}
