import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    const res = await api.get("/properties");
    setProperties(res.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    await api.delete(`/properties/${id}`);
    fetchProperties();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Manage Properties
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Review, edit, or remove your current real estate listings.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/add-property", {
            state: { from: "/admin/properties" },
          })}
          className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm"
        >
          <span className="text-xl">+</span> Add New Listing
        </button>
      </div>

      <div className="p-2 max-w-7xl mb-4 mx-auto bg-gray-50/50">
        <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-white border border-gray-200 text-sm font-semibold 
              text-gray-700 hover:bg-gray-50 hover:shadow transition"
          >
            ← Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((p) => (
          <div
            key={p._id}
            className="group bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
          >
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={p.images?.[0]}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={p.title}
              />

              {/* TYPE BADGE */}
              <div className="absolute top-3 left-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {p.category?.name}
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col grow">
              <h2 className="text-lg font-bold text-gray-900 truncate">
                {p.title}
              </h2>

              <p className="text-blue-600 font-medium mt-1">
                {typeof p.price === "number"
                  ? `₹${p.price.toLocaleString()}`
                  : "Price on request"}
              </p>

              {/* DETAILS */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                {p.category?.slug === "land" ? (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">
                      {p.dimensions}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">
                      Plot Dimensions
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {p.bedrooms}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">
                        Beds
                      </span>
                    </div>

                    <div className="w-px h-8 bg-gray-100" />

                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {p.bathrooms}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">
                        Baths
                      </span>
                    </div>

                    <div className="w-px h-8 bg-gray-100" />

                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {p.area}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400">
                        Sq Ft
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => navigate(`/admin/edit-property/${p._id}`)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-white text-red-500 border border-red-100 py-2.5 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="text-gray-300 text-5xl mb-4">🏠</div>
          <h3 className="text-gray-900 font-bold text-xl">No properties found</h3>
          <p className="text-gray-500 mt-1">
            Start by adding your first property listing.
          </p>
        </div>
      )}
    </div>

  );
}
