import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ cartCount }) => {
    const { user, logout } = useAuth();
    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Link to="/" className="logo">SHRI THIRUMURUGAN<span style={{ color: '#333' }}> OIL MILL</span></Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/booking">Yard Booking</Link>
                    <Link to="/rental">Equipment</Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <Link to="/cart" style={{ position: 'relative', color: '#1A1A1A' }}>
                        <ShoppingCart size={22} />
                        {cartCount > 0 && <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
                    </Link>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Link to="/profile" style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)', textDecoration: 'none' }}>{user.name || 'My Account'}</Link>
                            {user.role === 'ADMIN' ? <Link to="/admin" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Admin Panel</Link> : <button onClick={logout} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Logout</button>}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <Link to="/login" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Sign In</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
