
import type { Pub } from '../types/Pub';

export default function PubCard({ pub }: { pub: Pub }) {
  return (
    <div className="bg-white text-black rounded-xl shadow-md p-4 mb-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-lfcRed">{pub.name}</h2>
      <p className="text-sm text-gray-700">{pub.address}</p>
      <p className="text-sm text-gray-500 mt-1">
        📍 Latitude: {pub.lat}, Longitude: {pub.lng}
      </p>
      {pub.tags && pub.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {pub.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-lfcRed text-white text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
