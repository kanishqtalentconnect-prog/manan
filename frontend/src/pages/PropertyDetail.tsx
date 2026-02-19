import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import BookSiteVisitModal from "../components/BookSiteVisitModal";
import EnquiryModal from "../components/EnquiryModal";
import { useNavigate } from "react-router-dom";
import { FiShare2 } from "react-icons/fi";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
  tag?: string;
  numberProperty?: number;
  media: {
    url: string;
    type: "image" | "video";
  }[];
  googleMapUrl?: string;
  status?: string;
};


export default function PropertyDetail() {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    api
      .get(`/properties/${id}`)
      .then((res) => setProperty(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!showZoom) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextItem();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "Escape") setShowZoom(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showZoom]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!property) return <p className="p-8">Property not found</p>;
  const handleShare = async () => {
  const url = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: property.title,
        url, // 👈 keep it minimal
      });
    } else {
      throw new Error("Web Share not supported");
    }
  } catch (err) {
    // ✅ universal fallback
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard");
  }
};
  const media = property.media;
  const currentItem = media[selectedIndex];

  const nextItem = () => {
    setSelectedIndex((prev) =>
      prev === media.length - 1 ? 0 : prev + 1
    );
  };

  const prevItem = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? media.length - 1 : prev - 1
    );
  };



  return (
    <>
      <div className="max-w-7xl mx-auto p-6 lg:p-12 animate-in fade-in duration-700">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT: IMAGE GALLERY */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-[100px_1fr] gap-4">

              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 overflow-x-auto">
                {media.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border transition
                      ${selectedIndex === index
                        ? "border-[#c4a47c] ring-2 ring-[#c4a47c]/20"
                        : "border-transparent opacity-60 hover:opacity-100"}
                    `}
                  >
                    {item.type === "image" ? (
                      <img src={item.url} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                          preload="metadata"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-semibold">
                          ▶ VIDEO
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div
                className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-black shadow-lg"
                onClick={() => {
                  if (currentItem.type === "image") setShowZoom(true);
                }}
              >
                {currentItem.type === "image" ? (
                  <img
                    src={currentItem.url}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-zoom-in"
                    alt={property.title}
                  />
                ) : (
                  <video
                    src={currentItem.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {currentItem.type === "image" && (
                  <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-white transition">
                    🔍 View Fullscreen
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col">
            <div className="mb-8">

              <div className="flex items-center gap-3 mb-4">

                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9c8a6a]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]" />
                  {property.category?.name}
                </span>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg 
                      bg-white border border-gray-200 text-sm font-medium 
                      text-gray-600 hover:bg-gray-50 transition"
                  >
                    <FiShare2 className="text-lg" />
                  </button>

                  <button
                    onClick={() => navigate('/#property')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg 
                      bg-white border border-gray-200 text-sm font-medium 
                      text-gray-600 hover:bg-gray-50 transition"
                  >
                    ← Back
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-serif text-[#1e1e1e] leading-tight mb-4">
                {property.title}
              </h1>

              <p className="text-2xl md:text-3xl font-serif text-[#c4a47c] mb-3">
                {typeof property.price === "number"
                  ? `₹${property.price.toLocaleString()}`
                  : "Price on request"}
              </p>

              {property.tag && (
                <span className="inline-block mt-3 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full bg-[#c4a47c]/10 text-[#9c8a6a] border border-[#c4a47c]/30">
                  {property.tag}
                </span>
              )}

              {property.numberProperty && (
                <p className="text-xs mt-4 font-semibold uppercase tracking-widest text-[#1e1e1e]">
                  Number of Property Available: {property.numberProperty}
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="py-8 border-y border-[#ece6dd] mb-8">
              {property.category?.slug === "land" ? (
                <div className="text-center">
                  <p className="text-sm text-[#9c8a6a] uppercase tracking-widest mb-1">
                    Plot Dimensions
                  </p>
                  <p className="text-2xl font-serif text-[#1e1e1e]">
                    {property.dimensions}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Bedrooms", value: property.bedrooms },
                    { label: "Bathrooms", value: property.bathrooms },
                    { label: "Area", value: `${property.area} sqft` },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="text-sm text-[#9c8a6a] uppercase tracking-widest mb-1">
                        {item.label}
                      </p>
                      <p className="text-xl font-serif text-[#1e1e1e]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1e1e1e] mb-4">
                About this property
              </h3>

              <div className="whitespace-pre-line text-[#5f5f5f] leading-relaxed text-base font-normal border-l-4 border-[#ece6dd] pl-6">
                {property.description}
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <button
                onClick={() => {
                  setSelectedPropertyId(property._id);
                  setShowModal(true);
                }}
                className="w-full bg-[#c4a47c] hover:bg-[#b8935f] text-white py-4 rounded-2xl font-medium tracking-wide transition-all shadow-md"
              >
                Schedule a Private Tour
              </button>

              <button
                onClick={() => setShowEnquiry(true)}
                className="w-full border border-[#c4a47c] text-[#c4a47c] py-4 rounded-2xl font-medium tracking-wide hover:bg-[#c4a47c]/10 transition-all"
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
              <h2 className="text-2xl font-serif text-[#1e1e1e]">
                Neighborhood & Location
              </h2>
              <div className="h-px flex-1 bg-[#ece6dd]" />
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ece6dd]">
              <iframe
                src={property.googleMapUrl}
                className="w-full h-96"
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
      {showZoom && currentItem.type === "image" && (
        <div
          className="fixed inset-0 z-50 bg-black/95"
          onClick={() => setShowZoom(false)}
        >
          {/* CLOSE */}
          <button
            onClick={() => setShowZoom(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl z-50"
          >
            ×
          </button>

          {/* PREV */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevItem();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 
                      text-white/60 hover:text-white text-5xl z-50"
          >
            ‹
          </button>

          {/* NEXT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextItem();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 
                      text-white/60 hover:text-white text-5xl z-50"
          >
            ›
          </button>

          {/* ZOOMABLE IMAGE */}
          <TransformWrapper
            key={selectedIndex} // 🔥 resets zoom when image changes
            initialScale={1}
            minScale={1}
            maxScale={4}
            centerOnInit
            wheel={{ step: 0.15 }}
            pinch={{ step: 5 }}
            doubleClick={{ mode: "zoomIn" }}
          >
            <TransformComponent
              wrapperStyle={{ width: "100vw", height: "100vh" }}
              contentStyle={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={currentItem.url}
                style={{
                  maxWidth: "95vw",
                  maxHeight: "95vh",
                  objectFit: "contain",
                }}
                draggable={false}
              />

            </TransformComponent>
          </TransformWrapper>

          {/* COUNTER */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {selectedIndex + 1} / {property.media.length}
          </div>
        </div>
      )}


    </>

  );
}
