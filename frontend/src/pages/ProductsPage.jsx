import React, { useState, useEffect } from 'react';
import { Archive } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const INITIAL_PRODUCTS = [
    {
        _id: '1',
        product_name: 'Cold Pressed Coconut Oil (With Sulphur)',
        category: 'Coconut Oils',
        description: 'Traditional wood-pressed coconut oil infused with purified sulphur for scalp therapy.',
        price: 180,
        stock_quantity: 50,
        image_url: '/img2.jpg',
        sizes: ['250ml', '500ml', '1L'],
        benefits: ['Reduces Dandruff', 'Scalp Care'],
        itemType: 'sale'
    },
    {
        _id: '2',
        product_name: 'Cold Pressed Coconut Oil (Without Sulphur)',
        category: 'Coconut Oils',
        description: '100% pure virgin wood-pressed coconut oil for cooking and body care.',
        price: 420,
        stock_quantity: 60,
        image_url: '/img3.jpg',
        sizes: ['500ml', '1L', '5L'],
        benefits: ['Purity Guaranteed', 'Multi-purpose'],
        itemType: 'sale'
    },
    {
        _id: '3',
        product_name: 'Baby Coconut Oil',
        category: 'Personal Care',
        description: 'Ultra-mild filtered coconut oil for delicate baby skin.',
        price: 220,
        stock_quantity: 30,
        image_url: '/img10.jpg',
        sizes: ['100ml', '200ml'],
        benefits: ['Skin Friendly', 'No Additives'],
        itemType: 'sale'
    },
    {
        _id: '4',
        product_name: 'Coconut Shell Bird Nest',
        category: 'Eco Products',
        description: 'Sustainable coconut shell bird feeders and nests.',
        price: 149,
        stock_quantity: 40,
        image_url: '/img6.jpeg',
        sizes: ['Small', 'Medium'],
        benefits: ['Eco Friendly', 'Handcrafted'],
        itemType: 'sale'
    },
    {
        _id: '5',
        product_name: 'Coconut Shell Bowl',
        category: 'Kitchenware',
        description: 'Polished shell bowls for organic dining experience.',
        price: 120,
        stock_quantity: 25,
        image_url: '/img7.jpg',
        sizes: ['Medium'],
        benefits: ['Unique Texture', 'Food Safe'],
        itemType: 'sale'
    },
    {
        _id: '6',
        product_name: 'Coconut Shell Bulk (Wholesale)',
        category: 'Industrial',
        description: 'Raw coconut shells in bulk for industrial use or large-scale crafting.',
        price: 500,
        stock_quantity: 100,
        image_url: '/img11.jpg',
        sizes: ['10kg', '50kg'],
        benefits: ['Bulk Savings', 'Industrial Grade'],
        itemType: 'sale'
    }
];

const ProductsPage = ({ onAdd }) => {
    const [category, setCategory] = useState('All');
    const [products, setProducts] = useState(INITIAL_PRODUCTS);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                if (res.ok && data.length > 0) setProducts(data);
            } catch (e) { console.error('Failed to fetch products'); }
        };
        fetchProducts();
    }, []);

    const categories = ['All', 'Coconut Oils', 'Hair & Skin Oils', 'Kitchen Shell Products', 'Home Decor', 'Eco & Industrial Products'];

    const filteredProducts = category === 'All'
        ? products
        : products.filter(p => p.category === category);

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            {/* --- PREMIUM PRODUCT HEADER --- */}
            <div className="glass-card animate-fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', marginBottom: '80px', background: 'linear-gradient(135deg, #F5F0E6 0%, #FFFFFF 100%)', border: '1px solid rgba(46, 125, 50, 0.1)' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}><Archive size={16} /> Artisan Store</div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>The Traditional <span style={{ color: 'var(--primary)' }}>Collective</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Straight from our traditional mill to your home — enjoy the authentic purity of cold-pressed oils and handcrafted coconut shell creations.</p>
                </div>
                <div style={{ width: '280px', height: '200px', borderRadius: '16px', background: 'url(/img1.webp) center/cover', flexShrink: 0 }}></div>
            </div>

            <div style={{ marginBottom: '60px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                {filteredProducts.map(p => (
                    <ProductCard key={p._id || p.id} product={p} onAdd={onAdd} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <p style={{ color: '#999' }}>Coming soon: New products arriving in this category.</p>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
