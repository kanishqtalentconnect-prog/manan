import Hero from "../components/Hero";
import Hero2 from "../components/Hero2";
import Hero3 from "../components/Hero3";
import Hero4 from "../components/Hero4";
import Contact from "../components/Contact";
import About from "../components/About";
import { useEffect, useState } from "react";
import api from "../api/axios";
import BookSiteVisitModal from "../components/BookSiteVisitModal";
import MapModal from "../components/MapModal";
import EnquiryModal from "../components/EnquiryModal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Property = {
  _id: string;
  title: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  dimensions?: string;
  category?: Category;
  tag?: string;
  media?: {
    url: string;
    type: "image" | "video";
  }[];
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

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "auto", block: "start" });
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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
      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>
      <section id="property" className="relative bg-[#0f0f0f] py-24">

        {/* subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,164,124,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* SECTION HEADER */}
          <div className="text-center mb-16">
            {/* pill */}
            <div className="flex justify-center mb-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c4a47c] bg-[#c4a47c]/10 border border-[#c4a47c]/30 px-4 py-1.5 rounded-full">
                Featured Properties
              </span>
            </div>

            {/* heading */}
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Exclusive Mountain{" "}
              <span className="text-[#c4a47c] italic">Retreats</span>
            </h2>

            {/* subtitle */}
            <p className="max-w-xl mx-auto text-sm md:text-base text-gray-400 font-light leading-relaxed">
              Handpicked properties that offer the perfect blend of luxury,
              location, and lifestyle.
            </p>
          </div>

        {/* PROPERTY LIST */}
        {loading && (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black mb-4"></div>
            <p className="text-gray-500 animate-pulse">Searching for properties...</p>
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-20 rounded-2xl border">
            <p className="text-gray-500 text-lg">No properties available at the moment.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property._id}
              onClick={() => navigate(`/properties/${property._id}`)}
              className="group bg-[#14110f] rounded-2xl shadow-lg 
                        border border-[#2a241f] hover:border-[#c4a47c]/40 
                        hover:shadow-2xl transition-all duration-500 
                        overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={
                    property.media?.find((m) => m.type === "image")?.url ||
                    "/placeholder.jpg"
                  }
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />


                {/* Dark overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className="
                      px-3 py-1
                      text-[10px] font-medium tracking-widest uppercase
                      rounded-full
                      bg-white/85 backdrop-blur-md
                      text-[#14110f]
                      border border-black/10
                      shadow-[0_2px_12px_rgba(0,0,0,0.25)]
                    "
                  >
                    {property.category?.name}
                  </span>
                </div>

                {property.tag && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span
                      className="
                        px-3 py-1
                        text-[10px] font-bold tracking-widest uppercase
                        rounded-full
                        bg-black/75 backdrop-blur-md
                        text-white
                        border border-white/30
                        shadow-[0_4px_20px_rgba(0,0,0,0.45)]
                      "
                    >
                      {property.tag}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col grow text-gray-300">
                <h3 className="text-lg font-semibold text-white group-hover:text-[#c4a47c] transition-colors">
                  {property.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {typeof property.price === "number"
                    ? `₹ ${property.price.toLocaleString()}`
                    : "Price on request"}
                </p>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-white/10 text-sm text-gray-400">
                  {property.category?.slug === "land" ? (
                    <div className="flex flex-col text-center">
                      <span className="font-semibold text-white text-lg">
                        {property.dimensions}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">
                        Plot Dimensions
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col text-center">
                        <span className="font-semibold text-white">
                          {property.bedrooms}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-gray-500">
                          Beds
                        </span>
                      </div>

                      <div className="w-px h-8 bg-white/10" />

                      <div className="flex flex-col text-center">
                        <span className="font-semibold text-white">
                          {property.bathrooms}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-gray-500">
                          Baths
                        </span>
                      </div>

                      <div className="w-px h-8 bg-white/10" />

                      <div className="flex flex-col text-center">
                        <span className="font-semibold text-white">
                          {property.area}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-gray-500">
                          Sq Ft
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto pt-6 space-y-3">
                  {property.googleMapUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!property.googleMapUrl) return;
                        setMapUrl(property.googleMapUrl);
                      }}
                      className="inline-flex items-center text-sm font-medium 
                                text-[#c4a47c] hover:text-[#e0c48f] transition-colors"
                    >
                      View Location
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedPropertyId(property._id);
                      setShowModal(true);
                    }}
                    className="w-full bg-[#c4a47c] hover:bg-[#b39367] 
                              text-black font-semibold py-3 rounded-xl 
                              transition-all active:scale-[0.98]"
                  >
                    Book Site Visit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEnquiryPropertyId(property._id);
                    }}
                    className="w-full border border-[#c4a47c]/40 
                              text-[#c4a47c] py-3 rounded-xl font-semibold 
                              hover:bg-[#c4a47c]/10 transition-all"
                  >
                    Make an Enquiry
                  </button>

                  
                </div>
              </div>
            </div>

          ))}
        </div>
        </div>
      </section>
      {/* ENQUIRY MODAL */}
      {enquiryPropertyId && (
        <EnquiryModal
          propertyId={enquiryPropertyId}
          onClose={() => setEnquiryPropertyId(null)}
        />
      )}

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
      <section id="hero2">
        <Hero2 />
      </section>
      <section id="hero3">
        <Hero3 />
      </section>
      <section id="hero4">
        <Hero4 />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}