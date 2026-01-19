import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";


type Property = {
  _id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  googleMapUrl?: string;
};

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/properties")
      .then((res) => setProperties(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HERO */}
      <section className="bg-black text-white py-20 text-center">
        <h1 className="text-4xl font-bold">
          Find Your Dream Property
        </h1>
        <p className="mt-4 text-gray-300">
          Villas · Flats · Premium Living
        </p>
      </section>

      {/* PROPERTY LIST */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">
          Available Properties
        </h2>

        {loading && <p>Loading properties...</p>}

        {!loading && properties.length === 0 && (
          <p className="text-gray-500">No properties available</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              to={`/properties/${property._id}`}
              key={property._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={property.images?.[0]}
                alt={property.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {property.title}
                </h3>

                <p className="text-gray-600 mt-1">
                  ₹ {property.price?.toLocaleString()}
                </p>

                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                </div>
                <a
                  href={property.googleMapUrl}
                  target="_blank"
                  className="text-sm text-blue-600 underline mt-2 block"
                >
                  View Location
                </a>

                <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                  Book Site Visit
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
