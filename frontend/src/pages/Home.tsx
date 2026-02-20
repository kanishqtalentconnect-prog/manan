import Hero from "../components/Hero";
import About from "../components/About";
import Hero3 from "../components/Hero3";
import Hero4 from "../components/Hero4";
import Contact from "../components/Contact";
import Offerings from "../components/Offering";
import NataDol from "../components/NataDol";
import { useEffect, useState } from "react";
import api from "../api/axios";
import BookSiteVisitModal from "../components/BookSiteVisitModal";
import MapModal from "../components/MapModal";
import EnquiryModal from "../components/EnquiryModal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MapPin, Headphones, ShieldCheck, DollarSign } from "lucide-react";

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
  numberProperty?: number;
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

  const formatIndianPriceShort = (price: number) => {
    if (price >= 10000000) {
      return `₹ ${(price / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
    }
    if (price >= 100000) {
      return `₹ ${(price / 100000).toFixed(1).replace(/\.0$/, "")} Lakhs`;
    }
    return `₹ ${price.toLocaleString("en-IN")}`;
  };


  return (
    <div className="min-h-screen bg-gray-50/50">
      <section id="hero">
        <Hero />
      </section>
      
      <section>
        {/* ================= FEATURE STRIP ================= */}
        <div className="relative z-30 bg-[#f4f4f4] py-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">

            <div className="flex flex-col items-center gap-4">
              <ShieldCheck className="text-[#b8955b]" size={36} strokeWidth={1.5} />
              <p className="text-[18px] font-medium text-[#1a1a1a]">
                Verified Legal Titles
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <DollarSign className="text-[#b8955b]" size={36} strokeWidth={1.5} />
              <p className="text-[18px] font-medium text-[#1a1a1a]">
                Transparent Pricing Structure
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <MapPin className="text-[#b8955b]" size={36} strokeWidth={1.5} />
              <p className="text-[18px] font-medium text-[#1a1a1a]">
                Guided Site Visits Available
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Headphones className="text-[#b8955b]" size={36} strokeWidth={1.5} />
              <p className="text-[18px] font-medium text-[#1a1a1a]">
                End-to-End Ownership Support
              </p>
            </div>

          </div>
        </div>
      </section>
      <section id="about">
        <NataDol />
      </section>
      <section>
        <Offerings />
      </section>
      <section id="property" className="relative bg-white py-20">
        {/* subtle top glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,59,46,0.04),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* SECTION HEADER */}
          <div className="text-center mb-24">

            <div className="flex justify-center mb-6">
              <span className="text-[11px] uppercase tracking-[0.4em] 
                              font-medium text-[#0f3b2e] 
                              border border-[#0f3b2e]/20 
                              bg-white px-6 py-2 rounded-full">
                Featured Properties
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-[#0f3b2e] mb-6">
              Exclusive Mountain{" "}
              <span className="italic text-[#b8955b]">
                Retreats
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-[#5c5c5c] 
                          text-sm md:text-base leading-relaxed">
              Handpicked properties that offer the perfect blend of luxury,
              location, and lifestyle.
            </p>
          </div>

          {/* PROPERTY LIST */}
          {loading && (
            <div className="flex flex-col items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0f3b2e] mb-4"></div>
              <p className="text-[#666] animate-pulse">Searching for properties...</p>
            </div>
          )}

          {!loading && properties.length === 0 && (
            <div className="text-center py-20 rounded-2xl border border-[#e6e6e6] bg-white">
              <p className="text-[#666] text-lg">
                No properties available at the moment.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property) => (
              <div
                key={property._id}
                onClick={() => navigate(`/properties/${property._id}`)}
                className="
                  group bg-white rounded-3xl
                  border border-[#e8e8e8]
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all duration-500
                  overflow-hidden flex flex-col cursor-pointer
                "
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={
                      property.media?.find((m) => m.type === "image")?.url ||
                      "/placeholder.jpg"
                    }
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex justify-between gap-2 pointer-events-none">

                    <span className="
                      px-3 py-1 text-[10px]
                      font-medium tracking-widest uppercase
                      rounded-full
                      bg-white text-[#0f3b2e]
                      border border-[#e5e5e5]
                      shadow-sm truncate
                    ">
                      {property.category?.name}
                    </span>

                    {property.tag && (
                      <span className="
                        px-3 py-1 text-[10px]
                        font-semibold tracking-widest uppercase
                        rounded-full
                        bg-[#b8955b] text-white
                        shadow-sm truncate
                      ">
                        {property.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col grow text-[#444]">

                  <h3 className="text-xl font-serif text-[#0f3b2e] 
                                group-hover:text-[#b8955b] transition-colors">
                    {property.title}
                  </h3>

                  <div className="mt-2 text-[#333] font-medium">
                    {typeof property.price === "number"
                      ? formatIndianPriceShort(property.price)
                      : "Price on request"}
                  </div>

                  {property.googleMapUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!property.googleMapUrl) return;
                        setMapUrl(property.googleMapUrl);
                      }}
                      className="inline-flex items-center gap-1.5 
                                text-sm font-medium mt-2
                                text-[#b8955b] hover:text-[#8c7b63] transition-colors"
                    >
                      <MapPin size={16} />
                      View Location
                    </button>
                  )}

                  {property.numberProperty && (
                    <p className="text-sm text-[#666] mt-2">
                      Number of Property Available: {property.numberProperty}
                    </p>
                  )}

                  {/* STATS */}
                  <div className="mt-6 pt-6 border-t border-[#eee] text-sm">

                    {property.category?.slug === "land" ? (
                      <div className="flex flex-col text-center">
                        <span className="font-semibold text-[#0f3b2e] text-lg">
                          {property.dimensions}
                        </span>
                        <span className="text-[10px] uppercase font-medium tracking-widest text-[#777]">
                          Plot Dimensions
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        {[
                          { value: property.bedrooms, label: "Beds" },
                          { value: property.bathrooms, label: "Baths" },
                          { value: property.area, label: "Sq Ft" },
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col text-center">
                            <span className="font-semibold text-[#0f3b2e]">
                              {item.value}
                            </span>
                            <span className="text-[10px] uppercase font-medium tracking-widest text-[#777]">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-auto pt-6 space-y-3">

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedPropertyId(property._id);
                        setShowModal(true);
                      }}
                      className="w-full bg-[#0f3b2e] hover:bg-[#0c2f25] 
                                text-white font-semibold py-3 rounded-xl 
                                transition-all"
                    >
                      Book Site Visit
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEnquiryPropertyId(property._id);
                      }}
                      className="w-full border border-[#0f3b2e]/40 
                                text-[#0f3b2e] py-3 rounded-xl font-semibold 
                                hover:bg-[#0f3b2e]/10 transition-all"
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
        <About />
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