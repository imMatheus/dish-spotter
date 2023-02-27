"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import MapBox from "react-map-gl";
import mapboxgl from "mapbox-gl";
import type { Restaurant } from "@/types";

interface MapProps {
  restaurants: Restaurant[];
}

export const Map: React.FC<MapProps> = ({ restaurants }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(18.07334);
  const [lat, setLat] = useState(59.334591);
  const [zoom, setZoom] = useState(12);

  const loadMarkers = useCallback(() => {
    if (!map.current) return; // initialize map only once
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
            id: r.id,
            geometry: {
              type: "Point",
              coordinates: [r.coordinates.x, r.coordinates.y],
            },
            properties: {
              id: r.id,
              title: "Mapbox 2",
              description: "Silicon valley, California",
            },
          })),
        },
      },
    });
  }, [restaurants]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN || "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", loadMarkers);
  }, [map, lat, lng, zoom, restaurants, loadMarkers]);

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
