import React from 'react'
import Card from '../components/Card'


export default function MyBookingsPage() {
    const [bookings, setBookings] = React.useState([])
    React.useEffect(() => {
        const b = JSON.parse(localStorage.getItem('jhilmil_bookings') || '[]')
        setBookings(b)
    }, [])


    if (bookings.length === 0) return <p className="text-gray-500">No bookings yet.</p>


    return (
        <div className="space-y-3">
            {bookings.map(b => (
                <Card key={b.id}>
                    <div className="flex justify-between">
                        <div>
                            <div className="font-medium">{b.name}</div>
                            <div className="text-sm text-gray-500">Service ID: {b.serviceId}</div>
                            <div className="text-sm text-gray-500">Date: {b.date}</div>
                        </div>
                        <div className="text-sm text-gray-500">Created: {new Date(b.createdAt).toLocaleString()}</div>
                    </div>
                </Card>
            ))}
        </div>
    )
}