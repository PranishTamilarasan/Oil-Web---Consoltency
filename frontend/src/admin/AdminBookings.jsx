import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { authorizedFetch } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            const res = await authorizedFetch('http://localhost:5000/api/bookings/all');
            if (res.success) setBookings(res.data);
        };
        fetchBookings();
    }, []);

    const handleAction = async (id, status) => {
        const res = await authorizedFetch(`http://localhost:5000/api/bookings/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ booking_status: status })
        });
        if (res.success) {
            setBookings(bookings.map(b => b._id === id ? { ...b, booking_status: status } : b));
        }
    };

    return (
        <div className="data-card">
            <h3>Yard Reservation System</h3>
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {bookings.map((b, i) => (
                    <div key={b._id} style={{ padding: '20px', border: '1px solid #EEE', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{b.user?.name || 'Customer'}</p>
                            <p style={{ color: '#666' }}>{new Date(b.booking_date || b.date).toLocaleDateString()} | {b.time_slot || b.timeSlot} | {b.areaSize} Acre</p>
                            <p style={{ fontSize: '0.8rem', color: (b.booking_status || b.status) === 'Approved' ? 'green' : ((b.booking_status || b.status) === 'Rejected' ? 'red' : 'orange'), fontWeight: 700 }}>Status: {b.booking_status || b.status}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {(b.booking_status || b.status) === 'Pending' && (
                                <>
                                    <button onClick={() => handleAction(b._id, 'Rejected')} className="btn btn-outline" style={{ padding: '8px 16px', borderColor: 'red', color: 'red' }}>Reject</button>
                                    <button onClick={() => handleAction(b._id, 'Approved')} className="btn btn-primary" style={{ padding: '8px 16px' }}>Approve</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                {bookings.length === 0 && <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No reservations found</p>}
            </div>
        </div>
    );
};

export default AdminBookings;
