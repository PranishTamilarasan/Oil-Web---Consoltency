import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Calendar, CheckCircle, XCircle, ArrowRight, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BookingPage = () => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    const { user, authorizedFetch } = useAuth();
    const navigate = useNavigate();

    // Mock 2-Acre Total Capacity Slots
    const INITIAL_YARD_DATA = [
        { id: 1, name: 'Heritage Small Yard', area: '0.25 Acre', price: 250, desc: 'Optimized for small-batch boutique oil production.' },
        { id: 2, name: 'Farmer Collective Space', area: '0.50 Acre', price: 450, desc: 'Spacious area designed for multi-farmer harvests.' },
        { id: 3, name: 'Primary Mill Floor', area: '1.00 Acre', price: 850, desc: 'Central drying zone with highest heat retention.' },
        { id: 4, name: 'Express Micro Zone', area: '0.25 Acre', price: 300, desc: 'Premium edge zone for quick-load processing.' }
    ];

    const [activeSlots, setActiveSlots] = useState(INITIAL_YARD_DATA);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isBooked, setIsBooked] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);

    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleBooking = async () => {
        if (!user) { alert('Please login to book a yard.'); navigate('/login'); return; }
        if (!selectedSlot) { alert('Please select a yard slot first.'); return; }

        const slot = activeSlots.find(s => s.id === selectedSlot);
        const bookingData = {
            booking_date: new Date(currentYear, today.getMonth(), selectedDate).toISOString(),
            time_slot: 'Full Day',
            areaSize: parseFloat(slot.area)
        };

        setBookingLoading(true);
        const res = await authorizedFetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData)
        });
        setBookingLoading(false);

        if (res.success) {
            setIsBooked(true);
            setTimeout(() => setIsBooked(false), 6000);
        } else {
            alert('Booking failed: ' + (res.message || 'Unknown error'));
        }
    };

    return (
        <div className="booking-page-bg" style={{ padding: '80px 0' }}>
            <div className="container">
                {/* --- HEADER --- */}
                <div className="section-header animate-fade-up">
                    <div className="capacity-indicator shimmer">
                        <Layers size={20} color="var(--primary)" />
                        <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.9rem' }}>TOTAL FACILITY CAPACITY: 2.0 ACRES</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-2px', marginBottom: '24px' }}>
                        Premium <span style={{ color: 'var(--primary)' }}>Yard Selection</span>
                    </h1>
                    <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                        Secure a specialized drying zone at our ISO-certified mill. Our 2-acre facility ensures optimal spacing for quality results.
                    </p>
                </div>

                {isBooked && (
                    <div className="animate-fade-up shimmer" style={{ background: 'var(--primary)', color: 'white', padding: '24px', borderRadius: '16px', textAlign: 'center', marginBottom: '40px', boxShadow: '0 20px 40px rgba(46, 125, 50, 0.2)', fontWeight: 700 }}>
                        <CheckCircle size={28} style={{ verticalAlign: 'middle', marginRight: '12px' }} />
                        RESERVATION CONFIRMED: {activeSlots.find(s => s.id === selectedSlot)?.name} for {currentMonth} {selectedDate}!
                    </div>
                )}

                <div className="booking-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '60px', alignItems: 'start' }}>

                    {/* --- CALENDAR WIDGET --- */}
                    <div className="calendar-widget animate-fade-up" style={{ padding: '40px', borderRadius: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{currentMonth}</h3>
                                <p style={{ color: '#888', fontSize: '0.9rem' }}>{currentYear} Traditional Cycle</p>
                            </div>
                            <div style={{ padding: '12px', background: 'white', borderRadius: '14px', boxShadow: 'var(--shadow-sm)' }}>
                                <Calendar size={24} color="var(--primary)" />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', textAlign: 'center' }}>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                <div key={d} style={{ fontSize: '0.8rem', fontWeight: 800, color: '#AAA', paddingBottom: '16px' }}>{d}</div>
                            ))}
                            {calendarDays.map(date => {
                                const isPast = date < today.getDate();
                                const isSelected = selectedDate === date;
                                return (
                                    <div
                                        key={date}
                                        onClick={() => !isPast && setSelectedDate(date)}
                                        className={`calendar-day ${isSelected ? 'active' : ''}`}
                                        style={{
                                            aspectRatio: '1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '14px',
                                            cursor: isPast ? 'default' : 'pointer',
                                            fontSize: '1rem',
                                            fontWeight: isSelected ? 800 : 600,
                                            background: isSelected ? 'var(--primary)' : (isPast ? 'transparent' : 'white'),
                                            color: isSelected ? 'white' : (isPast ? '#EEE' : '#444'),
                                            border: isSelected ? 'none' : '1px solid rgba(0,0,0,0.03)',
                                            boxShadow: isSelected ? '0 8px 16px rgba(46, 125, 50, 0.3)' : 'none',
                                            opacity: isPast ? 0.4 : 1
                                        }}
                                    >
                                        {date}
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ marginTop: '48px', padding: '24px', borderRadius: '20px', background: 'var(--primary-glow)', border: '1px solid rgba(46, 125, 50, 0.1)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--primary)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Clock size={24} style={{ margin: 'auto' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--primary-dark)', fontWeight: 700, textTransform: 'uppercase' }}>Selected Window</p>
                                <p style={{ fontSize: '1.2rem', fontWeight: 800 }}>{selectedDate} {currentMonth}, {currentYear}</p>
                            </div>
                        </div>
                    </div>

                    {/* --- SLOTS SECTION --- */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Available Zones</h3>
                            <span style={{ fontSize: '0.9rem', color: '#888' }}>{activeSlots.filter(s => s.status === 'Available').length} Options</span>
                        </div>

                        {activeSlots.map((slot) => {
                            const isSelected = selectedSlot === slot.id;
                            const isBookedSlot = slot.status === 'Booked';
                            return (
                                <div
                                    key={slot.id}
                                    onClick={() => !isBookedSlot && setSelectedSlot(slot.id)}
                                    className={`slot-selection-card animate-fade-up ${isSelected ? 'selected' : ''} ${isBookedSlot ? 'booked' : ''}`}
                                    style={{
                                        padding: '32px',
                                        background: 'white',
                                        borderRadius: '24px',
                                        cursor: isBookedSlot ? 'default' : 'pointer',
                                        boxShadow: isSelected ? '0 15px 30px rgba(0,0,0,0.08)' : '0 4px 6px rgba(0,0,0,0.02)',
                                        border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(0,0,0,0.03)',
                                        position: 'relative',
                                        transition: 'all 0.4s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                <h4 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{slot.name}</h4>
                                                <span className="acre-badge">{slot.area}</span>
                                            </div>
                                            <p style={{ fontSize: '0.95rem', color: '#777', lineHeight: 1.5 }}>{slot.desc}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                                            <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.6rem' }}>₹{slot.price}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', fontWeight: 700 }}>Daily Rate</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {isBookedSlot ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E53935', fontSize: '0.85rem', fontWeight: 700 }}>
                                                    <XCircle size={16} /> Fully Occupied
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4CAF50', fontSize: '0.85rem', fontWeight: 700 }}>
                                                    <CheckCircle size={16} /> Ready to Book
                                                </div>
                                            )}
                                        </div>
                                        {isSelected && <div style={{ background: 'var(--primary)', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>PRESELECTED</div>}
                                    </div>
                                </div>
                            );
                        })}

                        <button
                            onClick={handleBooking}
                            className="btn btn-primary shimmer"
                            style={{
                                width: '100%',
                                marginTop: '20px',
                                padding: '24px',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                borderRadius: '20px'
                            }}
                            disabled={!selectedSlot || bookingLoading}
                        >
                            {bookingLoading ? 'Submitting...' : <>Confirm Selection <ArrowRight size={22} /></>}
                        </button>
                        {isBooked && (
                            <div style={{ marginTop: '16px', background: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <CheckCircle size={24} color="#2E7D32" />
                                <div>
                                    <p style={{ fontWeight: 800, color: '#2E7D32' }}>Booking Submitted!</p>
                                    <p style={{ fontSize: '0.85rem', color: '#388E3C' }}>Your yard reservation is pending admin approval. Check your profile for updates.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
