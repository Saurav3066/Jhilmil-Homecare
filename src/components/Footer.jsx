import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-6 flex flex-col items-center">
        {/* Left Section */}
        <p className="text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
    </footer>
  );
}
