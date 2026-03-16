import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => (
    <footer style={{ background: '#1A1A1A', color: '#FFF', padding: '80px 0 40px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '60px' }}>
            <div>
                <h2 style={{ color: '#FFF', marginBottom: '24px' }}>SHRI THIRUMURUGAN</h2>
                <p style={{ color: '#999', lineHeight: '1.8' }}>Premium traditional oil production and supporting farm services since 1985. Committed to purity and natural standards.</p>
            </div>
            <div>
                <h4 style={{ marginBottom: '24px' }}>Modules</h4>
                <ul style={{ listStyle: 'none', color: '#999', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li><Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Oil Products</Link></li>
                    <li><Link to="/booking" style={{ color: 'inherit', textDecoration: 'none' }}>Drying Yards</Link></li>
                    <li><Link to="/rental" style={{ color: 'inherit', textDecoration: 'none' }}>Equipment Rental</Link></li>
                </ul>
            </div>
            <div>
                <h4 style={{ marginBottom: '24px' }}>Help & Support</h4>
                <ul style={{ listStyle: 'none', color: '#999', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>Privacy Policy</li>
                    <li>Orders Tracking</li>
                    <li>Customer Support</li>
                </ul>
            </div>
            <div>
                <h4 style={{ marginBottom: '24px' }}>Factory Location</h4>
                <p style={{ color: '#999', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><MapPin size={18} style={{ flexShrink: 0, marginTop: '4px' }} /> 17/33, M.P.M NAGAR, KANGEYAM, Tiruppur, Tamil Nadu, 638701</p>
                <p style={{ color: '#999', margin: '12px 0' }}><Phone size={18} /> +91 98765 43210</p>
                <p style={{ color: '#999' }}><Mail size={18} /> contact@shrithirumuruganoilmill.com</p>
            </div>
        </div>
        <div className="container" style={{ borderTop: '1px solid #333', paddingTop: '40px', textAlign: 'center', color: '#555', fontSize: '0.9rem' }}>
            &copy; 2026 Shri Thirumurugan Oil Mill. All rights reserved. Professional Academic Prototype.
        </div>
    </footer>
);

export default Footer;
