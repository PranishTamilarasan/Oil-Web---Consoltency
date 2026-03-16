import React, { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';

const INITIAL_RENTALS = [
    {
        id: 101,
        name: 'Industrial Drying Mats',
        price: 50,
        type: 'Day',
        status: 'Available',
        category: 'Drying',
        specs: { material: 'Heavy Duty HDPE', size: '10x10 ft', durability: 'High' },
        desc: 'Premium quality mats designed for optimal copra sun-drying. Heat resistant and easy to clean.'
    },
    {
        id: 102,
        name: 'Coconut Cutting Machine',
        price: 800,
        type: 'Day',
        status: 'Available',
        category: 'Processing',
        specs: { power: '2HP Electric', capacity: '300 units/hr', safety: 'Covered Blade' },
        desc: 'Efficient semi-automatic machine for precise coconut splitting and preparation.'
    }
];

const RentalPage = () => {
    const [rentals, setRentals] = useState(INITIAL_RENTALS);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                if (res.ok) {
                    const rentalItems = data.filter(item => item.itemType === 'rental');
                    if (rentalItems.length > 0) setRentals(rentalItems);
                }
            } catch (e) { console.error('Failed to fetch rentals'); }
        };
        fetchRentals();
    }, []);

    return (
        <div style={{ background: '#F4F7F4', minHeight: '100vh' }}>
            {/* --- RENTAL HERO --- */}
            <div style={{ background: 'linear-gradient(rgba(46, 125, 50, 0.9), rgba(27, 94, 32, 0.9))', padding: '120px 0', textAlign: 'center', color: 'white', marginBottom: '60px' }}>
                <div className="container">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(255,255,255,0.2)', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '24px' }}>
                        <Truck size={16} /> ESSENTIAL MILLING TOOLS
                    </div>
                    <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 800, letterSpacing: '-3px', marginBottom: '16px' }}>Mill <span style={{ color: 'var(--accent)' }}>Equipment</span></h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.25rem', opacity: 0.9 }}>Reliable equipment for your copra processing and drying needs.</p>
                </div>
            </div>

            <div className="container">
                {/* --- EQUIPMENT GRID --- */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', paddingBottom: '100px' }}>
                    {rentals.map(r => (
                        <div key={r._id || r.id} className="data-card animate-fade-up" style={{ border: '1px solid rgba(46, 125, 50, 0.1)', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', background: 'rgba(46, 125, 50, 0.1)', padding: '4px 12px', borderRadius: '100px' }}>{r.category}</span>
                                    <h3 style={{ fontSize: '1.8rem', marginTop: '12px' }}>{r.name}</h3>
                                </div>
                                <div style={{ background: '#4CAF50', color: 'white', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>
                                    {r.status || 'Available'}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                                {Object.entries(r.specs || {}).map(([key, value]) => (
                                    <div key={key} style={{ background: '#F8F9F8', padding: '12px', borderRadius: '14px', textAlign: 'center', border: '1px solid #F0F0F0' }}>
                                        <p style={{ fontSize: '0.65rem', color: '#999', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>{key}</p>
                                        <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>{value}</p>
                                    </div>
                                ))}
                            </div>

                            <p style={{ fontSize: '1rem', color: '#666', marginBottom: '32px', lineHeight: 1.6 }}>{r.description || r.desc}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #F0F0F0' }}>
                                <div>
                                    <p style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)' }}>₹{r.price}<span style={{ fontSize: '1rem', opacity: 0.5, fontWeight: 500 }}>/{r.rentalPeriod || r.type}</span></p>
                                </div>
                                <button className="btn btn-primary" style={{ padding: '14px 32px' }}>Reserve Equipment</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RentalPage;
