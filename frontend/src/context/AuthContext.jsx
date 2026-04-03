import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    const login = async (email, password) => {
        try {
            console.log('🔐 AuthContext login attempt:', email);
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            console.log('📦 API response:', data);
            
            if (res.ok) {
                const userData = { ...data.user, token: data.token, username: data.user.name };
                console.log('👤 User data to save:', userData);
                console.log('🔑 User role from API:', data.user.role);
                
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                console.log('✅ Login successful, user saved to localStorage');
                return { success: true };
            }
            console.log('❌ Login failed:', data.message);
            return { success: false, message: data.message };
        } catch (e) {
            console.log('🚨 Login error:', e);
            return { success: false, message: 'Server error' };
        }
    };

    const signup = async (formData) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) return { success: true };
            return { success: false, message: data.message };
        } catch (e) {
            return { success: false, message: 'Server error' };
        }
    };

    const authorizedFetch = async (url, options = {}) => {
        if (!user || !user.token) return { success: false, message: 'Not authenticated' };
        try {
            const res = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) return { success: true, data };
            return { success: false, message: data.message };
        } catch (e) {
            return { success: false, message: 'Server error' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    return <AuthContext.Provider value={{ user, login, signup, logout, authorizedFetch }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
