import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ e: '', p: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handle = async (e) => {
        e.preventDefault();
        const res = await login(form.e, form.p);
        if (res.success) {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser.role === 'USER') navigate('/');
            else { navigate('/login'); setError('This portal is for customers only.'); }
        } else {
            setError(res.message);
        }
    };

    const handleGoogleLogin = () => {
        alert('Google Sign-In integration would typically use Firebase or Google Identity Services.');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9FBF9', padding: '20px' }}>
            <div className="login-card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '8px' }}>USER PORTAL</div>
                    <h2 style={{ fontSize: '1.8rem' }}>Welcome Back</h2>
                </div>

                {error && <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handle}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Email Address</label>
                        <input className="input-field" placeholder="your@email.com" type="email" onChange={e => setForm({ ...form, e: e.target.value })} required />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Password</label>
                        <input className="input-field" type="password" placeholder="••••••••" onChange={e => setForm({ ...form, p: e.target.value })} required />
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', borderRadius: '12px', fontWeight: 700 }}>Sign In</button>
                </form>

                <div style={{ margin: '24px 0', textAlign: 'center', position: 'relative' }}>
                    <hr style={{ opacity: 0.1 }} />
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '0 12px', color: '#999', fontSize: '0.8rem' }}>OR</span>
                </div>

                <button onClick={handleGoogleLogin} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" style={{ width: '20px' }} />
                    Sign in with Google
                </button>

                <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.9rem', color: '#666' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Create Account</Link>
                </p>
                <Link to="/admin-login" style={{ display: 'block', textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: '#AAA', textDecoration: 'none' }}>Admin Access Only</Link>
            </div>
        </div>
    );
};

export default Login;
