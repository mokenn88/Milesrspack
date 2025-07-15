export interface Coordinates {
  lat: number;
  lng: number;
}

export function getUserLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findNearestPub(userLocation: Coordinates, pubs: Array<{ lat: number; lng: number; name: string; address: string; tags?: string[] }>) {
  let nearestPub = null;
  let minDistance = Infinity;

  for (const pub of pubs) {
    const distance = getDistance(userLocation.lat, userLocation.lng, pub.lat, pub.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestPub = { ...pub, distance };
    }
  }

  return nearestPub;
}

export function generateDirectionsUrl(from: Coordinates, to: Coordinates): string {
  return `https://www.google.com/maps/dir/${from.lat},${from.lng}/${to.lat},${to.lng}`;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
