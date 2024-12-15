'use client';

import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Geocode function using Nominatim
const geocodeAddress = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon), accurate: true };
    } else {
      return { lat: 43.610769, lon: 3.876716, accurate: false };
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};

export default function Map({ location }) {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (location) {
        const coords = await geocodeAddress(location);
        setCoordinates(coords);
      }
    };

    fetchCoordinates();
  }, [location]);

  if (!coordinates) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lon]} // Use geocoded coordinates
      zoom={coordinates.accurate ? 15 : 10}
      className='w-full h-2/5'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coordinates.lat, coordinates.lon]}>
        <Popup>
          {location}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
