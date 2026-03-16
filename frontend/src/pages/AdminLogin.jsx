import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
    const [form, setForm] = useState({ e: '', p: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handle = async (e) => {
        e.preventDefault();
        const res = await login(form.e, form.p);
        if (res.success) {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser.role === 'ADMIN') navigate('/admin');
            else { navigate('/admin-login'); setError('Access denied. Admins only.'); }
        } else {
            setError(res.message);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111827', padding: '20px' }}>
            <div className="login-card" style={{ width: '100%', maxWidth: '400px', background: '#1F2937', color: 'white', border: '1px solid #374151' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ color: 'var(--accent)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '8px' }}>ADMIN ENGINE</div>
                    <h2 style={{ fontSize: '1.8rem' }}>Control Access</h2>
                </div>

                {error && <div style={{ background: '#7F1D1D', color: '#F87171', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handle}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: '#9CA3AF' }}>Admin Email</label>
                        <input className="input-field" placeholder="admin@mill.com" type="email" onChange={e => setForm({ ...form, e: e.target.value })} required style={{ background: '#374151', border: '1px solid #4B5563', color: 'white' }} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: '#9CA3AF' }}>Secure Key</label>
                        <input className="input-field" type="password" placeholder="••••••••" onChange={e => setForm({ ...form, p: e.target.value })} required style={{ background: '#374151', border: '1px solid #4B5563', color: 'white' }} />
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', borderRadius: '12px', fontWeight: 700, background: 'var(--accent)', color: '#000' }}>Initialize Station</button>
                </form>

                <Link to="/login" style={{ display: 'block', textAlign: 'center', marginTop: '32px', fontSize: '0.85rem', color: '#9CA3AF', textDecoration: 'none' }}>Return to User Site</Link>
            </div>
        </div>
    );
};

export default AdminLogin;
