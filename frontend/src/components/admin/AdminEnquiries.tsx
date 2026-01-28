import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { isAdmin } from "../../utils/isAdmin";
import { Navigate } from "react-router-dom";

type Enquiry = {
  _id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  bestTimeToReach: string;
  question: string;
  createdAt: string;
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/enquiries")
      .then((res) => setEnquiries(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (!isAdmin()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      <h1 className="text-3xl font-extrabold mb-6">Enquiries</h1>

      <div className="p-2 max-w-7xl mb-6 mx-auto bg-gray-50/50">
        <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-white border border-gray-200 text-sm font-semibold 
              text-gray-700 hover:bg-gray-50 hover:shadow transition"
          >
            ← Back to Dashboard
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading enquiries...</p>}

      {!loading && enquiries.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
          <p className="text-gray-500">No enquiries received yet.</p>
        </div>
      )}

      <div className="space-y-4">
        {enquiries.map((e) => (
          <div
            key={e._id}
            className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <div>
                <p className="text-xs uppercase tracking-widest text-black-400 mb-1">
                  Property: {e.propertyTitle}
                </p>
                
              </div>
            <div className="flex justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{e.name}</h3>
                <p className="text-sm text-gray-500">{e.email}</p>
                <p className="text-sm text-gray-500">{e.phone}</p>
              </div>

              <div className="text-sm text-gray-500">
                <p>
                  <span className="font-semibold">Best time:</span>{" "}
                  {e.bestTimeToReach}
                </p>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-700">
              {e.question}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
