"use client";

import React, { useEffect, useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { env } from "~/env.mjs";
import type { RouterOutputs } from "~/utils/api";
import type { BoundCoordinates } from "~/types/BoundCoordinates";

interface MapProps {
  restaurants: RouterOutputs["restaurants"]["getAll"];
  setCoordinates: React.Dispatch<React.SetStateAction<BoundCoordinates>>;
  coordinates: BoundCoordinates;
}

export const Map: React.FC<MapProps> = ({
  restaurants,
  setCoordinates,
  coordinates,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const loadMarkers = useCallback(() => {
    console.log("made it here 56");
    if (
      !map.current ||
      !map.current.isStyleLoaded() ||
      !restaurants ||
      restaurants.length === 0
    )
      return; // initialize map only once

    if (
      map.current.getLayer("locations") ||
      map.current.getSource("locations")
    ) {
      map.current.removeLayer("locations");
      map.current.removeSource("locations");
    }

    /* Add the data to your map as a layer */
    map.current.addLayer({
      id: "locations",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: restaurants.map((r) => ({
            type: "Feature",
            id: r._id.toString(),
            geometry: {
              type: "Point",
              coordinates: [
                r.location.coordinates[0],
                r.location.coordinates[1],
              ],
            },
            properties: {
              id: r._id.toString(),
              title: r.name,
              description: "Silicon valley, California",
            },
          })),
        },
      },
    });
  }, [restaurants]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    console.log("heeej");
    console.log(env.NEXT_PUBLIC_MAP_BOX_TOKEN);

    mapboxgl.accessToken = env.NEXT_PUBLIC_MAP_BOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      accessToken: env.NEXT_PUBLIC_MAP_BOX_TOKEN || "",
      style: "mapbox://styles/mapbox/streets-v11",
      bounds: [...new Set(coordinates.flat())] as [
        number,
        number,
        number,
        number
      ],
    });

    function updateCoordinates() {
      if (!map.current) return;
      const cords = map.current.getBounds();
      console.log("cords");
      console.log(cords);

      const maxXCoord = 180;
      const maxYCoord = 90;

      const north = Math.max(
        Math.min(cords.getNorth(), maxYCoord),
        -1 * maxYCoord
      );
      const east = Math.max(
        Math.min(cords.getEast(), maxXCoord),
        -1 * maxXCoord
      );
      const south = Math.max(
        Math.min(cords.getSouth(), maxYCoord),
        -1 * maxYCoord
      );
      const west = Math.max(
        Math.min(cords.getWest(), maxXCoord),
        -1 * maxXCoord
      );
      setCoordinates([
        [west, north],
        [east, north],
        [east, south],
        [west, south],
        [west, north],
      ]);
    }

    map.current.on("dragend", updateCoordinates);
    map.current.on("zoomend", updateCoordinates);

    map.current.on("load", () => {
      updateCoordinates();
      loadMarkers();
    });
  }, [map, restaurants, loadMarkers, setCoordinates]);

  useEffect(() => {
    if (!map.current) return;
    loadMarkers();
  }, [map, restaurants, loadMarkers]);

  return <div ref={mapContainer} className="relative h-full w-full" />;
};

/* <Marker
  offsetTop={-48}
  offsetLeft={-24}
  longitude={18.06324}
  latitude={59.334591}
>
  <img src="https://img.icons8.com/color/48/000000/marker.png" />
</Marker> 
{/* {restaurants.map((restaurant, index) => (
  <Marker
    key={index}
    offset={[0, 0]}
    longitude={restaurant.geometry.coordinates[0]}
    latitude={restaurant.geometry.coordinates[1]}
  >
    <img src="https://img.icons8.com/color/48/000000/marker.png" />
  </Marker>
))} */
