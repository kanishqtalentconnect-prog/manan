import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

type Property = {
  _id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  googleMapUrl?: string;
};

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then((res) => setProperty(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  if (!property) {
    return <p className="p-8">Property not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        {property.title}
      </h1>

      {/* IMAGE GALLERY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {property.images?.map((img, i) => (
          <img
            key={i}
            src={img}
            className="rounded-lg h-60 w-full object-cover"
          />
        ))}
      </div>

      {/* DETAILS */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <p className="text-2xl font-semibold mb-2">
          ₹ {property.price.toLocaleString()}
        </p>

        <div className="flex gap-6 text-gray-600">
          <span>{property.bedrooms} Bedrooms</span>
          <span>{property.bathrooms} Bathrooms</span>
        </div>
      </div>

      {/* GOOGLE MAP */}
      {property.googleMapUrl && (
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">
            Location
          </h2>

          <iframe
            src={property.googleMapUrl}
            className="w-full h-80 rounded-lg"
            loading="lazy"
          />
        </div>
      )}

      {/* BOOKING BUTTON (NEXT STEP) */}
      <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
        Book Site Visit
      </button>
    </div>
  );
}
