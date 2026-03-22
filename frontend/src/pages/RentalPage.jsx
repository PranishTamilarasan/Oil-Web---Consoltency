import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Package, Wrench, Star, CheckCircle, AlertCircle, Info } from 'lucide-react';

const RentalPage = () => {
    const [equipment, setEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [bookingData, setBookingData] = useState({
        equipmentId: '',
        name: '',
        email: '',
        phone: '',
        startDate: '',
        endDate: '',
        timeSlot: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const timeSlots = [
        '09:00 AM - 12:00 PM',
        '12:00 PM - 03:00 PM', 
        '03:00 PM - 06:00 PM',
        '06:00 PM - 09:00 PM'
    ];

    useEffect(() => {
        // Mock equipment data - in real app, fetch from API
        const mockEquipment = [
            {
                id: 1,
                name: 'Oil Press Machine',
                category: 'pressing',
                price: 500,
                image: '/img1.webp',
                rating: 4.8,
                description: 'Industrial-grade oil press machine for efficient extraction',
                available: true,
                specifications: ['Capacity: 50kg/hour', 'Power: 5HP', 'Stainless Steel'],
                rentalTerms: ['Minimum 4 hours', 'Security deposit required', 'Operator included']
            },
            {
                id: 2,
                name: 'Coconut Grinder',
                category: 'grinding',
                price: 300,
                image: '/img10.jpg',
                rating: 4.6,
                description: 'Heavy-duty coconut grinder for preprocessing',
                available: true,
                specifications: ['Capacity: 100kg/hour', 'Power: 3HP', 'Commercial grade'],
                rentalTerms: ['Minimum 2 hours', 'Cleaning fee applies', 'Safety gear provided']
            },
            {
                id: 3,
                name: 'Filter Press Unit',
                category: 'filtering',
                price: 400,
                image: '/img11.jpg',
                rating: 4.7,
                description: 'Professional oil filtering and purification system',
                available: false,
                specifications: ['Capacity: 30L/hour', 'Multi-stage filtration', 'Automatic'],
                rentalTerms: ['Minimum 3 hours', 'Technical support', 'Maintenance included']
            },
            {
                id: 4,
                name: 'Packaging Machine',
                category: 'packaging',
                price: 250,
                image: '/img1.webp',
                rating: 4.5,
                description: 'Semi-automatic bottling and packaging equipment',
                available: true,
                specifications: ['Speed: 20 bottles/min', 'Various sizes', 'Sealing included'],
                rentalTerms: ['Minimum 2 hours', 'Materials extra', 'Training provided']
            },
            {
                id: 5,
                name: 'Storage Tanks',
                category: 'storage',
                price: 200,
                image: '/img10.jpg',
                rating: 4.4,
                description: 'Food-grade storage tanks for oil preservation',
                available: true,
                specifications: ['Capacity: 500L', 'Stainless steel', 'Temperature control'],
                rentalTerms: ['Daily rental', 'Cleaning included', 'Quality assured']
            },
            {
                id: 6,
                name: 'Quality Testing Kit',
                category: 'testing',
                price: 150,
                image: '/img11.jpg',
                rating: 4.9,
                description: 'Complete oil quality testing and analysis kit',
                available: true,
                specifications: ['Lab-grade equipment', 'Quick results', 'Expert guidance'],
                rentalTerms: ['Hourly rental', 'Technician available', 'Reports included']
            }
        ];

        setEquipment(mockEquipment);
    }, []);

    const handleEquipmentSelect = (equipmentItem) => {
        setSelectedEquipment(equipmentItem);
        setBookingData({
            ...bookingData,
            equipmentId: equipmentItem.id
        });
        setError('');
    };

    const handleBookingChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        });
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!selectedEquipment) {
            setError('Please select equipment first');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Mock API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate success
            setSuccess(true);
            setBookingData({
                equipmentId: '',
                name: '',
                email: '',
                phone: '',
                startDate: '',
                endDate: '',
                timeSlot: '',
                message: ''
            });
            setSelectedEquipment(null);
        } catch (err) {
            setError('Failed to submit rental request. Please try again.');
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
                        Rental Request Submitted!
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '32px', lineHeight: 1.6 }}>
                        Your equipment rental request has been submitted successfully. We will confirm availability and send payment details within 24 hours.
                    </p>
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
                        Rent Another Equipment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#F9FBF9', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px' }}>
                        Equipment Rental
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Rent professional oil mill equipment by the hour. All equipment maintained to industry standards with expert support.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', alignItems: 'start' }}>
                    {/* Equipment Grid */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>Available Equipment</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                            {equipment.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => item.available && handleEquipmentSelect(item)}
                                    style={{
                                        background: 'white',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        cursor: item.available ? 'pointer' : 'not-allowed',
                                        opacity: item.available ? 1 : 0.6,
                                        border: selectedEquipment?.id === item.id ? '2px solid var(--primary)' : 'none'
                                    }}
                                    onMouseOver={(e) => item.available && (e.currentTarget.style.transform = 'translateY(-4px)')}
                                    onMouseOut={(e) => item.available && (e.currentTarget.style.transform = 'translateY(0)')}
                                >
                                    <div style={{ height: '160px', background: `url(${item.image}) center/cover`, position: 'relative' }}>
                                        {!item.available && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                                background: '#EF4444',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}>
                                                Unavailable
                                            </div>
                                        )}
                                        {selectedEquipment?.id === item.id && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                background: 'var(--primary)',
                                                color: 'white',
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <CheckCircle size={16} />
                                            </div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'white', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Star size={14} style={{ color: '#FFA500' }} fill="#FFA500" />
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.rating}</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{ marginBottom: '8px' }}>
                                            <span style={{
                                                background: 'var(--primary)15',
                                                color: 'var(--primary)',
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                textTransform: 'capitalize'
                                            }}>
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>{item.name}</h3>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '16px', lineHeight: 1.4 }}>{item.description}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)' }}>₹{item.price}/hr</span>
                                            {item.available ? (
                                                <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>Available</span>
                                            ) : (
                                                <span style={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: 600 }}>Unavailable</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div style={{ position: 'sticky', top: '20px' }}>
                        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px' }}>Book Equipment</h2>
                            
                            {!selectedEquipment ? (
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <Package size={48} style={{ color: '#9CA3AF', margin: '0 auto 16px' }} />
                                    <p style={{ color: '#666', fontSize: '0.95rem' }}>
                                        Select equipment from the list to start booking
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div style={{ background: 'var(--primary)15', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                            <Package size={20} style={{ color: 'var(--primary)' }} />
                                            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{selectedEquipment.name}</span>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                            ₹{selectedEquipment.price}/hour • {selectedEquipment.category}
                                        </div>
                                    </div>

                                    {error && (
                                        <div style={{
                                            background: '#FEE2E2',
                                            color: '#B91C1C',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            marginBottom: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            fontSize: '0.9rem'
                                        }}>
                                            <AlertCircle size={16} />
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleBookingSubmit}>
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={bookingData.name}
                                                onChange={handleBookingChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 14px',
                                                    border: '1px solid #E5E7EB',
                                                    borderRadius: '6px',
                                                    fontSize: '0.95rem',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={bookingData.email}
                                                onChange={handleBookingChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 14px',
                                                    border: '1px solid #E5E7EB',
                                                    borderRadius: '6px',
                                                    fontSize: '0.95rem',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={bookingData.phone}
                                                onChange={handleBookingChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 14px',
                                                    border: '1px solid #E5E7EB',
                                                    borderRadius: '6px',
                                                    fontSize: '0.95rem',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>
                                                    <Calendar size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                                                    Start Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    value={bookingData.startDate}
                                                    onChange={handleBookingChange}
                                                    min={minDate}
                                                    required
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px 14px',
                                                        border: '1px solid #E5E7EB',
                                                        borderRadius: '6px',
                                                        fontSize: '0.95rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>
                                                    End Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={bookingData.endDate}
                                                    onChange={handleBookingChange}
                                                    min={bookingData.startDate || minDate}
                                                    required
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px 14px',
                                                        border: '1px solid #E5E7EB',
                                                        borderRadius: '6px',
                                                        fontSize: '0.95rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>
                                                <Clock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                                                Time Slot
                                            </label>
                                            <select
                                                name="timeSlot"
                                                value={bookingData.timeSlot}
                                                onChange={handleBookingChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 14px',
                                                    border: '1px solid #E5E7EB',
                                                    borderRadius: '6px',
                                                    fontSize: '0.95rem',
                                                    outline: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <option value="">Select time slot</option>
                                                {timeSlots.map(slot => (
                                                    <option key={slot} value={slot}>{slot}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>
                                                Message (Optional)
                                            </label>
                                            <textarea
                                                name="message"
                                                value={bookingData.message}
                                                onChange={handleBookingChange}
                                                rows={3}
                                                placeholder="Special requirements..."
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 14px',
                                                    border: '1px solid #E5E7EB',
                                                    borderRadius: '6px',
                                                    fontSize: '0.95rem',
                                                    outline: 'none',
                                                    resize: 'vertical'
                                                }}
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
                                                padding: '14px',
                                                borderRadius: '8px',
                                                fontSize: '1rem',
                                                fontWeight: 700,
                                                cursor: loading ? 'not-allowed' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            {loading ? (
                                                <>
                                                    <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                                    Processing...
                                                </>
                                            ) : (
                                                'Submit Rental Request'
                                            )}
                                        </button>
                                    </form>

                                    {selectedEquipment.rentalTerms && (
                                        <div style={{ marginTop: '24px', padding: '16px', background: '#F9FBF9', borderRadius: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                                <Info size={16} style={{ color: 'var(--primary)' }} />
                                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>Rental Terms</span>
                                            </div>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {selectedEquipment.rentalTerms.map((term, index) => (
                                                    <li key={index} style={{ fontSize: '0.85rem', color: '#666', marginBottom: '6px', paddingLeft: '16px', position: 'relative' }}>
                                                        <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>•</span>
                                                        {term}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            )}
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

export default RentalPage;
