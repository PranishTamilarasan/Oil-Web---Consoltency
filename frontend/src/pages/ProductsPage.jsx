import React, { useState, useEffect } from 'react';
import { ShoppingCart, Filter, Search, Star, Package } from 'lucide-react';

const ProductsPage = ({ onAdd }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    const categories = ['all', 'coconut-oil', 'virgin-oil', 'specialty-oils'];

    useEffect(() => {
        // Mock products data - in real app, fetch from API
        const mockProducts = [
            {
                id: 1,
                name: "Premium Coconut Oil",
                category: "coconut-oil",
                price: 299,
                image: "/img1.webp",
                rating: 4.5,
                description: "Cold-pressed pure coconut oil from fresh coconuts",
                stock: 50,
                sizes: ["500ml", "1L", "2L"],
                benefits: ["Heart healthy", "Rich in MCTs", "Organic"]
            },
            {
                id: 2,
                name: "Organic Virgin Oil",
                category: "virgin-oil",
                price: 399,
                image: "/img10.jpg",
                rating: 4.8,
                description: "100% organic virgin coconut oil, first press only",
                stock: 30,
                sizes: ["250ml", "500ml", "1L"],
                benefits: ["Cold pressed", "No additives", "Certified organic"]
            },
            {
                id: 3,
                name: "Traditional Mill Oil",
                category: "coconut-oil",
                price: 249,
                image: "/img11.jpg",
                rating: 4.3,
                description: "Traditional wood-pressed coconut oil",
                stock: 75,
                sizes: ["1L", "2L", "5L"],
                benefits: ["Traditional method", "Wood pressed", "Authentic taste"]
            },
            {
                id: 4,
                name: "Extra Virgin Coconut Oil",
                category: "virgin-oil",
                price: 499,
                image: "/img1.webp",
                rating: 4.9,
                description: "Premium extra virgin coconut oil with maximum nutrients",
                stock: 20,
                sizes: ["250ml", "500ml"],
                benefits: ["Extra virgin", "Maximum nutrients", "Premium quality"]
            },
            {
                id: 5,
                name: "Specialty Blend Oil",
                category: "specialty-oils",
                price: 599,
                image: "/img10.jpg",
                rating: 4.7,
                description: "Special blend of coconut oil with herbs",
                stock: 15,
                sizes: ["500ml", "1L"],
                benefits: ["Herbal infusion", "Therapeutic", "Ayurvedic"]
            },
            {
                id: 6,
                name: "Cold Pressed Coconut Oil",
                category: "coconut-oil",
                price: 349,
                image: "/img11.jpg",
                rating: 4.6,
                description: "Mechanically cold-pressed for maximum purity",
                stock: 40,
                sizes: ["1L", "2L"],
                benefits: ["Cold pressed", "High purity", "Nutrient rich"]
            }
        ];

        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
    }, []);

    useEffect(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [products, selectedCategory, searchTerm]);

    const ProductCard = ({ product }) => (
        <div style={{
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
        }}>
            <div style={{ height: '200px', background: `url(${product.image}) center/cover`, position: 'relative' }}>
                {product.stock < 25 && (
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
                        Low Stock
                    </div>
                )}
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} style={{ color: '#FFA500' }} fill="#FFA500" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{product.rating}</span>
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
                        {product.category.replace('-', ' ')}
                    </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{product.name}</h3>
                <p style={{ color: '#666', marginBottom: '16px', fontSize: '0.9rem', lineHeight: 1.5 }}>{product.description}</p>
                
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>Available sizes:</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {product.sizes.map((size, index) => (
                            <span key={index} style={{
                                background: '#F3F4F6',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }}>
                                {size}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>Benefits:</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {product.benefits.slice(0, 2).map((benefit, index) => (
                            <span key={index} style={{
                                background: '#10B98115',
                                color: '#10B981',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }}>
                                {benefit}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                    <div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>₹{product.price}</span>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '2px' }}>
                            Stock: {product.stock} units
                        </div>
                    </div>
                    <button
                        onClick={() => onAdd(product)}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            padding: '12px 20px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'background 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'var(--primary-glow)'}
                        onMouseOut={(e) => e.target.style.background = 'var(--primary)'}
                    >
                        <ShoppingCart size={16} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <Package size={48} style={{ color: 'var(--primary)', margin: '0 auto 20px' }} />
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading products...</p>
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
                        Our Products
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Discover our range of premium coconut oils, all produced with traditional methods and modern quality standards
                    </p>
                </div>

                {/* Filters */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '300px' }}>
                            <Search size={20} style={{ color: '#666' }} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <Filter size={20} style={{ color: '#666' }} />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{
                                    padding: '12px 16px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '1rem', color: '#666' }}>
                        Showing {filteredProducts.length} of {products.length} products
                    </p>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px' }}>
                        <Package size={48} style={{ color: '#666', margin: '0 auto 20px' }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>No products found</h3>
                        <p style={{ color: '#666', marginBottom: '20px' }}>
                            Try adjusting your search or filter criteria
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                            }}
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
