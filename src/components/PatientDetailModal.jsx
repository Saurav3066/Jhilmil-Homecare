import React from "react";
import Card from "./Card";
import { X } from "react-feather";

export default function PatientDetailModal({ patient, onClose }) {
  if (!patient) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 
        bg-white/50 backdrop-blur-sm 
        flex items-center justify-center 
        p-4 animate-fadeIn
      "
    >
      <div
        className="
          max-w-lg w-full 
          transform animate-scaleIn
        "
      >
        <Card className="relative p-10 mx-7 bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4 
              p-2 rounded-full 
              bg-blue-50 backdrop-blur 
              hover:bg-blue-200
              transition-all
              text-blue-800
            "
          >
            <X size={30} />
          </button>

          {/* Header */}
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            {patient.name}
          </h3>

          {/* Details */}
          <div className="text-blue-800 space-y-3 text-sm">

            <Detail label="Age" value={patient.age} />
            <Detail label="Type of Care" value={patient.careType} />
            <Detail label="Status" value={patient.status} />
            <Detail label="Next Visit" value={patient.nextVisit} />
            <Detail label="Caregiver" value={patient.caregiver} />
            <Detail label="Notes" value={patient.notes} />

          </div>
        </Card>
      </div>
    </div>
  );
}

/* Small reusable detail row */
function Detail({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="font-semibold text-gray-900">{label}:</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}
