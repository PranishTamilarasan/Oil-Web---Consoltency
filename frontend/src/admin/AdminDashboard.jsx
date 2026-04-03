import React, { useState, useEffect } from 'react';
import { CreditCard, Package, Calendar, UserIcon, ShoppingCart, Archive, Settings, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalBookings: 0,
        totalRentals: 0,
        pendingOrders: 0,
        activeBookings: 0,
        revenue: 0,
        recentUsers: [],
        recentBookings: [],
        recentRentals: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');
    const { user, authorizedFetch } = useAuth();

    useEffect(() => {
        console.log('🎯 AdminDashboard component mounted');
        console.log('🔑 Token exists:', !!token);
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        console.log('📊 Fetching dashboard data...');
        console.log('👤 User logged in:', !!user);
        console.log('🔑 Token exists:', !!token);
        
        setLoading(true);
        try {
            // Use authorizedFetch instead of manual fetch
            const response = await authorizedFetch('http://localhost:5000/api/admin/ai/dashboard');

            console.log('📡 Dashboard API response status:', response.status);

            if (response.success) {
                const data = response.data;
                console.log('📦 Dashboard data received:', data);
                setDashboardData({
                    totalUsers: data.totalUsers || 0,
                    totalProducts: data.totalProducts || 0,
                    totalBookings: data.totalBookings || 0,
                    totalRentals: data.totalRentals || 0,
                    pendingOrders: data.bookingsByStatus?.find(b => b._id === 'pending')?.count || 0,
                    activeBookings: data.bookingsByStatus?.find(b => b._id === 'confirmed')?.count || 0,
                    revenue: data.totalRentals * 500 || 0, // Estimated revenue
                    recentUsers: data.recentUsers || [],
                    recentBookings: data.recentBookings || [],
                    recentRentals: data.recentRentals || []
                });
                console.log('✅ Dashboard data set successfully');
            } else {
                console.log('❌ Authorized fetch failed:', response.message);
                setError(response.message || 'Failed to fetch dashboard data');
            }
        } catch (err) {
            console.error('🚨 Dashboard error:', err);
            setError('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const calculateGrowth = (current, previous) => {
        if (previous === 0) return current > 0 ? '+100%' : '0%';
        const growth = ((current - previous) / previous) * 100;
        return growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    if (loading) {
        console.log('⏳ AdminDashboard: Loading state');
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '4px solid #f3f4f6', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
                    <p style={{ color: '#666' }}>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        console.log('❌ AdminDashboard: Error state -', error);
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div style={{ textAlign: 'center', padding: '32px', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca' }}>
                    <AlertCircle size={48} style={{ color: '#ef4444', margin: '0 auto 16px' }} />
                    <h4 style={{ color: '#991b1b', marginBottom: '8px' }}>Dashboard Error</h4>
                    <p style={{ color: '#6b7280', marginBottom: '16px' }}>{error}</p>
                    <button onClick={fetchDashboardData} className="btn btn-primary" style={{ padding: '8px 16px' }}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    console.log('✅ AdminDashboard: Rendering dashboard with data:', dashboardData);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* --- KPI SECTION --- */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                {[
                    { 
                        t: 'Total Revenue', 
                        v: formatCurrency(dashboardData.revenue), 
                        c: calculateGrowth(dashboardData.revenue, dashboardData.revenue * 0.8), 
                        i: <CreditCard />, 
                        color: '#10B981',
                        trend: dashboardData.revenue > 0 ? 'up' : 'down'
                    },
                    { 
                        t: 'Pending Orders', 
                        v: `${dashboardData.pendingOrders} Units`, 
                        c: dashboardData.pendingOrders > 0 ? `+${dashboardData.pendingOrders} today` : 'No pending', 
                        i: <Package />, 
                        color: '#F59E0B',
                        trend: dashboardData.pendingOrders > 5 ? 'up' : 'stable'
                    },
                    { 
                        t: 'Active Bookings', 
                        v: `${dashboardData.activeBookings} Slots`, 
                        c: `${dashboardData.totalBookings > 0 ? Math.round((dashboardData.activeBookings / dashboardData.totalBookings) * 100) : 0}% Capacity`, 
                        i: <Calendar />, 
                        color: '#3B82F6',
                        trend: dashboardData.activeBookings > 10 ? 'up' : 'stable'
                    },
                    { 
                        t: 'Total Users', 
                        v: dashboardData.totalUsers.toLocaleString(), 
                        c: calculateGrowth(dashboardData.totalUsers, Math.max(0, dashboardData.totalUsers - 1)), 
                        i: <UserIcon />, 
                        color: '#8B5CF6',
                        trend: dashboardData.totalUsers > 0 ? 'up' : 'stable'
                    },
                    { 
                        t: 'Products', 
                        v: dashboardData.totalProducts.toLocaleString(), 
                        c: dashboardData.totalProducts > 0 ? 'In stock' : 'No products', 
                        i: <ShoppingCart />, 
                        color: '#06B6D4',
                        trend: dashboardData.totalProducts > 0 ? 'up' : 'down'
                    },
                    { 
                        t: 'Equipment Rentals', 
                        v: dashboardData.totalRentals.toLocaleString(), 
                        c: dashboardData.totalRentals > 0 ? `${dashboardData.totalRentals} active` : 'No rentals', 
                        i: <Archive />, 
                        color: '#F97316',
                        trend: dashboardData.totalRentals > 0 ? 'up' : 'stable'
                    }
                ].map(s => (
                    <div key={s.t} className="data-card" style={{ 
                        padding: '24px', 
                        border: '1px solid #F3F4F6', 
                        borderRadius: '16px', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        background: 'white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{ background: `${s.color}15`, color: s.color, padding: '12px', borderRadius: '12px' }}>{s.i}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {s.trend === 'up' && <TrendingUp size={14} style={{ color: s.color }} />}
                                {s.trend === 'down' && <TrendingDown size={14} style={{ color: s.color }} />}
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: s.color }}>{s.c}</span>
                            </div>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>{s.t}</p>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '4px', color: '#1F2937' }}>{s.v}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- RECENT ACTIVITY SECTION --- */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                {/* Recent Users */}
                <div className="data-card" style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', color: '#1F2937' }}>Recent Users</h3>
                    {dashboardData.recentUsers.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {dashboardData.recentUsers.slice(0, 5).map((user, index) => (
                                <div key={index} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    padding: '12px', 
                                    background: '#F9FAFB', 
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB'
                                }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: '#1F2937', margin: '0 0 4px 0' }}>{user.name}</p>
                                        <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0 }}>{user.email}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ 
                                            fontSize: '0.75rem', 
                                            padding: '4px 8px', 
                                            background: user.role === 'ADMIN' ? '#FEE2E2' : '#DBEAFE', 
                                            color: user.role === 'ADMIN' ? '#B91C1C' : '#1E40AF', 
                                            borderRadius: '12px',
                                            fontWeight: 600
                                        }}>
                                            {user.role}
                                        </span>
                                        <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: '4px 0 0 0' }}>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9CA3AF' }}>
                            <UserIcon size={48} style={{ margin: '0 auto 16px' }} />
                            <p>No recent users</p>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="data-card" style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', color: '#1F2937' }}>Quick Stats</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#6B7280' }}>User Growth</span>
                            <span style={{ fontWeight: 600, color: '#10B981' }}>{dashboardData.totalUsers > 0 ? '+100%' : '0%'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#6B7280' }}>Booking Rate</span>
                            <span style={{ fontWeight: 600, color: '#3B82F6' }}>
                                {dashboardData.totalBookings > 0 ? `${Math.round((dashboardData.activeBookings / dashboardData.totalBookings) * 100)}%` : '0%'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#6B7280' }}>Products Listed</span>
                            <span style={{ fontWeight: 600, color: '#8B5CF6' }}>{dashboardData.totalProducts}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#6B7280' }}>Rental Activity</span>
                            <span style={{ fontWeight: 600, color: '#F97316' }}>{dashboardData.totalRentals}</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .data-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
