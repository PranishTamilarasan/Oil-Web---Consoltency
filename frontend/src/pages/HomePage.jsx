import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const HomePage = ({ onAdd }) => (
    <>
        <header className="hero-split">
            <div className="hero-image-full animate-scale-in" style={{ background: 'url(/img1.webp) center/contain no-repeat', backgroundColor: '#F9FBF9' }}></div>
            <div className="hero-content animate-fade-up">
                <div className="hero-text-inner">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(46, 125, 50, 0.1)', borderRadius: '100px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '24px' }}><Check size={16} /> ISO 9001:2015 CERTIFIED NATURAL MILLED OIL</div>
                    <h1 style={{ letterSpacing: '-0.03em' }}>Pure Essence of <span style={{ color: 'var(--primary)', position: 'relative' }}>Tradition</span>.</h1>
                    <p>Straight from our traditional mill to your home — enjoy the authentic purity of cold-pressed oils and handcrafted coconut shell creations.</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        <Link to="/products" className="btn btn-primary" style={{ padding: '16px 32px' }}>Explore products <ArrowRight size={18} /></Link>
                        <Link to="/login" className="btn btn-outline" style={{ padding: '16px 32px', borderColor: '#E0E0E0', color: '#333' }}>Mill Portal Access</Link>
                    </div>
                </div>
            </div>
        </header>

        <section style={{ background: 'var(--bg-sub)', padding: '120px 0' }}>
            <div className="container">
                <div className="section-header animate-fade-up">
                    <h2 style={{ fontSize: '3rem' }}>The Extraction Journey</h2>
                    <p>Honoring the age-old traditions of Kangeyam to bring you pure, cold-pressed excellence.</p>
                </div>
                <div className="process-grid">
                    {[
                        { s: 'Harvesting', d: 'Premium mature coconuts sourced from the finest groves of Tamil Nadu.', i: '01' },
                        { s: 'Sun-Drying', d: 'Natural conversion to copra in our precisely managed drying yards.', i: '02' },
                        { s: 'Extraction', d: 'Traditional cold-pressing without heat to retain nutrients.', i: '03' },
                        { s: 'Quality Seal', d: 'Triple-filtration process ensuring 100% purity and shelf-life.', i: '04' }
                    ].map((p, i) => (
                        <div key={i} className={`process-step animate-fade-up delay-${i + 1}`}>
                            <div className="step-icon">{p.i}</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{p.s}</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.d}</p>
                            {i < 3 && (
                                <div className="connector-arrow">
                                    <ArrowRight size={32} strokeWidth={1} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>

    </>
);

export default HomePage;
