import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Package, Calendar, ShoppingCart, Star, ChevronRight } from 'lucide-react';

const HomePage = ({ onAdd }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        // Mock featured products - in real app, fetch from API
        setFeaturedProducts([
            {
                id: 1,
                name: "Premium Coconut Oil",
                price: 299,
                image: "/img1.webp",
                rating: 4.5,
                description: "Cold-pressed pure coconut oil"
            },
            {
                id: 2,
                name: "Organic Virgin Oil",
                price: 399,
                image: "/img10.jpg",
                rating: 4.8,
                description: "100% organic virgin coconut oil"
            },
            {
                id: 3,
                name: "Traditional Mill Oil",
                price: 249,
                image: "/img11.jpg",
                rating: 4.3,
                description: "Traditional wood-pressed oil"
            }
        ]);
    }, []);

    const features = [
        {
            icon: <Droplets size={32} />,
            title: "Pure & Natural",
            description: "100% natural coconut oil without additives"
        },
        {
            icon: <Package size={32} />,
            title: "Quality Assured",
            description: "ISO certified production process"
        },
        {
            icon: <Calendar size={32} />,
            title: "Equipment Rental",
            description: "Rent modern oil mill equipment"
        }
    ];

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)',
                color: 'white',
                padding: '80px 20px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url(/img1.webp) center/cover',
                    opacity: 0.1
                }} />
                <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '20px', lineHeight: 1.2 }}>
                        Traditional Oil Mill
                        <br />
                        <span style={{ color: 'var(--accent)' }}>Premium Quality Products</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 40px' }}>
                        Experience the authentic taste of traditional coconut oil production with modern quality standards
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/products" style={{
                            background: 'var(--accent)',
                            color: '#000',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <ShoppingCart size={20} />
                            Shop Products
                        </Link>
                        <Link to="/booking" style={{
                            background: 'transparent',
                            color: 'white',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: '2px solid white',
                            textDecoration: 'none',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Calendar size={20} />
                            Book Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '80px 20px', background: '#F9FBF9' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, marginBottom: '60px' }}>
                        Why Choose Us
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        {features.map((feature, index) => (
                            <div key={index} style={{ textAlign: 'center', padding: '40px 20px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                                <div style={{ color: 'var(--primary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>{feature.title}</h3>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section style={{ padding: '80px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Featured Products</h2>
                        <Link to="/products" style={{
                            color: 'var(--primary)',
                            textDecoration: 'none',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            View All <ChevronRight size={20} />
                        </Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        {featuredProducts.map(product => (
                            <div key={product.id} style={{
                                background: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                transition: 'transform 0.3s ease'
                            }}>
                                <div style={{ height: '200px', background: `url(${product.image}) center/cover`, position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Star size={16} style={{ color: '#FFA500' }} fill="#FFA500" />
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{product.rating}</span>
                                    </div>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{product.name}</h3>
                                    <p style={{ color: '#666', marginBottom: '16px', fontSize: '0.9rem' }}>{product.description}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>₹{product.price}</span>
                                        <button
                                            onClick={() => onAdd(product)}
                                            style={{
                                                background: 'var(--primary)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <ShoppingCart size={16} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-glow) 0%, var(--primary) 100%)',
                padding: '80px 20px',
                textAlign: 'center',
                color: 'white'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>
                        Ready to Experience Quality?
                    </h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}>
                        Join thousands of satisfied customers who trust our traditional oil mill products
                    </p>
                    <Link to="/products" style={{
                        background: 'var(--accent)',
                        color: '#000',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        Start Shopping <ChevronRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
