import { Navigate, useNavigate, Link } from "react-router-dom";
import { isAdmin } from "../utils/isAdmin";
import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardCard from "../components/admin/DashboardCard";

type Stats = {
  totalProperties: number;
  enquiries: number;
  siteVisits: number;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<any[]>([]);

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
    <div className="p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>
        <Link
          to="/admin/properties"
          className="bg-gray-800 text-white px-5 py-2 rounded-lg"
        >
          Manage Properties
        </Link>
        <Link
          to="/admin/bookings"
          className="bg-gray-800 text-white px-5 py-2 rounded-lg"
        >
          View All Bookings →
        </Link>

        <button
          onClick={() => navigate("/admin/add-property")}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Property
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Properties"
          value={stats?.totalProperties}
        />
        <DashboardCard
          title="Enquiries"
          value={stats?.enquiries}
        />
        <DashboardCard
          title="Site Visits"
          value={stats?.siteVisits}
        />
      </div>

      {/* RECENT PROPERTIES */}
      <div className="mt-10 bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Properties
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Title</th>
              <th>Type</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="py-2">{p.title}</td>
                <td className="capitalize">{p.propertyType}</td>
                <td>₹ {p.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
