"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { RestaurantView } from "./RestaurantView";

// Create a client
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex w-full flex-col">
        <RestaurantView />
        <footer className="bg-pink-500 py-12">hej</footer>
        {/* <div className="h-[200vh] bg-gradient-to-b from-teal-500 to-lime-500"></div> */}
      </main>
    </QueryClientProvider>
  );
}
