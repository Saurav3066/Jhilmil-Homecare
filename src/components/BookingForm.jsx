import { useEffect, useState } from "react";

const BookingForm = ({ services, onSuccess, initialServiceId, initialBooking }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    service: initialServiceId || "",
    visitDate: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");

  // ---------- Toast ----------
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const openToast = (message, type = "success-toast") => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast({ show: false, message: "", type: "" });
  };

  // ---------- Populate in edit mode ----------
  useEffect(() => {
    if (initialBooking) {
      setFormData({
        patientName: initialBooking.name || "",
        service: initialBooking.serviceId || initialServiceId || "",
        visitDate: initialBooking.date || "",
        contact: initialBooking.contact || "",
        address: initialBooking.address || "",
      });
    }
  }, [initialBooking, initialServiceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (
      !formData.patientName ||
      !formData.service ||
      !formData.visitDate ||
      !formData.contact ||
      !formData.address
    ) {
      setError("Please fill all required fields");
      return false;
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      setError("Contact number must be 10 digits");
      return false;
    }

    setError("");
    return true;
  };

  // ---------- Submit ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const existing = JSON.parse(localStorage.getItem("jhilmil_bookings") || "[]");

    if (initialBooking && initialBooking.id) {
      // Edit flow
      const updated = existing.map((b) =>
        b.id === initialBooking.id
          ? {
              ...b,
              name: formData.patientName,
              serviceId: formData.service,
              date: formData.visitDate,
              contact: formData.contact,
              address: formData.address,
              updatedAt: new Date().toISOString(),
            }
          : b
      );
      localStorage.setItem("jhilmil_bookings", JSON.stringify(updated));

      // Show toast instead of alert
      openToast("Booking updated successfully");
      return;
    }

    // Create flow
    const newBooking = {
      id: Date.now(),
      name: formData.patientName,
      serviceId: formData.service,
      date: formData.visitDate,
      contact: formData.contact,
      address: formData.address,
      createdAt: new Date().toISOString(),
    };

    existing.push(newBooking);
    localStorage.setItem("jhilmil_bookings", JSON.stringify(existing));

    // Show toast instead of alert
    openToast("Booking submitted successfully");
    return;
  };

  // ---------- Toast OK Handler ----------
  const handleToastConfirm = () => {
    closeToast();

    if (typeof onSuccess === "function") {
      const data = initialBooking
        ? { ...initialBooking, ...formData }
        : { id: Date.now(), ...formData };

      onSuccess(data);
    }
  };

  return (
    <>
      {/* ---------- Blur BG when toast shows ---------- */}
      {toast.show && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-20"></div>
      )}

      {/* ---------- Success Toast ---------- */}
      {toast.show && (
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 px-7 py-6 rounded-xl shadow-xl z-30
          bg-white border border-gray-200 text-gray-800 animate-fade-in-up"
        >
          <p className="font-semibold text-lg">{toast.message}</p>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleToastConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ---------- Booking Form ---------- */}
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-xl mx-auto
          p-6 md:p-8 rounded-2xl
          bg-white/80 backdrop-blur-sm
          border border-gray-200 shadow-lg
          space-y-6 transition-all
          relative z-0
        "
      >
        {error && (
          <div className="text-red-700 font-medium bg-red-50 border border-red-100 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block font-semibold text-gray-800">Patient Name</label>
          <input
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
            className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-semibold text-gray-800">Select Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option value="">Choose a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block font-semibold text-gray-800">Preferred Visit Date</label>
          <input
            type="date"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-semibold text-gray-800">Contact Number</label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-semibold text-gray-800">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full address"
            className="w-full p-3 rounded-xl min-h-[100px] border border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:scale-[0.995] transition-transform"
        >
          {initialBooking ? "Update Booking" : "Submit Booking"}
        </button>
      </form>
    </>
  );
};

export default BookingForm;
