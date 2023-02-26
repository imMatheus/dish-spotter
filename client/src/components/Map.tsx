"use client";

import React, { useEffect, useRef, useState } from "react";
import MapBox from "react-map-gl";
import mapboxgl from "mapbox-gl";

interface MapProps {}

const restaurants = [
  {
    type: "Feature" as const,
    geometry: {
      type: "Point" as const,
      coordinates: [18.07334, 59.334591] as [number, number],
    },
    properties: {
      id: 0,
      title: "Mapbox",
      description: "San Francisco, California",
      phoneFormatted: "(202) 234-7336",
      phone: "2022347336",
      address: "1471 P St NW",
      city: "Washington DC",
      country: "United States",
      crossStreet: "at 15th St NW",
      postalCode: "20005",
      state: "D.C.",
    },
  },
  {
    type: "Feature" as const,
    geometry: {
      type: "Point" as const,
      coordinates: [18.07434, 59.334591] as [number, number],
    },
    properties: {
      id: 1,
      title: "Mapbox 2",
      description: "Silicon valley, California",
      phoneFormatted: "(202) 234-7336",
      phone: "2022347336",
      address: "1471 P St NW",
      city: "Washington DC",
      country: "United States",
      crossStreet: "at 15th St NW",
      postalCode: "20005",
      state: "D.C.",
    },
  },
];

export const Map: React.FC<MapProps> = ({}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(18.07334);
  const [lat, setLat] = useState(59.334591);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN || "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      if (!map.current) return; // initialize map only once
      /* Add the data to your map as a layer */
      map.current.addLayer({
        id: "locations",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: restaurants,
          },
        },
      });
    });
  }, [map, lat, lng, zoom]);

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
