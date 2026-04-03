import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const { authorizedFetch } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await authorizedFetch('http://localhost:5000/api/orders/all');
                console.log('📦 Orders API response:', res);
                if (res.success) {
                    setOrders(res.data);
                    console.log('✅ Orders loaded:', res.data.length);
                } else {
                    console.log('❌ Orders API failed:', res.message);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
        
        // Auto-refresh every 10 seconds
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await authorizedFetch(`http://localhost:5000/api/orders/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ order_status: status })
            });
            console.log('🔄 Update status response:', res);
            
            // Refresh orders
            const refreshRes = await authorizedFetch('http://localhost:5000/api/orders/all');
            console.log('🔄 Refresh orders response:', refreshRes);
            if (refreshRes.success) {
                setOrders(refreshRes.data);
                console.log('✅ Orders refreshed');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="data-card">
            <h3>Client Orders Pipeline</h3>
            <table className="standard-table">
                <thead><tr><th>Order Id</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th><th>Payment</th><th>Actions</th></tr></thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id}>
                            <td><strong>#{(o._id || '').slice(-6).toUpperCase()}</strong></td>
                            <td>{o.user?.name || 'Guest User'}</td>
                            <td style={{ fontWeight: 600, color: '#10B981' }}>₹{(o.total_amount || o.totalAmount || 0).toFixed(2)}</td>
                            <td>
                                <span style={{ 
                                    padding: '4px 12px', 
                                    background: (o.order_status || o.orderStatus) === 'Delivered' ? '#E8F5E9' : 
                                                  (o.order_status || o.orderStatus) === 'Shipped' ? '#DBEAFE' : 
                                                  (o.order_status || o.orderStatus) === 'Processing' ? '#F3E8FF' :
                                                  (o.order_status || o.orderStatus) === 'Pending' ? '#FFF3E0' : '#FEE2E2', 
                                    color: (o.order_status || o.orderStatus) === 'Delivered' ? '#2E7D32' : 
                                          (o.order_status || o.orderStatus) === 'Shipped' ? '#1E40AF' : 
                                          (o.order_status || o.orderStatus) === 'Processing' ? '#6B21A8' :
                                          (o.order_status || o.orderStatus) === 'Pending' ? '#D97706' : '#B91C1C', 
                                    borderRadius: '100px', 
                                    fontSize: '0.75rem', 
                                    fontWeight: 800 
                                }}>
                                    {(o.order_status || o.orderStatus || 'Processing').toUpperCase()}
                                </span>
                            </td>
                            <td>{new Date(o.createdAt || Date.now()).toLocaleDateString()}</td>
                            <td>
                                <span style={{ 
                                    padding: '2px 8px', 
                                    background: '#F0FDF4', 
                                    color: '#166534', 
                                    borderRadius: '4px', 
                                    fontSize: '0.7rem', 
                                    fontWeight: 600 
                                }}>
                                    {(o.payment_method || 'Cash on Delivery')}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {(o.order_status || o.orderStatus || 'Processing') !== 'Delivered' && (
                                        <Link 
                                            to="#" 
                                            style={{ color: '#10B981' }} 
                                            onClick={() => updateStatus(o._id, 'Delivered')}
                                            title="Mark as Delivered"
                                        >
                                            <CheckCircle size={16} />
                                        </Link>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                <div>
                                    <p style={{ marginBottom: '8px' }}>No orders found in database</p>
                                    <p style={{ fontSize: '0.85rem', color: '#ccc' }}>Orders will appear here when customers complete checkout</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;
