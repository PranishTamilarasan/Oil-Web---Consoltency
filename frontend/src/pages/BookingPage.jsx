import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle } from 'lucide-react';

const BookingPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        timeSlot: '',
        areaSize: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const timeSlots = [
        '09:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '02:00 PM - 03:00 PM',
        '03:00 PM - 04:00 PM',
        '04:00 PM - 05:00 PM'
    ];

    const areaSizes = [
        { label: 'Small (100-500 sq ft)', value: 'small' },
        { label: 'Medium (500-1000 sq ft)', value: 'medium' },
        { label: 'Large (1000-2000 sq ft)', value: 'large' },
        { label: 'Extra Large (2000+ sq ft)', value: 'xlarge' }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Mock API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate success
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                timeSlot: '',
                areaSize: '',
                message: ''
            });
        } catch (err) {
            setError('Failed to submit booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Get tomorrow's date as minimum booking date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    if (success) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
                <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                    <div style={{ background: '#10B98115', color: '#10B981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <CheckCircle size={40} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '16px', color: '#10B981' }}>
                        Booking Successful!
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '32px', lineHeight: 1.6 }}>
                        Your yard booking has been submitted successfully. We will review your request and confirm within 24 hours.
                    </p>
                    <div style={{ background: '#F9FBF9', padding: '24px', borderRadius: '12px', marginBottom: '32px', textAlign: 'left' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>What happens next?</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ width: '24px', height: '24px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>1</div>
                                <span style={{ color: '#666' }}>Our team reviews your booking request</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ width: '24px', height: '24px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', 'alignItems': 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>2</div>
                                <span style={{ color: '#666' }}>You'll receive confirmation via email</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '24px', height: '24px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>3</div>
                                <span style={{ color: '#666' }}>Visit us at your scheduled time</span>
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() => setSuccess(false)}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Book Another Slot
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#F9FBF9', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px' }}>
                        Book Mill Yard Space
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Reserve our traditional oil mill yard space for your processing needs. Professional facilities with modern equipment.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
                    {/* Booking Form */}
                    <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '32px' }}>Reservation Details</h2>
                        
                        {error && (
                            <div style={{
                                background: '#FEE2E2',
                                color: '#B91C1C',
                                padding: '16px',
                                borderRadius: '8px',
                                marginBottom: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <AlertCircle size={20} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                                        Full Name
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px 12px 12px 40px',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '8px',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.3s ease'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                                        <Calendar size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                                        Booking Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        min={minDate}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                                        <Clock size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                                        Time Slot
                                    </label>
                                    <select
                                        name="timeSlot"
                                        value={formData.timeSlot}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                    >
                                        <option value="">Select time slot</option>
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                                    <MapPin size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                                    Area Size Required
                                </label>
                                <select
                                    name="areaSize"
                                    value={formData.areaSize}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                >
                                    <option value="">Select area size</option>
                                    {areaSizes.map(size => (
                                        <option key={size.value} value={size.value}>{size.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                                    Additional Message (Optional)
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Any special requirements or questions..."
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease',
                                        resize: 'vertical'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    background: loading ? '#9CA3AF' : 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                {loading ? (
                                    <>
                                        <div style={{ width: '20px', height: '20px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                        Processing...
                                    </>
                                ) : (
                                    'Submit Booking Request'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Info Section */}
                    <div>
                        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>Facility Features</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    'Traditional oil processing equipment',
                                    'Modern hygiene standards',
                                    'Expert staff assistance',
                                    'Quality testing facilities',
                                    'Storage space for raw materials',
                                    'Loading and unloading area'
                                ].map((feature, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '24px', height: '24px', background: 'var(--primary)15', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <CheckCircle size={14} />
                                        </div>
                                        <span style={{ color: '#374151', fontSize: '0.95rem' }}>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ background: 'var(--primary)15', padding: '32px', borderRadius: '16px', border: '2px solid var(--primary)' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary)' }}>
                                Booking Guidelines
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#374151' }}>
                                <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>•</span>
                                    Bookings must be made at least 24 hours in advance
                                </li>
                                <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>•</span>
                                    Each time slot is limited to one booking
                                </li>
                                <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>•</span>
                                    Cancellations must be made 12 hours before
                                </li>
                                <li style={{ paddingLeft: '20px', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>•</span>
                                    Staff assistance available during business hours
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default BookingPage;
