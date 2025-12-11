import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Section */}
        <p className="text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
