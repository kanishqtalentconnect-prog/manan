import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

type Property = {
  _id: string;
  title: string;
  price: number;
  images: string[];
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p._id} className="bg-white shadow rounded-xl overflow-hidden">
            <img
              src={p.images?.[0]}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-gray-600">
                ₹ {p.price.toLocaleString()}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/admin/edit-property/${p._id}`)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
