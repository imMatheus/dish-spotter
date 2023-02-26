import { Map } from "@/components/Map";
import { RestaurantCard } from "@/components/restaurants";

export default function Home() {
  return (
    <main className="w-full bg-green-500 p-2">
      <div className="flex">
        <div className="grid h-full w-[63%] grid-cols-3 gap-2 bg-red-500">
          <RestaurantCard />
          <RestaurantCard />
        </div>
        <div className="sticky top-0 max-h-screen flex-1 flex-shrink-0">
          <Map />
        </div>
      </div>
    </main>
  );
}
