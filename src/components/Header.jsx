import React, { useState } from "react";
import logo from "../assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="max-w-full sticky top-5 z-50 mx-5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30
                            shadow-[0_8px_30px_rgb(0,0,0,0.09)]
                            transition-all hover:shadow-xl hover:scale-[1.02]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Jhilmil Logo"
            className="h-12 w-auto object-contain "
          />
          <div className="flex flex-col leading-tight">
            <h1 className="text-2xl font-bold tracking-wide text-blue-900">
              JHILMIL
            </h1>
            <span className="text-xs text-blue-900 font-medium tracking-wide">
              HOMECARE SERVICES LIMITED
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-blue-800 font-medium">
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          <a href="/services" className="hover:text-blue-600 transition">Services</a>
          <a href="/my-bookings" className="block hover:text-blue-600">My Bookings</a>
          <a href="/booking"className="hidden md:block bg-blue-700 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition">Book Service</a>
          
        </nav>

        {/* CTA Button (Desktop) */}


        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-blue-800 text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner px-6 py-4 space-y-4 text-blue-800 font-medium animate-slideDown">
          <a href="/" className="block hover:text-blue-600">Home</a>
          <a href="/services" className="block hover:text-blue-600">Services</a>
          <a href="/my-bookings" className="block hover:text-blue-600">My Bookings</a>
          <button
            href="/booking"
            // className="block bg-blue-700 text-white text-center px-4 py-2 rounded-lg shadow hover:bg-blue-800"
          >
            Book Service
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
