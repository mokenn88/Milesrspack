import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Pub } from "../types/Pub";

const icon = new L.Icon.Default();

export function MapView({
  pubs,
  userLocation,
}: {
  pubs: Pub[];
  userLocation: { lat: number; lng: number } | null;
}) {
  const center = userLocation || { lat: 39.5, lng: -98.35 };
  return (
    <MapContainer center={center} zoom={userLocation ? 10 : 4} className="h-96 w-full rounded-lg z-0">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={icon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
      {pubs.map((pub, i) => (
        <Marker key={i} position={[pub.lat, pub.lng]} icon={icon}>
          <Popup>
            <strong>{pub.name}</strong><br />
            {pub.address}<br />
            <a href={`https://maps.google.com/?q=${pub.lat},${pub.lng}`} target="_blank" rel="noreferrer">
              Directions
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
