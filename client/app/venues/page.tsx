"use client";

import { useEffect, useState } from "react";

interface Venue {
  _id: string;
  name: string;
  description?: string;
  amenities: string[];
  photos: string[];
  owner: { _id: string; email: string };
  approvalStatus: string;
  sports: string[];
  rating: number;
  reviewsCount: number;
  location?: {
    coordinates?: { lat: number; lng: number };
    city?: string;
    area?: string;
  };
}

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/venues/")
      .then((res) => res.json())
      .then((data) => {
        setVenues(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch venues");
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900 drop-shadow">
        Venues
      </h1>
      {loading && (
        <div className="text-center text-lg">Loading venues...</div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {venues.map((venue) => (
          <div
            key={venue._id}
            className="group border rounded-2xl p-4 shadow-lg bg-white transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-blue-400 cursor-pointer relative overflow-hidden"
          >
            {venue.photos && venue.photos.length > 0 ? (
              <img
                src={venue.photos[0]}
                alt={venue.name}
                className="w-full h-44 object-cover rounded-xl mb-3 group-hover:opacity-90 transition duration-200"
              />
            ) : (
              <div className="w-full h-44 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <h2 className="text-lg font-semibold mb-1 text-blue-800 truncate">
              {venue.name}
            </h2>
            {venue.description && (
              <p className="mb-2 text-gray-600 text-sm line-clamp-2">
                {venue.description}
              </p>
            )}
            <div className="mb-1 flex flex-wrap gap-1 text-xs">
              {venue.amenities.map((a) => (
                <span
                  key={a}
                  className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                >
                  {a}
                </span>
              ))}
            </div>
            <div className="mb-1 flex flex-wrap gap-1 text-xs">
              {venue.sports.map((s) => (
                <span
                  key={s}
                  className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mb-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">Location:</span>{" "}
              {venue.location?.city || "-"}, {venue.location?.area || "-"}
            </div>
            <div className="mb-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">Owner:</span>{" "}
              {venue.owner?.email}
            </div>
            <div className="mb-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">Status:</span>{" "}
              <span
                className={
                  venue.approvalStatus === "approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {venue.approvalStatus}
              </span>
            </div>
            <div className="mb-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">Rating:</span>{" "}
              {venue.rating} ({venue.reviewsCount} reviews)
            </div>
            <div className="absolute top-2 right-2 bg-white/80 px-2 py-0.5 rounded-full text-xs font-semibold text-blue-600 shadow group-hover:bg-blue-100 transition">
              {venue.city}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
