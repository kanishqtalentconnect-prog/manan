import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import BookSiteVisitModal from "../components/BookSiteVisitModal";
import EnquiryModal from "../components/EnquiryModal";


type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Property = {
  _id: string;
  title: string;
  description: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  dimensions?: string;
  category?: Category;
  images: string[];
  googleMapUrl?: string;
  status?: string;
};


export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);



  useEffect(() => {
    api
      .get(`/properties/${id}`)
      .then((res) => setProperty(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!property) return <p className="p-8">Property not found</p>;

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 lg:p-12 animate-in fade-in duration-700">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT: IMAGE GALLERY */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-[100px_1fr] gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto pb-2 md:pb-0">
                {property.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative shrink-0 w-20 h-20 md:w-full md:h-24 rounded-xl overflow-hidden transition-all duration-200 border-2 ${
                      selectedImage === index
                        ? "border-black scale-[0.98] ring-2 ring-gray-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`View ${index + 1}`} />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div 
                className="group relative cursor-zoom-in order-1 md:order-2 overflow-hidden rounded-3xl bg-gray-100 shadow-sm"
                onClick={() => setShowZoom(true)}
              >
                <img
                  src={property.images[selectedImage]}
                  className="w-full h-100 md:h-150 object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={property.title}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-black rounded-full px-4 py-2 text-sm font-medium shadow-lg flex items-center gap-2 transition-all">
                  <span>View Fullscreen</span>
                  <span className="text-lg">🔍</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                  {property.category?.name}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                {property.title}
              </h1>

              <p className="text-3xl font-light text-blue-600">
                {typeof property.price === "number"
                  ? `₹${property.price.toLocaleString()}`
                  : "Price on request"}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="py-8 border-y border-gray-100 mb-8">
              {property.category?.slug === "land" ? (
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                    Plot Dimensions
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {property.dimensions}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                      Bedrooms
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {property.bedrooms}
                    </p>
                  </div>

                  <div className="text-center border-x border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                      Bathrooms
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {property.bathrooms}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                      Area
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {property.area}{" "}
                      <span className="text-sm font-normal text-gray-500">sqft</span>
                    </p>
                  </div>
                </div>
              )}
            </div>


            {/* Description */}
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">About this property</h3>
              <div className="whitespace-pre-line text-gray-600 leading-relaxed text-lg italic border-l-4 border-gray-100 pl-6">
                {property.description}
              </div>
            </div>

            {/* Booking CTA */}
            {/* CTA BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* BOOK VISIT */}
              <button
                onClick={() => {
                  setSelectedPropertyId(property._id);
                  setShowModal(true);
                }}
                className="group relative w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-black active:scale-[0.98] shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Schedule a Private Tour
                </span>
              </button>

              {/* ENQUIRY */}
              <button
                onClick={() => setShowEnquiry(true)}
                className="w-full border-2 border-gray-900 text-gray-900 py-5 rounded-2xl font-bold text-lg transition-all hover:bg-gray-900 hover:text-white active:scale-[0.98]"
              >
                Send Enquiry
              </button>
            </div>

          </div>
        </div>

        {/* LOCATION */}
        {property.googleMapUrl && (
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Neighborhood & Location</h2>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100">
              <iframe
                src={property.googleMapUrl}
                className="w-full h-112.5"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>

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

      {/* ENQUIRY MODAL */}
      {showEnquiry && (
        <EnquiryModal
          propertyId={property._id}
          onClose={() => setShowEnquiry(false)}
        />
      )}


      {/* FULLSCREEN IMAGE ZOOM */}
      {showZoom && (
        <div
          className="fixed inset-0 bg-black/95 z-100 flex items-center justify-center p-4 backdrop-blur-md transition-all animate-in zoom-in duration-300"
          onClick={() => setShowZoom(false)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl">×</button>
          <img
            src={property.images[selectedImage]}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>

  );
}
