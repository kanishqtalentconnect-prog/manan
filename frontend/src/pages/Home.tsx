import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import BookSiteVisitModal from "../components/BookSiteVisitModal";


type Property = {
  _id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  images: string[];
  googleMapUrl?: string;
};

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const propertyTypeStyles: Record<string, string> = {
    villa: "bg-green-100 text-green-700",
    flat: "bg-blue-100 text-blue-700",
    cottage: "bg-purple-100 text-purple-700",
  };


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
            <div>
              <img
                src={property.images?.[0]}
                alt={property.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  <Link to={`/properties/${property._id}`}
                  key={property._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                  {property.title}
                  </Link>
                </h3>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full
                    ${propertyTypeStyles[property.propertyType] || "bg-gray-100 text-gray-700"}
                  `}
                >
                  {property.propertyType.toUpperCase()}
                </span>


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

                <button
                  onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation();
                    setSelectedPropertyId(property._id);
                    setShowModal(true);
                  }}
                  className="mt-4 w-full bg-black text-white py-2 rounded-lg"
                >
                  Book Site Visit
                </button>

                {showModal && selectedPropertyId && (
                  <BookSiteVisitModal
                    propertyId={selectedPropertyId}
                    onClose={() => {
                      setShowModal(false);
                      setSelectedPropertyId(null);
                    }}
                  />
                )}

              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
