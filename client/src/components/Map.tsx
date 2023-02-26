"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapBox from "react-map-gl";

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
  const [lng, setLng] = useState(18.06324);
  const [lat, setLat] = useState(59.334591);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN || "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      if (!map.current) return; // initialize map only once
      /* Add the data to your map as a layer */
      map.current.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: restaurants,
        },
      });

      function flyToStore(restaurant: (typeof restaurants)[number]) {
        map.current?.flyTo({
          center: restaurant.geometry.coordinates,
          zoom: 13,
        });
      }

      function createPopUp(restaurant: (typeof restaurants)[number]) {
        if (!map.current) return;
        const popUps = document.getElementsByClassName("mapboxgl-popup");
        if (popUps[0]) popUps[0].remove();
        const popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(restaurant.geometry.coordinates)
          .setHTML(
            `<h3>Sweetgreen</h3><h4>${restaurant.properties.address}</h4>`
          )
          .addTo(map.current);
      }

      for (const restaurant of restaurants) {
        /* Create a div element for the marker. */
        const el = document.createElement("div");
        /* Assign a unique `id` to the marker. */
        el.id = `marker-${restaurant.properties.id}`;
        /* Assign the `marker` class to each marker for styling. */
        el.className = "marker";

        /**
         * Create a marker using the div element
         * defined above and add it to the map.
         **/
        new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(restaurant.geometry.coordinates)
          .addTo(map.current);

        /**
         * Listen to the element and when it is clicked, do three things:
         * 1. Fly to the point
         * 2. Close all other popups and display popup for clicked store
         * 3. Highlight listing in sidebar (and remove highlight for all other listings)
         **/
        el.addEventListener("click", (e) => {
          /* Fly to the point */
          flyToStore(restaurant);
          /* Close all other popups and display popup for clicked store */
          createPopUp(restaurant);

          e.stopPropagation();

          // TODO: update selected state
        });
      }
    });
  }, [map, lat, lng, zoom]);

  return <div ref={mapContainer} className="relative h-full w-full" />;
};
