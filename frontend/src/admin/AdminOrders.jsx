import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const { authorizedFetch } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await authorizedFetch('http://localhost:5000/api/orders/all');
            if (res.success) setOrders(res.data);
        };
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        await authorizedFetch(`http://localhost:5000/api/orders/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ order_status: status })
        });
        // Refresh orders
        const res = await authorizedFetch('http://localhost:5000/api/orders/all');
        if (res.success) setOrders(res.data);
    };

    return (
        <div className="data-card">
            <h3>Client Orders Pipeline</h3>
            <table className="standard-table">
                <thead><tr><th>Order Id</th><th>Customer</th><th>Amount</th><th>Status</th><th>Tracing</th></tr></thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id}>
                            <td>#{o._id.slice(-6).toUpperCase()}</td>
                            <td>{o.user?.name || 'Guest'}</td>
                            <td>₹{o.total_amount || o.totalAmount}</td>
                            <td><span style={{ padding: '4px 12px', background: (o.order_status || o.orderStatus) === 'Delivered' ? '#E8F5E9' : '#FFF3E0', color: (o.order_status || o.orderStatus) === 'Delivered' ? '#2E7D32' : '#F57C00', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>{o.order_status || o.orderStatus}</span></td>
                            <td><Link to="#" style={{ color: 'var(--primary)' }} onClick={() => updateStatus(o._id, 'Delivered')}><CheckCircle size={16} /></Link></td>
                        </tr>
                    ))}
                    {orders.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No orders found in database</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;
