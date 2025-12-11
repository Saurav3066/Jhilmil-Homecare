import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import PatientsPage from './pages/PatientsPage'
import ServicesPage from './pages/ServicesPage'
import BookingPage from './pages/BookingPage'
import MyBookingsPage from './pages/MyBookingsPage'


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-r/hsl from-slate-200 to-slate-100 ">
      <Header />
      <main className="container mx-auto p-4 flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}