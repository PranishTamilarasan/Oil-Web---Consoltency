import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', phone_number: '', address: '', password: '', role: 'USER' });
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handle = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const res = await signup(form);
        setLoading(false);
        if (res.success) {
            alert('Registration successful! Please login.');
            navigate('/login');
        } else {
            setError(res.message);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FBF9', padding: '40px 20px' }}>
            <div className="login-card" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Create Account</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '32px' }}>Join the traditional oil mill community</p>

                {error && <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handle}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Full Name</label>
                            <input className="input-field" placeholder="John Doe" onChange={e => setForm({ ...form, name: e.target.value })} required />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Phone Number</label>
                            <input className="input-field" placeholder="+91 9876543210" onChange={e => setForm({ ...form, phone_number: e.target.value })} required />
                        </div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Address</label>
                        <input className="input-field" placeholder="123 Mill St, Tiruppur" onChange={e => setForm({ ...form, address: e.target.value })} required />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Email Address</label>
                        <input className="input-field" type="email" placeholder="john@example.com" onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Phone Number</label>
                        <input className="input-field" type="tel" placeholder="+91 98765 43210" onChange={e => setForm({ ...form, phone: e.target.value })} required />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Account Type</label>
                        <select className="input-field" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required style={{ height: '54px' }}>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Password</label>
                        <input className="input-field" type="password" placeholder="••••••••" onChange={e => setForm({ ...form, password: e.target.value })} required />
                    </div>

                    <button className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '16px', borderRadius: '12px', fontWeight: 700 }}>
                        {loading ? 'Creating Account...' : 'Register Now'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.9rem', color: '#666' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
