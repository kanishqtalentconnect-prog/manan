import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

type Booking = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  status: string;
  property: {
    title: string;
    propertyType: string;
  };
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/bookings")
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status });

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status } : b
        )
      );
    } catch {
      alert("Failed to update booking");
    }
  };


  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Site Visit Bookings</h1>
        <p className="text-gray-500 mt-1">Manage and respond to client visit requests.</p>
      </div>

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

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse flex space-x-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            <div className="space-y-3">
              <div className="h-4 w-62.5 bg-gray-200 rounded"></div>
              <div className="h-4 w-50 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-lg font-medium">No bookings found in the system.</p>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="p-4 pl-6 text-xs font-bold uppercase tracking-wider text-gray-500">Customer</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Property</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Visit Date</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Contact Info</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                <th className="p-4 pr-6 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="p-4 pl-6">
                    <p className="font-bold text-gray-900">{b.name}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">{b.property?.title}</span>
                      <span className="text-[10px] uppercase font-bold text-blue-500 tracking-tighter">
                        {b.property?.propertyType}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 font-medium">
                    {new Date(b.visitDate).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="p-4">
                    <div className="text-xs space-y-0.5">
                      <p className="text-gray-900">{b.email}</p>
                      <p className="text-gray-500">{b.phone}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end gap-2">
                      {b.status === "pending" ? (
                        <>
                          <button
                            onClick={() => updateStatus(b._id, "confirmed")}
                            className="px-4 py-1.5 text-xs font-bold bg-green-50 text-green-700 rounded-lg hover:bg-green-600 hover:text-white transition-all"
                          >
                            Confirm
                          </button>

                          <button
                            onClick={() => updateStatus(b._id, "cancelled")}
                            className="px-4 py-1.5 text-xs font-bold bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                          Processed
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-extrabold border tracking-wider uppercase
        ${styles[status] || "bg-gray-100 text-gray-600 border-gray-200"}
      `}
    >
      {status}
    </span>
  );
}