import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Package, Calendar, ShoppingBag, Clock, CheckCircle, Truck, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user, authorizedFetch, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchHistory = async () => {
        console.log('🔄 Fetching user history...');
        try {
            // Fetch user orders
            console.log('📦 Fetching orders from /api/orders/my');
            const orderRes = await authorizedFetch('http://localhost:5000/api/orders/my');
            console.log('📦 Orders response status:', orderRes.status);
            
            if (orderRes.ok) {
                const orderData = await orderRes.json();
                console.log('📦 User orders raw data:', orderData);
                console.log('📦 Is array?', Array.isArray(orderData));
                console.log('📦 Length:', orderData.length);
                
                setOrders(Array.isArray(orderData) ? orderData : []);
            } else {
                console.log('📦 Orders response not ok:', orderRes.status);
                const errorData = await orderRes.json();
                console.log('📦 Error data:', errorData);
                setOrders([]);
            }

            // Fetch user bookings
            console.log('📅 Fetching bookings from /api/bookings/my');
            const bookingRes = await authorizedFetch('http://localhost:5000/api/bookings/my');
            console.log('📅 Bookings response status:', bookingRes.status);
            
            if (bookingRes.ok) {
                const bookingData = await bookingRes.json();
                console.log('📅 User bookings raw data:', bookingData);
                setBookings(Array.isArray(bookingData) ? bookingData : []);
            } else {
                console.log('📅 Bookings response not ok:', bookingRes.status);
                const errorData = await bookingRes.json();
                console.log('📅 Error data:', errorData);
                setBookings([]);
            }
        } catch (error) {
            console.error('❌ Error fetching history:', error);
            setOrders([]);
            setBookings([]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchHistory();
            setLoading(false);
        };
        
        if (user) fetchData();
    }, [user]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        if (!user) return;
        
        const interval = setInterval(async () => {
            await fetchHistory();
        }, 30000);
        
        return () => clearInterval(interval);
    }, [user]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchHistory();
        setRefreshing(false);
    };

    if (!user) return <Navigate to="/login" />;

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return '#10B981';
            case 'shipped': return '#3B82F6';
            case 'processing': return '#8B5CF6';
            case 'pending': return '#F59E0B';
            case 'cancelled': return '#EF4444';
            default: return '#6B7280';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return <CheckCircle size={16} />;
            case 'shipped': return <Truck size={16} />;
            case 'processing': return <Clock size={16} />;
            case 'pending': return <Package size={16} />;
            case 'cancelled': return <Package size={16} />;
            default: return <Package size={16} />;
        }
    };

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShoppingBag color="var(--primary)" /> Recent Orders
                        </h3>
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            style={{
                                background: 'none',
                                border: '1px solid #E5E7EB',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#6B7280',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => e.target.style.background = '#F9FAFB'}
                            onMouseOut={(e) => e.target.style.background = 'none'}
                        >
                            <RefreshCw size={16} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                            {refreshing ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>
                    
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                            <div style={{ 
                                width: '40px', 
                                height: '40px', 
                                border: '4px solid #f3f4f6', 
                                borderTop: '4px solid var(--primary)', 
                                borderRadius: '50%', 
                                animation: 'spin 1s linear infinite', 
                                margin: '0 auto 16px' 
                            }}></div>
                            <p>Loading orders...</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Debug info */}
                            <div style={{ 
                                background: '#f8f9fa', 
                                padding: '12px', 
                                borderRadius: '8px', 
                                fontSize: '0.85rem', 
                                color: '#666',
                                border: '1px solid #e9ecef'
                            }}>
                                <strong>Debug Info:</strong><br/>
                                User: {user?.name} ({user?.email})<br/>
                                Orders found: {orders.length}<br/>
                                Orders data type: {typeof orders}<br/>
                                Is array: {Array.isArray(orders) ? 'Yes' : 'No'}<br/>
                                Last refresh: {new Date().toLocaleTimeString()}
                            </div>

                            {orders.map(o => (
                                <div key={o._id} style={{ 
                                    padding: '20px', 
                                    border: '1px solid #F0F0F0', 
                                    borderRadius: '12px',
                                    background: 'white',
                                    transition: 'transform 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                {getStatusIcon(o.order_status || o.orderStatus)}
                                                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                                                    Order #{(o._id || '').slice(-6).toUpperCase()}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
                                                {new Date(o.createdAt || Date.now()).toLocaleDateString()} at {new Date(o.createdAt || Date.now()).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ 
                                                fontSize: '0.75rem', 
                                                padding: '4px 10px', 
                                                background: `${getStatusColor(o.order_status || o.orderStatus)}15`, 
                                                color: getStatusColor(o.order_status || o.orderStatus), 
                                                borderRadius: '100px',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                {(o.order_status || o.orderStatus || 'Processing').toUpperCase()}
                                            </span>
                                            <p style={{ fontSize: '0.85rem', color: '#666', margin: '4px 0 0 0' }}>
                                                {(o.payment_method || 'Cash on Delivery')}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 4px 0' }}>
                                                {o.items?.length || 1} items
                                            </p>
                                            <p style={{ fontWeight: 700, fontSize: '1.2rem', color: '#10B981', margin: 0 }}>
                                                ₹{(o.total_amount || o.totalAmount || 0).toFixed(2)}
                                            </p>
                                        </div>
                                        
                                        {o.items && o.items.length > 0 && (
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontSize: '0.75rem', color: '#999', margin: 0 }}>
                                                    {o.items[0].product?.product_name || 'Product'} {o.items.length > 1 && `+${o.items.length - 1} more`}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {orders.length === 0 && !loading && (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                    <ShoppingBag size={48} style={{ opacity: 0.3, margin: '0 auto 16px' }} />
                                    <p style={{ marginBottom: '8px' }}>No orders yet</p>
                                    <p style={{ fontSize: '0.85rem', color: '#ccc' }}>Your order history will appear here after you complete checkout</p>
                                    <button 
                                        onClick={() => window.location.href = '/products'}
                                        className="btn btn-primary" 
                                        style={{ marginTop: '16px', padding: '8px 16px' }}
                                    >
                                        Browse Products
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
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
