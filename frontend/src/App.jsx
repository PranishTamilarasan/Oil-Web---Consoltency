import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
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
import DebugLogin from './pages/DebugLogin';
import TestPage from './pages/TestPage';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminInventory from './admin/AdminInventory';
import AdminOrders from './admin/AdminOrders';
import AdminBookings from './admin/AdminBookings';
import AdminEquipment from './admin/AdminEquipment';
import AIReports from './admin/AIReports';

export default function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <CartProvider>
                    <Router>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin-login" element={<AdminLogin />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/debug" element={<><Navbar /><DebugLogin /><Footer /></>} />
                            <Route path="/test" element={<><Navbar /><TestPage /><Footer /></>} />

                            <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
                            <Route path="/products" element={<><Navbar /><ProductsPage /><Footer /></>} />
                            <Route path="/booking" element={<><Navbar /><BookingPage /><Footer /></>} />
                            <Route path="/rental" element={<><Navbar /><RentalPage /><Footer /></>} />
                            <Route path="/cart" element={<><Navbar /><CartPage /><Footer /></>} />
                            <Route path="/profile" element={<><Navbar /><ProfilePage /><Footer /></>} />

                            <Route path="/admin" element={<ProtectedRoute role="ADMIN"><ErrorBoundary><AdminLayout><AdminDashboard /></AdminLayout></ErrorBoundary></ProtectedRoute>} />
                            <Route path="/admin/inventory" element={<ProtectedRoute role="ADMIN"><ErrorBoundary><AdminLayout><AdminInventory /></AdminLayout></ErrorBoundary></ProtectedRoute>} />
                            <Route path="/admin/orders" element={<ProtectedRoute role="ADMIN"><ErrorBoundary><AdminLayout><AdminOrders /></AdminLayout></ErrorBoundary></ProtectedRoute>} />
                            <Route path="/admin/bookings" element={<ProtectedRoute role="ADMIN"><ErrorBoundary><AdminLayout><AdminBookings /></AdminLayout></ErrorBoundary></ProtectedRoute>} />
                            <Route path="/admin/equipment" element={<ProtectedRoute role="ADMIN"><ErrorBoundary><AdminLayout><AdminEquipment /></AdminLayout></ErrorBoundary></ProtectedRoute>} />
                            <Route path="/admin/reports" element={<ProtectedRoute role="ADMIN"><ErrorBoundary><AdminLayout><AIReports /></AdminLayout></ErrorBoundary></ProtectedRoute>} />

                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Router>
                </CartProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}
