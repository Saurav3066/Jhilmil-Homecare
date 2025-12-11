import React from 'react'
import { patients as mockPatients } from '../data/mock'
import FilterBar from '../components/FilterBar'
import PatientList from '../components/PatientList'
import PatientDetailModal from '../components/PatientDetailModal'

export default function PatientsPage() {
  const [search, setSearch] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [careType, setCareType] = React.useState('')
  const [selected, setSelected] = React.useState(null)

  const careTypes = Array.from(new Set(mockPatients.map(p => p.careType)))

  const filtered = mockPatients.filter(p => {
    if (status && p.status !== status) return false
    if (careType && p.careType !== careType) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">Patients</h1>

        {/* Filter Bar */}
        <div className="mb-10 relative z-10">
          <FilterBar
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            careType={careType}
            setCareType={setCareType}
            careTypes={careTypes}
          />
        </div>

        {/* Patient List */}
        <div className="grid grid-cols-1  lg:grid-cols-1 gap-6">
          <PatientList patients={filtered} onSelect={p => setSelected(p)} />
        </div>

        {/* Patient Modal */}
        <PatientDetailModal patient={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  )
}
