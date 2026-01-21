import { useEffect, useState } from "react";
import api from "../api/axios";
import BookSiteVisitModal from "../components/BookSiteVisitModal";
import MapModal from "../components/MapModal";
import EnquiryModal from "../components/EnquiryModal";
import { useNavigate } from "react-router-dom";


type Property = {
  _id: string;
  title: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  dimensions?: string;
  propertyType: "villa" | "flat" | "cottage" | "land";
  images: string[];
  googleMapUrl?: string;
  status?: string;
};


export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [enquiryPropertyId, setEnquiryPropertyId] = useState<string | null>(null);
  const navigate = useNavigate();


  const propertyTypeStyles: Record<string, string> = {
    villa: "bg-green-100 text-green-700",
    flat: "bg-blue-100 text-blue-700",
    cottage: "bg-purple-100 text-purple-700",
  };

  useEffect(() => {
    api.get("/properties")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.properties ?? [];

        setProperties(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* HERO */}
      <section className="bg-linear-to-b from-gray-900 to-black text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Find Your Dream Property
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto font-light">
          Discover curated villas, flats, and premium living spaces designed for your lifestyle.
        </p>
      </section>

      {/* PROPERTY LIST */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Available Properties</h2>
          <div className="h-1 flex-1 bg-gray-100 ml-8 hidden md:block"></div>
        </div>

        {loading && (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black mb-4"></div>
            <p className="text-gray-500 animate-pulse">Searching for properties...</p>
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No properties available at the moment.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property._id}
              onClick={() => navigate(`/properties/${property._id}`)}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={property.images?.[0]}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md shadow-sm ${
                    propertyTypeStyles[property.propertyType] || "bg-white text-gray-800"
                  }`}>
                    {property.propertyType}
                  </span>
                  
                </div>
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {property.title}
                </h3>

                <p className="text-gray-600 mt-1">
                  {typeof property.price === "number"
                    ? `₹ ${property.price.toLocaleString()}`
                    : "Price on request"}
                </p>


                <div className="mt-6 pt-6 border-t border-gray-50 text-sm text-gray-600">
                  {property.propertyType === "land" ? (
                    <div className="flex flex-col text-center">
                      <span className="font-semibold text-gray-900 text-lg">
                        {property.dimensions}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">
                        Plot Dimensions
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {property.bedrooms}
                        </span>
                        <span className="text-[10px] uppercase tracking-tighter text-gray-400">
                          Beds
                        </span>
                      </div>

                      <div className="w-px h-8 bg-gray-100"></div>

                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {property.bathrooms}
                        </span>
                        <span className="text-[10px] uppercase tracking-tighter text-gray-400">
                          Baths
                        </span>
                      </div>

                      <div className="w-px h-8 bg-gray-100"></div>

                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {property.area}
                        </span>
                        <span className="text-[10px] uppercase tracking-tighter text-gray-400">
                          Sq Ft
                        </span>
                      </div>
                    </div>
                  )}
                </div>


                <div className="mt-auto pt-6 space-y-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!property.googleMapUrl) return;
                      setMapUrl(property.googleMapUrl);
                    }}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    View Location
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedPropertyId(property._id);
                      setShowModal(true);
                    }}
                    className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98] shadow-md"
                  >
                    Book Site Visit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEnquiryPropertyId(property._id);
                    }}
                    className="w-full border border-black py-3 rounded-lg font-semibold"
                    >
                    Make an Enquiry
                  </button>


                  {enquiryPropertyId && (
                    <EnquiryModal
                      propertyId={enquiryPropertyId}
                      onClose={() => setEnquiryPropertyId(null)}
                    />
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING MODAL */}
      {showModal && selectedPropertyId && (
        <BookSiteVisitModal
          propertyId={selectedPropertyId}
          onClose={() => {
            setShowModal(false);
            setSelectedPropertyId(null);
          }}
        />
      )}

      {/* MAP MODAL */}
      {mapUrl !== null && (
        <MapModal
          url={mapUrl}
          onClose={() => setMapUrl(null)}
        />
      )}
    </div>
  );
}
