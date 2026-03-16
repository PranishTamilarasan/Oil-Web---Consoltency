import React from 'react';
import { CreditCard, Package, Calendar, UserIcon, ShoppingCart, Archive, Settings } from 'lucide-react';

const AdminDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* --- KPI SECTION --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
                { t: 'Net Revenue', v: '₹1,24,500', c: '+12.5%', i: <CreditCard />, color: '#10B981' },
                { t: 'Pending Orders', v: '34 Units', c: '+5 today', i: <Package />, color: '#F59E0B' },
                { t: 'Active Bookings', v: '18 Slots', c: '82% Capacity', i: <Calendar />, color: '#3B82F6' },
                { t: 'Customer Growth', v: '1,240', c: '+18%', i: <UserIcon />, color: '#8B5CF6' }
            ].map(s => (
                <div key={s.t} className="data-card" style={{ padding: '24px', border: '1px solid #F3F4F6', transition: 'transform 0.3s ease' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ background: `${s.color}15`, color: s.color, padding: '12px', borderRadius: '12px' }}>{s.i}</div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: s.color }}>{s.c}</span>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>{s.t}</p>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '4px' }}>{s.v}</h2>
                    </div>
                </div>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            {/* --- CHART SECTION --- */}
            <div className="data-card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem' }}>Revenue Analytics</h3>
                        <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>Daily mill earnings for the last 7 days</p>
                    </div>
                    <select style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.85rem' }}>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '20px 0' }}>
                    {/* Grid Lines */}
                    {[1, 2, 3, 4].map(l => <div key={l} style={{ position: 'absolute', left: 0, right: 0, bottom: `${l * 25}%`, borderTop: '1px dashed #F3F4F6' }} />)}

                    {[45, 70, 55, 95, 65, 85, 90].map((h, i) => (
                        <div key={i} style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{
                                height: `${h}%`,
                                width: '100%',
                                maxWidth: '40px',
                                background: i === 6 ? 'var(--primary)' : 'linear-gradient(to top, var(--primary-glow), var(--primary))',
                                borderRadius: '8px 8px 4px 4px',
                                transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer'
                            }} className="chart-bar" title={`₹${h * 1000}`} />
                            <span style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '12px', fontWeight: 700 }}>Day {i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- RECENT ACTIVITY --- */}
            <div className="data-card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Recent Logs</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                        { u: 'New Order', d: 'Rahul placed ORD-891', t: '2 mins ago', i: <ShoppingCart size={16} />, c: '#10B981' },
                        { u: 'Stock Alert', d: 'Coconut Oil (1L) is low', t: '45 mins ago', i: <Archive size={16} />, c: '#EF4444' },
                        { u: 'Yard Booking', d: 'Space reserved by Kavya', t: '2 hours ago', i: <Calendar size={16} />, c: '#3B82F6' },
                        { u: 'System', d: 'Nightly backup completed', t: '4 hours ago', i: <Settings size={16} />, c: '#6B7280' }
                    ].map((act, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${act.c}15`, color: act.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {act.i}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.85rem', fontWeight: 800 }}>{act.u}</p>
                                <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>{act.d}</p>
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{act.t}</span>
                        </div>
                    ))}
                </div>
                <button className="btn btn-outline" style={{ width: '100%', marginTop: '32px', justifyContent: 'center', fontSize: '0.85rem', padding: '12px' }}>View Full AuditTrail</button>
            </div>
        </div>
    </div>
);

export default AdminDashboard;
