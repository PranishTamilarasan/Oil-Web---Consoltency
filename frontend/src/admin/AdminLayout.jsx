import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Archive, Truck, Calendar, Settings, Download, LogOut, Search, UserIcon } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const menu = [
        { name: 'Dashboard', path: '/admin', icon: <BarChart3 size={20} /> },
        { name: 'Inventory', path: '/admin/inventory', icon: <Archive size={20} /> },
        { name: 'Orders', path: '/admin/orders', icon: <Truck size={20} /> },
        { name: 'Bookings', path: '/admin/bookings', icon: <Calendar size={20} /> },
        { name: 'Equipment', path: '/admin/equipment', icon: <Settings size={20} /> },
        { name: 'Reports', path: '/admin/reports', icon: <Download size={20} /> }
    ];
    return (
        <div className="admin-shell">
            <aside className="admin-sidebar" style={{ background: '#111827', border: 'none' }}>
                <div style={{ padding: '0 0 40px' }}>
                    <div style={{ color: 'var(--accent)', fontWeight: 900, fontSize: '1.4rem', borderLeft: '4px solid var(--accent)', paddingLeft: '16px' }}>MILL ENGINE</div>
                    <p style={{ fontSize: '0.7rem', color: '#6B7280', marginTop: '4px', paddingLeft: '20px' }}>PRO CONTROL PANEL</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    {menu.map(item => (
                        <Link key={item.path} to={item.path} className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`} style={{ color: location.pathname === item.path ? 'white' : '#9CA3AF' }}>{item.icon} {item.name}</Link>
                    ))}
                </div>
                <div style={{ marginTop: 'auto', borderTop: '1px solid #1F2937', paddingTop: '24px' }}>
                    <Link to="/" className="sidebar-link" style={{ color: '#EF4444' }}><LogOut size={20} /> Exit Admin</Link>
                </div>
            </aside>
            <main className="admin-main">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                    <h1 style={{ fontSize: '1.8rem' }}>{menu.find(m => m.path === location.pathname)?.name || 'Admin Panel'}</h1>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <Search size={20} color="#999" />
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EEE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserIcon size={20} /></div>
                    </div>
                </header>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
