import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios';

mapboxgl.accessToken =
  "pk.eyJ1IjoibmdhbmhhMTg5NyIsImEiOiJjbHlldDkwNG8wNWs0MmtweDFzNzNkcWkwIn0.ZqfdHFVveW99GvmUMs0jdA";

const Map = ({ address }) => {
  const mapContainerRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const geocodeAddress = async (address) => {
    const apiKey = "bOHwWLJK5MfZRvkAhRoipV45jCrLWqrM";
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${encodeURIComponent(address)}`;
    try {
      const response = await axios.get(url);
      const { results } = response.data;

      if (results.length > 0 && results[0].locations.length > 0) {
        const location = results[0].locations[0].latLng;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      throw error;
    }
  }
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coords = await geocodeAddress(address);
        setCoordinates(coords);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  useEffect(() => {
    const { lat, lng } = coordinates;
    if (lat && lng) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: 12,
      });

      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

      return () => map.remove();
    }
  }, [coordinates]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: 400 }} />;
};

export default Map;
