import { useState } from 'react';
import { getUserLocation, findNearestPub, generateDirectionsUrl, type Coordinates } from '../utils/geo';
import type { Pub } from '../types/Pub';

interface NearestPubFinderProps {
  pubs: Pub[];
}

export default function NearestPubFinder({ pubs }: NearestPubFinderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [nearestPub, setNearestPub] = useState<(Pub & { distance: number }) | null>(null);

  const handleFindNearest = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const location = await getUserLocation();
      setUserLocation(location);

      const nearest = findNearestPub(location, pubs);
      setNearestPub(nearest);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetDirections = () => {
    if (userLocation && nearestPub) {
      const directionsUrl = generateDirectionsUrl(
        userLocation,
        { lat: nearestPub.lat, lng: nearestPub.lng }
      );
      window.open(directionsUrl, '_blank');
    }
  };

  return (
    <div className="bg-white text-black rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-lfcRed mb-4">Find Nearest Pub</h2>
      
      <button
        onClick={handleFindNearest}
        disabled={isLoading}
        className="bg-lfcRed text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Finding nearest pub...' : 'Find Nearest Pub'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p><strong>Error:</strong> {error}</p>
          <p className="text-sm mt-2">Please make sure location services are enabled and try again.</p>
        </div>
      )}

      {nearestPub && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-bold text-lfcRed mb-2">{nearestPub.name}</h3>
          <p className="text-gray-700 mb-2">{nearestPub.address}</p>
          <p className="text-sm text-gray-600 mb-3">
            📍 Distance: {(nearestPub.distance * 0.621371).toFixed(2)} miles away
          </p>
          
          {nearestPub.tags && nearestPub.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {nearestPub.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-lfcRed text-white text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={handleGetDirections}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Directions
          </button>
        </div>
      )}
    </div>
  );
}