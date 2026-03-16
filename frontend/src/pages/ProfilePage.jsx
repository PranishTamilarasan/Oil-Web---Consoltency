import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Package, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user, authorizedFetch, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const orderRes = await authorizedFetch('http://localhost:5000/api/orders/my');
            if (orderRes.success) setOrders(orderRes.data);

            const bookingRes = await authorizedFetch('http://localhost:5000/api/bookings/my');
            if (bookingRes.success) setBookings(bookingRes.data);
        };
        if (user) fetchHistory();
    }, [user]);

    if (!user) return <Navigate to="/login" />;

    return (
        <div className="container" style={{ padding: '80px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome, {user.name}</h1>
                    <p style={{ color: '#666' }}>Manage your orders, bookings, and account settings.</p>
                </div>
                <button onClick={logout} className="btn btn-outline" style={{ color: 'red', borderColor: 'red' }}>Logout</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
                {/* --- ORDER HISTORY --- */}
                <div className="data-card">
                    <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}><Package color="var(--primary)" /> Recent Orders</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {orders.map(o => (
                            <div key={o._id} style={{ padding: '16px', border: '1px solid #F0F0F0', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: 800 }}>Order #{o._id.slice(-6).toUpperCase()}</span>
                                    <span style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#F0F0F0', borderRadius: '100px' }}>{o.order_status || o.orderStatus}</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#666' }}>{new Date(o.createdAt).toLocaleDateString()}</p>
                                <p style={{ fontWeight: 700, marginTop: '8px' }}>Total Amount: ₹{o.total_amount || o.totalAmount}</p>
                            </div>
                        ))}
                        {orders.length === 0 && <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No orders yet.</p>}
                    </div>
                </div>

                {/* --- BOOKING HISTORY --- */}
                <div className="data-card">
                    <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}><Calendar color="var(--primary)" /> Yard Bookings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {bookings.map(b => (
                            <div key={b._id} style={{ padding: '16px', border: '1px solid #F0F0F0', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: 800 }}>{new Date(b.booking_date || b.date).toLocaleDateString()}</span>
                                    <span style={{ fontSize: '0.75rem', padding: '4px 10px', background: (b.booking_status || b.status) === 'Approved' ? '#E8F5E9' : '#FFF3E0', color: (b.booking_status || b.status) === 'Approved' ? 'green' : 'orange', borderRadius: '100px' }}>{b.booking_status || b.status}</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#666' }}>Slot: {b.time_slot || b.timeSlot} | Area: {b.areaSize} Acre</p>
                            </div>
                        ))}
                        {bookings.length === 0 && <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No bookings yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
