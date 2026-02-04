import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import PropertyForm from "../components/admin/PropertyForm";

export default function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  useEffect(() => {
    api.get(`/properties/${id}`).then((res) => setProperty(res.data));
  }, [id]);

  if (!property) return <p className="p-8">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>

      <div className="p-2 max-w-7xl mb-6 mx-auto bg-gray-50/50">
        <button
            onClick={() => navigate("/admin/properties")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-white border border-gray-200 text-sm font-semibold 
              text-gray-700 hover:bg-gray-50 hover:shadow transition"
          >
            ← Back to Properties
        </button>
      </div>

      <PropertyForm
        initialData={property}
        onSuccess={() => navigate("/admin/properties")}
      />
    </div>
  );
}
