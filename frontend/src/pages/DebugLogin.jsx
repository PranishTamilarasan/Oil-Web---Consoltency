import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DebugLogin = () => {
    const { user } = useAuth();
    const [localStorageData, setLocalStorageData] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        setLocalStorageData({
            user: savedUser ? JSON.parse(savedUser) : null,
            token: savedToken
        });
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>🔍 Login Debug Information</h1>
            
            <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h2>AuthContext User:</h2>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>

            <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h2>LocalStorage Data:</h2>
                <pre>{JSON.stringify(localStorageData, null, 2)}</pre>
            </div>

            <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h2>Role Checks:</h2>
                <p>user?.role: {user?.role}</p>
                <p>user?.role === 'ADMIN': {user?.role === 'ADMIN' ? 'true' : 'false'}</p>
                <p>user?.role === 'admin': {user?.role === 'admin' ? 'true' : 'false'}</p>
                <p>localStorageData?.user?.role: {localStorageData?.user?.role}</p>
                <p>localStorageData?.user?.role === 'ADMIN': {localStorageData?.user?.role === 'ADMIN' ? 'true' : 'false'}</p>
            </div>

            <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h2>Navigation Test:</h2>
                <button onClick={() => window.location.href = '/'}>Go to Home</button>
                <button onClick={() => window.location.href = '/admin'} style={{ marginLeft: '10px' }}>Go to Admin</button>
                <button onClick={() => window.location.href = '/login'} style={{ marginLeft: '10px' }}>Go to Login</button>
            </div>
        </div>
    );
};

export default DebugLogin;
