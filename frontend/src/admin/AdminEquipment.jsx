import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

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

const AdminEquipment = () => {
    const [fleet, setFleet] = useState(INITIAL_RENTALS);

    useEffect(() => {
        const fetchFleet = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                if (res.ok) {
                    const rentalItems = data.filter(item => item.itemType === 'rental');
                    if (rentalItems.length > 0) setFleet(rentalItems);
                }
            } catch (e) { console.error('Failed to fetch fleet'); }
        };
        fetchFleet();
    }, []);

    return (
        <div className="data-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <h3>Fleet Management</h3>
                <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}><Plus size={16} /> Register Asset</button>
            </div>
            <table className="standard-table">
                <thead><tr><th>Asset Code</th><th>Machinery</th><th>Rate</th><th>Status</th></tr></thead>
                <tbody>
                    {fleet.map(r => (
                        <tr key={r._id || r.id}>
                            <td>#EQ-{r.id || r._id.slice(-4).toUpperCase()}</td>
                            <td style={{ fontWeight: 700 }}>{r.name}</td>
                            <td>₹{r.price}/{r.rentalPeriod || r.type}</td>
                            <td><span style={{ color: (r.status || 'Available') === 'Available' ? 'green' : 'orange', fontWeight: 800 }}>{r.status || 'Available'}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminEquipment;
