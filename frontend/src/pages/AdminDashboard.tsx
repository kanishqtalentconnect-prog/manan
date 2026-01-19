import { Navigate, useNavigate, Link } from "react-router-dom";
import { isAdmin } from "../utils/isAdmin";

export default function AdminDashboard() {
  const navigate = useNavigate();

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

        <button
          onClick={() => navigate("/admin/add-property")}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Property
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold">Total Properties</h2>
          <p className="text-2xl mt-2">—</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold">Enquiries</h2>
          <p className="text-2xl mt-2">—</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold">Site Visits</h2>
          <p className="text-2xl mt-2">—</p>
        </div>
      </div>
    </div>
  );
}
