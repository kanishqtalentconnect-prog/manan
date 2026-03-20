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
  googleLocationUrl?: string;
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
      <div className="bg-[#f5f2ea]">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 animate-in fade-in duration-700">

    {/* ================= TOP SECTION ================= */}
    <div className="grid lg:grid-cols-2 gap-16 items-start">

      {/* ================= LEFT: IMAGE GALLERY ================= */}
      <div>

        <div className="grid md:grid-cols-[110px_1fr] gap-6">

          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto">
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative w-24 h-24 rounded-2xl overflow-hidden border transition-all duration-300
                  ${selectedIndex === index
                    ? "border-[#0f3b2e] ring-2 ring-[#0f3b2e]/20"
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
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-medium">
                      ▶
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div
            className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-black shadow-2xl"
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

            {currentItem.type === "image" && (
              <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-5 py-2.5 rounded-full text-sm font-medium shadow hover:bg-white transition">
                View Fullscreen
              </button>
            )}
          </div>

        </div>
      </div>


      {/* ================= RIGHT: PROPERTY DETAILS ================= */}
      <div className="flex flex-col">

        {/* Category + Actions */}
        <div className="flex items-center gap-4 mb-6">

          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8c7b63]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8c7b63]" />
            {property.category?.name}
          </span>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-lg 
                bg-white border border-[#e5dfd2] text-sm 
                text-[#555] hover:bg-[#f3efe6] transition"
            >
              <FiShare2 className="text-lg" />
            </button>

            <button
              onClick={() => navigate('/#property')}
              className="px-4 py-2 rounded-lg 
                bg-white border border-[#e5dfd2] text-sm 
                text-[#555] hover:bg-[#f3efe6] transition"
            >
              Back
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif text-[#0f3b2e] leading-tight mb-6">
          {property.title}
        </h1>

        {/* Price */}
        <p className="text-3xl font-serif text-[#8c7b63] mb-4">
          {typeof property.price === "number"
            ? `₹${property.price.toLocaleString()}`
            : "Price on request"}
        </p>

        {/* Tag */}
        {property.tag && (
          <span className="inline-flex w-fit px-5 py-2 text-xs uppercase tracking-widest 
                           rounded-full bg-[#8c7b63]/10 text-[#8c7b63] 
                           border border-[#8c7b63]/30 mb-8">
            {property.tag}
          </span>
        )}

        {property.numberProperty && (
          <p className="text-base mb-4 font-semibold uppercase tracking-widest text-[#8c7b63]">
            Number of Properties Available:{" "}
            <span className="text-[#0f3b2e] font-serif text-lg normal-case tracking-normal ml-1">
              {property.numberProperty}
            </span>
          </p>
        )}

        {/* Quick Stats */}
        <div className="py-10 border-y border-[#e5dfd2] mb-10">
          {property.category?.slug === "land" ? (
            <div className="text-center">
              <p className="text-xs text-[#8c7b63] uppercase tracking-widest mb-2">
                Plot Dimensions
              </p>
              <p className="text-3xl font-serif text-[#0f3b2e]">
                {property.dimensions}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Bedrooms", value: property.bedrooms },
                { label: "Bathrooms", value: property.bathrooms },
                { label: "Area", value: `${property.area} sqft` },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-xs text-[#8c7b63] uppercase tracking-widest mb-2">
                    {item.label}
                  </p>
                  <p className="text-2xl font-serif text-[#0f3b2e]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <button
            onClick={() => {
              setSelectedPropertyId(property._id);
              setShowModal(true);
            }}
            className="w-full bg-[#0f3b2e] hover:opacity-90 text-white py-4 rounded-2xl font-medium tracking-wide transition-all shadow-lg"
          >
            Schedule Visit
          </button>

          <button
            onClick={() => setShowEnquiry(true)}
            className="w-full border border-[#0f3b2e] text-[#0f3b2e] py-4 rounded-2xl font-medium tracking-wide hover:bg-[#0f3b2e]/5 transition-all"
          >
            Send Enquiry
          </button>

        </div>

      </div>
    </div>


    {/* ================= ABOUT PROPERTY (FULL WIDTH BELOW IMAGE) ================= */}
    <div className="mt-24 bg-white rounded-3xl px-10 py-16 shadow-sm border border-[#e5dfd2]">

      <div className="flex items-center gap-6 mb-10">
        <h2 className="text-3xl font-serif text-[#0f3b2e]">
          About This Property
        </h2>
        <div className="flex-1 h-px bg-[#e5dfd2]" />
      </div>

      <div className="max-w-4xl text-[#555] text-lg leading-relaxed whitespace-pre-line">
        {property.description}
      </div>

    </div>


    {/* ================= LOCATION ================= */}
    {/* {property.googleMapUrl && (
      <div className="mt-28">

        <div className="flex items-center gap-6 mb-10">
          <h2 className="text-3xl font-serif text-[#0f3b2e]">
            Neighborhood & Location
          </h2>
          <div className="flex-1 h-px bg-[#e5dfd2]" />
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#e5dfd2]">
          <iframe
            src={property.googleMapUrl}
            className="w-full h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    )} */}
    {(property.googleMapUrl || property.googleLocationUrl) && (
      <div className="mt-28">

        <div className="flex items-center gap-6 mb-10">
          <h2 className="text-3xl font-serif text-[#0f3b2e]">
            Neighborhood & Location
          </h2>
          <div className="flex-1 h-px bg-[#e5dfd2]" />
        </div>

        {/* CASE 1: Map */}
        {property.googleMapUrl ? (
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#e5dfd2]">
            <iframe
              src={property.googleMapUrl}
              className="w-full h-[520px]"
              loading="lazy"
            />
          </div>
        ) : (
          /* CASE 2: Button only (no box) */
          <a
            href={property.googleLocationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0f3b2e] hover:opacity-90 text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all shadow-md"
          >
            View on Google Maps →
          </a>
        )}

      </div>
    )}

  </div>
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
