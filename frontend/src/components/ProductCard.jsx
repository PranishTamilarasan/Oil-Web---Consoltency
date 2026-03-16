import React, { useState } from 'react';

const ProductCard = ({ product, onAdd }) => {
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(product.sizes?.[0] || 'Standard');

    const handleAdd = () => {
        onAdd({ ...product, quantity: qty, selectedSize: size });
    };

    return (
        <div className="product-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="product-img-box" style={{ overflow: 'hidden', height: '200px' }}>
                <img src={product.image_url || product.image || product.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={product.product_name || product.name} />
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary)', background: 'rgba(46, 125, 50, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>{product.category}</span>
                    {((product.stock_quantity || product.stock) <= 5 && (product.stock_quantity || product.stock) > 0) && <span style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 700 }}>Only {product.stock_quantity || product.stock} left</span>}
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{product.product_name || product.name}</h3>

                <div className="data-card" style={{ padding: '12px', background: '#F9FBF9', border: 'none', marginBottom: '16px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.4, marginBottom: '8px' }}>{product.description || product.desc}</p>
                    <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--primary)' }}>
                        {(product.benefits || []).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Select Size:</label>
                        <select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #DDD', fontSize: '0.85rem' }}
                        >
                            {(product.sizes || ['Standard']).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <p style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '20px' }}>₹{product.price}.00</p>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #DDD', borderRadius: '8px', overflow: 'hidden' }}>
                        <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer' }}>-</button>
                        <input
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                            style={{ width: '40px', textAlign: 'center', border: 'none', fontSize: '0.9rem', outline: 'none' }}
                        />
                        <button onClick={() => setQty(Math.min(product.stock || 99, qty + 1))} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
                    </div>
                    <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleAdd}>Add to Cart</button>
                </div>
                {qty >= 10 && <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '8px', fontWeight: 600 }}>Bulk order pricing may apply</p>}
            </div>
        </div>
    );
};

export default ProductCard;
