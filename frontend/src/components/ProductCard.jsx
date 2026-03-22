import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product, onAdd }) => {
    return (
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
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{product.rating || 4.5}</span>
                </div>
            </div>
            <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{product.name}</h3>
                <p style={{ color: '#666', marginBottom: '16px', fontSize: '0.9rem', lineHeight: 1.5 }}>{product.description}</p>
                
                {product.sizes && (
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>Available sizes:</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {product.sizes.slice(0, 2).map((size, index) => (
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
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                    <div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>₹{product.price}</span>
                        {product.stock && (
                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '2px' }}>
                                Stock: {product.stock} units
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => onAdd && onAdd(product)}
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
};

export default ProductCard;
