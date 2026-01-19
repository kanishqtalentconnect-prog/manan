import { useNavigate } from "react-router-dom";
import PropertyForm from "../components/admin/PropertyForm";

export default function AddPropertyPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add Property</h1>

      <PropertyForm onSuccess={() => navigate("/admin")} />
    </div>
  );
}
