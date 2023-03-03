import { useQuery } from "react-query";
import axios from "axios";
import type { Restaurant } from "@/types";

export function useRestaurants() {
  return useQuery<Restaurant[]>("restaurants", () =>
    axios.get("http://localhost:8080/restaurants").then((res) => res.data)
  );
}
