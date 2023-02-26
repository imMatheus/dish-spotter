"use client";

import React, { useEffect, useRef, useState } from "react";

import mapboxgl from "mapbox-gl";

interface MapProps {}

export const Map: React.FC<MapProps> = ({}) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng, setLng] = useState(18.06324);
  const [lat, setLat] = useState(59.334591);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN || "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      logoPosition: "top-right",
    });
  });

  return <div ref={mapContainer} className="h-full w-full bg-gray-300" />;
};
