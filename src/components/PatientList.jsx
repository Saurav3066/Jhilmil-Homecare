import React from "react";

export default function PatientList({ patients, onSelect }) {
  if (patients.length === 0)
    return (
      <p className="text-gray-500 text-center py-6 tracking-wide">
        No patients found.
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-0 overflow-visible">
      {patients.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelect(p)}
          className="
            cursor-pointer p-5 
            rounded-2xl 
            bg-white/20 backdrop-blur-xl 
            border border-white/30 
            shadow-lg 
            hover:shadow-2xl 
            hover:scale-[1.02] 
            transition-all duration-300 
            flex justify-between items-center gap-4
            overflow-visible
            z-0
          "
        >
          {/* LEFT SIDE */}
          <div className="space-y-1">
            <div className="font-semibold text-gray-900 text-lg">
              {p.name}{" "}
              <span className="text-sm text-gray-600 font-normal">
                ({p.age})
              </span>
            </div>

            <div className="text-sm text-gray-700 tracking-wide">
              {p.careType} •{" "}
              <span className="text-blue-700 font-medium">
                Next: {p.nextVisit}
              </span>
            </div>
          </div>

          {/* STATUS BADGE */}
          <div
            className={`
              px-3 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap
              transition-all shadow-sm
              ${
                p.status === "Active"
                  ? "bg-green-200/60 text-green-800 border border-green-300/40"
                  : "bg-gray-200/60 text-gray-700 border border-gray-300/40"
              }
            `}
          >
            {p.status}
          </div>
        </div>
      ))}
    </div>
  );
}
