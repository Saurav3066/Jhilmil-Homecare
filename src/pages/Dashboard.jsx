import React from 'react';
import Card from '../components/Card';
import { patients, services } from '../data/mock';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const activePatients = patients.filter(p => p.status === 'Active').length;
  const upcoming = patients.filter(p => new Date(p.nextVisit) >= new Date()).length;

  return (
    <div className="space-y-10 m-5 px-4 sm:px-6 py-6">

      {/* ======================= BANNER ======================= */}
      <div
        className="
        relative rounded-3xl overflow-hidden
        bg-linear-to-r from-blue-600/70 via-purple-600/70 to-pink-600/70
        backdrop-blur-xl p-6 sm:p-10 shadow-xl text-white
      "
      >
        <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-lg">
          Welcome to Your Dashboard
        </h1>

        <p className="text-base sm:text-lg text-white/80 mt-2 max-w-xl">
          Track patients, review services, and manage appointments easily.
        </p>
      </div>


      {/* ======================= STAT CARDS ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="Total Patients" subtitle={`Active: ${activePatients}`}>
          <div className="text-3xl sm:text-4xl font-bold text-blue-900 drop-shadow">
            {patients.length}
          </div>
        </Card>

        <Card title="Services Offered" subtitle={`Popular: ${services.filter(s => s.tag === 'Popular').length}`}>
          <div className="text-3xl sm:text-4xl font-bold text-blue-900 drop-shadow">
            {services.length}
          </div>
        </Card>

        <Card title="Upcoming Visits" subtitle={<Link to="/patients" className="text-blue-700 underline">View Patients</Link>}>
          <div className="text-3xl sm:text-4xl font-bold text-blue-900 drop-shadow">
            {upcoming}
          </div>
        </Card>
      </div>

      {/* ======================= MINI CHARTS (FAKE PLACEHOLDERS) ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Weekly Patient Visits" subtitle="7-day trend">
          <div className="flex gap-2 items-end h-20">
            <div className="w-4 bg-blue-500 h-8 rounded"></div>
            <div className="w-4 bg-blue-500 h-12 rounded"></div>
            <div className="w-4 bg-blue-500 h-6 rounded"></div>
            <div className="w-4 bg-blue-500 h-14 rounded"></div>
            <div className="w-4 bg-blue-500 h-10 rounded"></div>
            <div className="w-4 bg-blue-500 h-16 rounded"></div>
            <div className="w-4 bg-blue-500 h-9 rounded"></div>
          </div>
        </Card>

        <Card title="Service Utilization" subtitle="Popular services">
          <div className="flex flex-col gap-3 text-sm text-gray-800">
            <div className="flex justify-between"><span>Consultation</span><span>62%</span></div>
            <div className="flex justify-between"><span>Physiotherapy</span><span>48%</span></div>
            <div className="flex justify-between"><span>Lab Tests</span><span>31%</span></div>
          </div>
        </Card>

        <Card title="Daily Activity" subtitle="Today’s stats">
          <ul className="space-y-2 text-gray-800 text-sm">
            <li>• 8 new patient appointments</li>
            <li>• 3 follow-up visits</li>
            <li>• 12 service requests</li>
          </ul>
        </Card>
      </div>

      {/* ======================= SUMMARY CARDS ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Patients Summary" subtitle="Recent Patients">
          <ul className="text-sm text-blue-800 space-y-1">
            {patients.slice(0, 4).map(p => (
              <li key={p.id}>
                <span className="font-semibold">{p.name}</span> — {p.careType} — {p.status}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Services Summary" subtitle="Top Services">
          <ul className="text-sm text-blue-800 space-y-1">
            {services.slice(0, 4).map(s => (
              <li key={s.id}>
                <span className="font-semibold">{s.name}</span> — {s.freq}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ======================= ANNOUNCEMENTS ======================= */}
      <Card title="Announcements" subtitle="Latest updates">
        <ul className="text-sm text-gray-800 space-y-2">
          <li>• New appointment scheduling system launching next week.</li>
          <li>• Covid-19 vaccination returns starting Monday.</li>
          <li>• New service added: Home Nursing Care.</li>
        </ul>
      </Card>

    </div>
  );
}
