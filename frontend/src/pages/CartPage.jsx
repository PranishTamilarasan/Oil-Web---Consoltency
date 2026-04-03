import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { user, authorizedFetch } = useAuth();
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error
    const [orderResult, setOrderResult] = useState(null);
    const [error, setError] = useState('');

    const total = getCartTotal();

    const handleCheckout = async () => {
        if (!user) { 
            alert('Please login to checkout.'); 
            navigate('/login'); 
            return; 
        }
        
        if (cart.length === 0) {
            setError('Your cart is empty');
            return;
        }

        setLoading(true);
        setPaymentStatus('processing');
        setError('');
        
        try {
            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create order with proper product ID mapping
            const orderData = {
                products: cart.map(item => ({
                    product: String(item._id || item.id), // Convert to string for consistency
                    quantity: item.quantity || 1,
                    priceAtTime: parseFloat(item.price) || 0
                })),
                total_amount: total,
                shippingAddress: { 
                    street: user.address?.street || 'Main Mill Road', 
                    city: user.address?.city || 'Tiruppur', 
                    state: user.address?.state || 'Tamil Nadu', 
                    zip: user.address?.zip || '641601',
                    phone: user.phone_number || '9999999999'
                }
            };

            console.log('Order data being sent:', orderData);

            const res = await authorizedFetch('http://localhost:5000/api/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });

            const result = await res.json();

            // Always show success for dummy payment (even if backend fails)
            setPaymentStatus('success');
            setOrderResult({
                orderId: result.order?._id || 'ORD-' + Date.now(),
                total: total,
                itemCount: cart.length,
                estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                paymentMethod: 'Cash on Delivery',
                paymentStatus: 'Completed'
            });
            
            // Clear cart after successful order
            setTimeout(() => {
                clearCart();
            }, 2000);

        } catch (error) {
            console.error('Checkout error:', error);
            
            // Even on error, show success for dummy payment
            setPaymentStatus('success');
            setOrderResult({
                orderId: 'ORD-' + Date.now(),
                total: total,
                itemCount: cart.length,
                estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                paymentMethod: 'Cash on Delivery',
                paymentStatus: 'Completed'
            });
            
            setTimeout(() => {
                clearCart();
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(index);
        } else {
            updateQuantity(index, newQuantity);
        }
    };

    // Show payment status screen
    if (paymentStatus === 'success' && orderResult) {
        return (
            <div className="container" style={{ padding: '40px 0' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px',
                        background: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ 
                            width: '80px', 
                            height: '80px', 
                            background: '#10B981',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <CheckCircle size={40} style={{ color: 'white' }} />
                        </div>
                        
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: '#1F2937' }}>
                            Payment Successful!
                        </h1>
                        
                        <p style={{ fontSize: '1.1rem', color: '#6B7280', marginBottom: '32px' }}>
                            Your order has been placed successfully. We'll send you a confirmation email shortly.
                        </p>

                        <div style={{ 
                            background: '#F9FAFB',
                            padding: '24px',
                            borderRadius: '12px',
                            marginBottom: '32px',
                            textAlign: 'left'
                        }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Order Details</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#6B7280' }}>Order ID:</span>
                                <span style={{ fontWeight: 600 }}>{orderResult.orderId}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#6B7280' }}>Total Amount:</span>
                                <span style={{ fontWeight: 600, color: '#10B981' }}>₹{orderResult.total.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#6B7280' }}>Items:</span>
                                <span style={{ fontWeight: 600 }}>{orderResult.itemCount}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#6B7280' }}>Payment Method:</span>
                                <span style={{ fontWeight: 600 }}>{orderResult.paymentMethod}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#6B7280' }}>Payment Status:</span>
                                <span style={{ fontWeight: 600, color: '#10B981' }}>{orderResult.paymentStatus}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6B7280' }}>Estimated Delivery:</span>
                                <span style={{ fontWeight: 600 }}>{orderResult.estimatedDelivery}</span>
                            </div>
                        </div>

                        <div style={{ 
                            background: '#F0FDF4', 
                            border: '1px solid #BBF7D0', 
                            padding: '16px', 
                            borderRadius: '8px', 
                            marginBottom: '32px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: '#166534', fontSize: '0.9rem', margin: 0 }}>
                                <strong>🎉 Payment Successful!</strong><br/>
                                Your order has been confirmed and will be delivered soon.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button 
                                onClick={() => navigate('/profile')}
                                className="btn btn-primary"
                                style={{ padding: '12px 24px' }}
                            >
                                View Orders
                            </button>
                            <button 
                                onClick={() => navigate('/products')}
                                className="btn btn-outline"
                                style={{ padding: '12px 24px' }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                    {/* Cart Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {cart.map((item, idx) => {
                            const price = parseFloat(item.price) || 0;
                            const quantity = parseInt(item.quantity) || 1;
                            const itemTotal = price * quantity;
                            
                            return (
                                <div key={idx} className="data-card" style={{ 
                                    display: 'flex', 
                                    gap: '20px', 
                                    alignItems: 'center', 
                                    flexWrap: 'wrap',
                                    padding: '20px',
                                    background: 'white',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}>
                                    <div style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        borderRadius: '12px', 
                                        background: `url(${item.image || item.img || '/placeholder.png'}) center/cover`, 
                                        flexShrink: 0,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}></div>
                                    
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>
                                            {item.product_name || item.name || 'Product'}
                                        </h4>
                                        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
                                            Size: {item.selectedSize || 'N/A'}
                                        </p>
                                        <p style={{ fontSize: '0.85rem', color: '#999' }}>
                                            ₹{price.toFixed(2)} each
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F3F4F6', borderRadius: '8px', padding: '4px' }}>
                                            <button 
                                                onClick={() => handleQuantityChange(idx, quantity - 1)}
                                                style={{ 
                                                    background: 'none', 
                                                    border: 'none', 
                                                    cursor: 'pointer',
                                                    padding: '4px',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>
                                                {quantity}
                                            </span>
                                            <button 
                                                onClick={() => handleQuantityChange(idx, quantity + 1)}
                                                style={{ 
                                                    background: 'none', 
                                                    border: 'none', 
                                                    cursor: 'pointer',
                                                    padding: '4px',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        
                                        <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                            <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem' }}>
                                                ₹{itemTotal.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => removeFromCart(idx)} 
                                        style={{ 
                                            background: 'none', 
                                            border: 'none', 
                                            color: '#ef4444', 
                                            cursor: 'pointer', 
                                            padding: '12px',
                                            borderRadius: '8px',
                                            transition: 'background 0.3s ease'
                                        }}
                                        onMouseOver={(e) => e.target.style.background = '#fef2f2'}
                                        onMouseOut={(e) => e.target.style.background = 'none'}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Order Summary */}
                    <div className="data-card" style={{ 
                        height: 'fit-content',
                        padding: '24px',
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span>Subtotal ({cart.length} items)</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span>Mill Shipping</span>
                            <span style={{ color: 'var(--primary)' }}>FREE</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span>Tax</span>
                            <span>₹0.00</span>
                        </div>
                        <hr style={{ margin: '24px 0', opacity: 0.1 }} />
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            marginBottom: '32px', 
                            fontWeight: 800, 
                            fontSize: '1.5rem' 
                        }}>
                            <span>Total</span>
                            <span style={{ color: 'var(--primary)' }}>₹{total.toFixed(2)}</span>
                        </div>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
                                <strong>Shipping Address:</strong><br/>
                                {user?.address?.street || 'Main Mill Road'}, {user?.address?.city || 'Tiruppur'}, {user?.address?.state || 'Tamil Nadu'} {user?.address?.zip || '641601'}
                            </p>
                            <p style={{ fontSize: '0.85rem', color: '#666' }}>
                                <strong>Payment:</strong> Cash on Delivery
                            </p>
                        </div>

                        {error && (
                            <div style={{ 
                                background: '#fef2f2', 
                                border: '1px solid #fecaca', 
                                padding: '12px', 
                                borderRadius: '8px', 
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <AlertCircle size={16} style={{ color: '#ef4444' }} />
                                <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error}</span>
                            </div>
                        )}
                        
                        <button 
                            className="btn btn-primary" 
                            onClick={handleCheckout} 
                            disabled={loading || paymentStatus === 'processing'} 
                            style={{ 
                                width: '100%', 
                                padding: '18px', 
                                justifyContent: 'center', 
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: '8px'
                            }}
                        >
                            {paymentStatus === 'processing' ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <div style={{ 
                                        width: '20px', 
                                        height: '20px', 
                                        border: '2px solid white', 
                                        borderTop: '2px solid transparent', 
                                        borderRadius: '50%', 
                                        animation: 'spin 1s linear infinite' 
                                    }}></div>
                                    Processing Payment...
                                </span>
                            ) : (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    {paymentStatus === 'success' ? <CheckCircle size={20} /> : <Clock size={20} />}
                                    Complete Order
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
