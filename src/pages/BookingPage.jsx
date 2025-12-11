import React from "react";
import { services as mockServices } from "../data/mock";
import BookingForm from "../components/BookingForm";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  function onSuccess(booking) {
    alert("Booking saved!");
    navigate("/my-bookings");
  }

  return (
    <div
      className="
        min-h-screen w-full 
        flex flex-col items-center 
        px-4 py-10
        bg-transparent
      "
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Book a Service
        </h2>
        <p className="text-gray-600 mt-1 text-base">
          Fill in the details below to schedule your home visit.
        </p>
      </div>

      {/* Form Wrapper */}
      <div className="w-full max-w-2xl">
        <BookingForm
          services={mockServices}
          initialServiceId={state?.serviceId}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
