import React from "react";
import { services as mockServices } from "../data/mock";
import BookingForm from "../components/BookingForm";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingPage() {
  const { state } = useLocation(); // state may contain { serviceId } for quick create or { bookingId } for edit
  const navigate = useNavigate();

  // If editing, try to load the booking from localStorage
  const bookingId = state?.bookingId;
  const [initialBooking, setInitialBooking] = React.useState(null);

  React.useEffect(() => {
    if (bookingId) {
      const existing = JSON.parse(localStorage.getItem("jhilmil_bookings") || "[]");
      const found = existing.find((b) => String(b.id) === String(bookingId));
      if (found) setInitialBooking(found);
    }
  }, [bookingId]);

  function onSuccess(booking) {
    // booking is the newly created/updated booking object
    const message = bookingId ? "Booking updated!" : "Booking saved!";
    navigate("/my-bookings");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-10 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          {initialBooking ? "Edit Booking" : "Book a Service"}
        </h2>
        <p className="text-gray-600 mt-1 text-base">
          {initialBooking
            ? "Update the details and click Update Booking."
            : "Fill in the details below to schedule your home visit."}
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <BookingForm
          services={mockServices}
          initialServiceId={state?.serviceId}
          initialBooking={initialBooking}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
