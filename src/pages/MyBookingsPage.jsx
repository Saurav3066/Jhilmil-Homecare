import React from "react";
import Card from "../components/Card";
import { services as mockServices } from "../data/mock";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function MyBookingsPage() {
  const [bookings, setBookings] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ---------- Toast State ----------
  const [toast, setToast] = React.useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    if (type !== "confirm") {
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3500);
    }
  };

  // ---------- Load Bookings ----------
  const load = React.useCallback(() => {
    const b = JSON.parse(localStorage.getItem("jhilmil_bookings") || "[]");
    b.sort((a, c) => (c.createdAt || c.id) - (a.createdAt || a.id));
    setBookings(b);
  }, []);

  React.useEffect(() => {
    load();

    const handler = (e) => {
      if (e.key === "jhilmil_bookings") load();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [load]);

  // ---------- Show toast if returning from edit ----------
  React.useEffect(() => {
    if (location.state?.edited) {
      showToast("Booking updated successfully", "success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const getServiceName = (id) => {
    const s = mockServices.find((x) => String(x.id) === String(id));
    return s ? s.name : id;
  };

  // ---------- Delete Booking ----------
  const handleDelete = (id) => {
    setToast({
      show: true,
      type: "confirm",
      message: (
        <div className="text-center">
          <p className="font-medium text-gray-700 mb-3">Are you sure you want to delete this booking?</p>
          <div className="flex justify-center gap-3 mt-3">
            <button
              onClick={() => confirmDelete(id)}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setToast({ show: false, message: "", type: "" })}
              className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
    });
  };

  const confirmDelete = (id) => {
    const existing = JSON.parse(localStorage.getItem("jhilmil_bookings") || "[]");
    const updated = existing.filter((b) => String(b.id) !== String(id));

    localStorage.setItem("jhilmil_bookings", JSON.stringify(updated));
    setBookings(updated);

    showToast(
      <div className="flex items-center justify-between gap-3">
        <span>Booking deleted successfully</span>
        <button onClick={() => setToast({ show: false, message: "", type: "" })}>
          <FaTimes />
        </button>
      </div>,
      "success"
    );
  };

  // ---------- Edit Booking ----------
  const handleEdit = (id) => {
    navigate("/booking", { state: { bookingId: id } });
  };

  // ---------- Empty ----------
  if (!bookings || bookings.length === 0)
    return <p className="text-gray-500 text-center mt-10">No bookings yet.</p>;

  return (
    <div className="relative">
      {/* ---------- BLUR BACKGROUND ---------- */}
      {toast.show && <div className="fixed inset-0 backdrop-blur-sm bg-black/10 z-10"></div>}

      {/* ---------- Toast UI ---------- */}
      {toast.show && (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 px-6 py-4 rounded-xl shadow-xl z-20
          ${toast.type === "success" ? "bg-green-600 text-white" : ""} 
          ${toast.type === "confirm" ? "bg-white border border-gray-200 text-gray-900" : ""}
          animate-fade-in-up max-w-sm w-full`}
        >
          {toast.message}
        </div>
      )}

      {/* ---------- Booking Cards ---------- */}
      <div className="space-y-6 my-10 mx-5">
  {bookings.map((b) => (
    <Card
      key={b.id}
      className="p-6 bg-white shadow-lg hover:shadow-2xl transition rounded-xl border border-gray-100"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* LEFT SECTION */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div className="min-w-0">
              <div className="text-xl font-bold text-gray-800 truncate">{b.name}</div>
              <div className="text-sm text-indigo-600 mt-1 truncate">{getServiceName(b.serviceId)}</div>
            </div>

            <div className="text-sm text-gray-400 whitespace-nowrap mt-1 sm:mt-0">
              Created:{" "}
              <span className="text-gray-600">
                {b.createdAt
                  ? new Date(b.createdAt).toLocaleString()
                  : new Date(Number(b.id)).toLocaleString()}
              </span>
            </div>
          </div>

          {/* GRID DETAILS */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-medium text-gray-800">Visit Date</div>
              <div className="text-gray-600">{b.date}</div>
            </div>
            <div>
              <div className="font-medium text-gray-800">Contact</div>
              <div className="text-gray-600">{b.contact}</div>
            </div>
            <div>
              <div className="font-medium text-gray-800">Address</div>
              <div className="text-gray-600 truncate">{b.address}</div>
            </div>
          </div>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex flex-row md:flex-col items-stretch gap-3 md:gap-2 mt-2 md:mt-0">
          <button
            onClick={() => handleEdit(b.id)}
            className="px-5 py-2 rounded-lg border border-indigo-500 bg-indigo-50 text-indigo-700 hover:bg-indigo-500 hover:text-white transition font-medium"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(b.id)}
            className="px-5 py-2 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </Card>
  ))}
</div>

    </div>
  );
}
