import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import BookingPage from './pages/BookingPage';
import RentalPage from './pages/RentalPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminInventory from './admin/AdminInventory';
import AdminOrders from './admin/AdminOrders';
import AdminBookings from './admin/AdminBookings';
import AdminEquipment from './admin/AdminEquipment';

export default function App() {
    const [cart, setCart] = useState([]);
    const onAdd = (p) => setCart([...cart, p]);
    const onRemove = (idx) => setCart(cart.filter((_, i) => i !== idx));
    const onClear = () => setCart([]);

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/" element={<><Navbar cartCount={cart.length} /><HomePage onAdd={onAdd} /><Footer /></>} />
                    <Route path="/products" element={<><Navbar cartCount={cart.length} /><ProductsPage onAdd={onAdd} /><Footer /></>} />
                    <Route path="/booking" element={<><Navbar cartCount={cart.length} /><BookingPage /><Footer /></>} />
                    <Route path="/rental" element={<><Navbar cartCount={cart.length} /><RentalPage /><Footer /></>} />
                    <Route path="/cart" element={<><Navbar cartCount={cart.length} /><CartPage cart={cart} onRemove={onRemove} onClear={onClear} /><Footer /></>} />
                    <Route path="/profile" element={<><Navbar cartCount={cart.length} /><ProfilePage /><Footer /></>} />

                    <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
                    <Route path="/admin/inventory" element={<ProtectedRoute role="ADMIN"><AdminLayout><AdminInventory /></AdminLayout></ProtectedRoute>} />
                    <Route path="/admin/orders" element={<ProtectedRoute role="ADMIN"><AdminLayout><AdminOrders /></AdminLayout></ProtectedRoute>} />
                    <Route path="/admin/bookings" element={<ProtectedRoute role="ADMIN"><AdminLayout><AdminBookings /></AdminLayout></ProtectedRoute>} />
                    <Route path="/admin/equipment" element={<ProtectedRoute role="ADMIN"><AdminLayout><AdminEquipment /></AdminLayout></ProtectedRoute>} />
                    <Route path="/admin/reports" element={<ProtectedRoute role="ADMIN"><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
