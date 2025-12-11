import { useState } from "react";

const BookingForm = ({ services }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    service: "",
    visitDate: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.patientName ||
      !formData.service ||
      !formData.visitDate ||
      !formData.contact ||
      !formData.address
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      setError("Contact number must be 10 digits");
      return;
    }

    setError("");
    alert("Booking submitted successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full max-w-xl mx-auto
        p-6 md:p-8 rounded-2xl
        bg-white/30 backdrop-blur-xl
        border border-white/40
        shadow-xl
        space-y-6
        transition-all
      "
    >
      {error && (
        <div className="text-red-600 font-medium bg-red-50/80 border border-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Patient Name */}
      <div className="space-y-2">
        <label className="block font-semibold text-gray-800">
          Patient Name
        </label>
        <input
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="Enter patient name"
          className="
            w-full p-3 rounded-xl
            border border-gray-300
            bg-white/60
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            outline-none transition-all
          "
        />
      </div>

      {/* Service */}
      <div className="space-y-1">
        <label className="block font-semibold text-gray-800">
          Select Service
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="
            w-full p-3 rounded-xl
            border border-gray-300 bg-white/60
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            outline-none transition-all
          "
        >
          <option value="">Choose a service</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Visit Date */}
      <div className="space-y-1">
        <label className="block font-semibold text-gray-800">
          Preferred Visit Date
        </label>
        <input
          type="date"
          name="visitDate"
          value={formData.visitDate}
          onChange={handleChange}
          className="
            w-full p-3 rounded-xl
            border border-gray-300 bg-white/60
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            outline-none transition-all
          "
        />
      </div>

      {/* Contact */}
      <div className="space-y-1">
        <label className="block font-semibold text-gray-800">
          Contact Number
        </label>
        <input
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          className="
            w-full p-3 rounded-xl
            border border-gray-300 bg-white/60
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            outline-none transition-all
          "
        />
      </div>

      {/* Address */}
      <div className="space-y-1">
        <label className="block font-semibold text-gray-800">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter full address"
          className="
            w-full p-3 rounded-xl min-h-[100px]
            border border-gray-300 bg-white/60
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            outline-none transition-all
          "
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          w-full py-3 rounded-xl
          bg-linear-to-r from-blue-600 to-blue-700
          text-white font-semibold shadow-lg
          hover:from-blue-700 hover:to-blue-800
          active:scale-95 transition-all
        "
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
