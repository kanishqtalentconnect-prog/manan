import { useEffect, useState } from "react";
import api from "../api/axios";

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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Site Visit Bookings</h1>

      {loading && <p>Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-500">No bookings yet</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Visit Date</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t">
                  <td className="p-3">{b.name}</td>
                  <td className="p-3">
                    {b.property?.title}
                    <span className="ml-2 text-xs text-gray-500">
                      ({b.property?.propertyType})
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(b.visitDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">{b.email}</td>
                  <td className="p-3">{b.phone}</td>
                  <td className="p-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="p-3 space-x-2">
                    {b.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(b._id, "confirmed")}
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() => updateStatus(b._id, "cancelled")}
                          className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {b.status !== "pending" && (
                      <span className="text-gray-400 text-xs">
                        No actions
                      </span>
                    )}

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
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold
        ${styles[status] || "bg-gray-100 text-gray-600"}
      `}
    >
      {status.toUpperCase()}
    </span>
  );
}
