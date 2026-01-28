import { useLocation, useNavigate } from "react-router-dom";
import PropertyForm from "../components/admin/PropertyForm";

export default function AddPropertyPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/admin";

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add Property</h1>
      <div className="p-2 max-w-7xl mb-6 mx-auto bg-gray-50/50">
        <button
            onClick={() => navigate(from)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-white border border-gray-200 text-sm font-semibold 
              text-gray-700 hover:bg-gray-50 hover:shadow transition"
          >
            ← Back to {from === "/admin" ? "Admin Dashboard" : "Properties"}
        </button>
      </div>

      <PropertyForm onSuccess={() => navigate("/admin")} />
    </div>
  );
}
