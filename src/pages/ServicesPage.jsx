import React from "react";
import { services as mockServices } from "../data/mock";
import ServiceList from "../components/ServiceList";
import { useNavigate } from "react-router-dom";

export default function ServicesPage() {
  const navigate = useNavigate();

  function handleBook(service) {
    navigate("/booking", { state: { serviceId: service.id } });
  }

  return (
    <div
      className="
        min-h-screen w-full 
        px-4 py-10 
        flex flex-col items-center
      "
    >
      {/* Page Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Our Services
        </h2>
        <p className="text-gray-600 mt-1 text-base">
          Select a service and book your appointment instantly.
        </p>
      </div>

      {/* Service List Container */}
      <div className="w-full max-w-5xl">
        <ServiceList services={mockServices} onBook={handleBook} />
      </div>
    </div>
  );
}
