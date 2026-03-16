import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CartPage = ({ cart, onRemove, onClear }) => {
    const { user, authorizedFetch } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        if (!user) { alert('Please login to checkout.'); navigate('/login'); return; }
        if (cart.length === 0) return;

        setLoading(true);
        const orderData = {
            products: cart.map(item => ({
                product: item._id,
                quantity: item.quantity,
                priceAtTime: item.price
            })),
            total_amount: total,
            shippingAddress: { street: 'Main Mill Road', city: 'Tiruppur', state: 'Tamil Nadu', zip: '641601' }
        };

        const res = await authorizedFetch('http://localhost:5000/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });

        setLoading(false);
        if (res.success) {
            alert('Order placed successfully! Check MongoDB Compass for the new entry.');
            onClear();
            navigate('/');
        } else {
            alert(res.message || 'Checkout failed');
        }
    };
    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h1 className="section-title">Your Shopping Bag</h1>
            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <ShoppingBag size={64} style={{ opacity: 0.1, marginBottom: '24px' }} />
                    <p style={{ color: '#999' }}>Your cart is currently empty.</p>
                    <Link to="/products" className="btn btn-primary" style={{ marginTop: '24px' }}>Browse Products</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {cart.map((item, idx) => (
                            <div key={idx} className="data-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: `url(${item.img}) center/cover`, flexShrink: 0 }}></div>
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <h4 style={{ fontSize: '1.1rem' }}>{item.product_name || item.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#666' }}>Size: {item.selectedSize} | Qty: {item.quantity}</p>
                                    <p style={{ color: 'var(--primary)', fontWeight: 800 }}>₹{item.price * item.quantity}.00</p>
                                </div>
                                <button onClick={() => onRemove(idx)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', padding: '12px' }}><Trash2 size={24} /></button>
                            </div>
                        ))}
                    </div>
                    <div className="data-card" style={{ height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '24px' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span>Subtotal</span><span>₹{total}.00</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}><span>Mill Shipping</span><span style={{ color: 'var(--primary)' }}>FREE</span></div>
                        <hr style={{ margin: '24px 0', opacity: 0.1 }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontWeight: 800, fontSize: '1.5rem' }}><span>Total</span><span>₹{total}.00</span></div>
                        <button className="btn btn-primary" onClick={handleCheckout} disabled={loading} style={{ width: '100%', padding: '18px', justifyContent: 'center', fontSize: '1.1rem' }}>
                            {loading ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
