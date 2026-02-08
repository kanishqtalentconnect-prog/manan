import { Navigate, useNavigate, Link } from "react-router-dom";
import { isAdmin } from "../utils/isAdmin";
import { useEffect, useState } from "react";
import api from "../api/axios";

type Stats = {
  totalProperties: number;
  enquiries: number;
  siteVisits: number;
  categories: number;
};

type RecentProperty = {
  _id: string;
  title: string;
  price?: number;
  tag: string;
  category?: {
    _id: string;
    name: string;
  };
};




export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentProperty[]>([]);
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, []);
  useEffect(() => {
    api.get("/properties").then((res) => {
      setRecent(res.data.slice(0, 5));
    });
  }, []);

  
  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  if (!isAdmin()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50/50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2 gap-6">
        
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Overview of your real estate portfolio performance.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <Link
              to="/admin/properties"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              Properties
            </Link>

            <Link
              to="/admin/categories"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              Categories
            </Link>

            <Link
              to="/admin/bookings"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              Bookings
            </Link>

            <Link
              to="/admin/enquiries"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              Enquiries
            </Link>
          </div>

          <button
            onClick={() => navigate("/admin/content-management", {
              state: { from: "/admin" },
            })}
            className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg shadow-gray-200"
          >
            Manage Content
          </button>
          <button
            onClick={() => navigate("/admin/add-property", {
              state: { from: "/admin" },
            })}
            className="bg-black text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg shadow-gray-200"
          >
            <span className="text-lg">+</span> Add Property
          </button>
        </div>
      </div>

      <div className="p-2 max-w-7xl mb-4 mx-auto bg-gray-50/50">
        <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-white border border-gray-200 text-sm font-semibold 
              text-gray-700 hover:bg-gray-50 hover:shadow transition"
          >
            ← Back to Home
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Categories</p>
          <h3 className="text-3xl font-black text-gray-900">{stats?.categories || 0}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-600">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Properties</p>
          <h3 className="text-3xl font-black text-gray-900">{stats?.totalProperties || 0}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Enquiries</p>
          <h3 className="text-3xl font-black text-gray-900">{stats?.enquiries || 0}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Site Visits</p>
          <h3 className="text-3xl font-black text-gray-900">{stats?.siteVisits || 0}</h3>
        </div>
      </div>

      {/* RECENT PROPERTIES TABLE */}
      <div className="mt-12 bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Recent Listings
          </h2>
          <Link to="/admin/properties" className="text-blue-600 text-xs font-bold hover:underline uppercase tracking-tighter">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Title</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Type</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Tag</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {recent.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {p.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {p.category?.name || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">
                    {typeof p.price === "number"
                      ? `₹${p.price.toLocaleString()}`
                      : "Price on request"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {p.tag || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate(`/admin/edit-property/${p._id}`)}
                      className="text-gray-400 hover:text-black transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">
                    No recent properties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
