import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminInventory = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editStock, setEditStock] = useState({}); // { [productId]: newStockValue }
    const [newProduct, setNewProduct] = useState({ product_name: '', category: '', description: '', price: '', stock_quantity: '', image_url: '', sizes: '', benefits: '' });
    const [saving, setSaving] = useState(false);
    const { authorizedFetch } = useAuth();

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        if (res.ok) setProducts(data);
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setSaving(true);
        const payload = {
            ...newProduct,
            price: Number(newProduct.price),
            stock_quantity: Number(newProduct.stock_quantity),
            sizes: newProduct.sizes.split(',').map(s => s.trim()).filter(Boolean),
            benefits: newProduct.benefits.split(',').map(b => b.trim()).filter(Boolean),
            itemType: 'sale'
        };
        const res = await authorizedFetch('http://localhost:5000/api/products', { method: 'POST', body: JSON.stringify(payload) });
        setSaving(false);
        if (res.success) {
            alert('Product added successfully!');
            setShowModal(false);
            setNewProduct({ product_name: '', category: '', description: '', price: '', stock_quantity: '', image_url: '', sizes: '', benefits: '' });
            fetchProducts();
        } else {
            alert('Error: ' + res.message);
        }
    };

    const handleUpdateStock = async (productId, newStock) => {
        const res = await authorizedFetch(`http://localhost:5000/api/products/${productId}/stock`, {
            method: 'PATCH',
            body: JSON.stringify({ stock_quantity: Number(newStock) })
        });
        if (res.success) {
            alert('Stock updated!');
            fetchProducts();
        } else {
            alert('Error: ' + res.message);
        }
    };

    const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #E0E0E0', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '12px', boxSizing: 'border-box' };

    return (
        <div>
            {/* ADD PRODUCT MODAL */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.4rem' }}>Add New Product</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem' }}>✕</button>
                        </div>
                        <form onSubmit={handleAddProduct}>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Product Name *</label>
                            <input style={inputStyle} placeholder="e.g. Cold Pressed Coconut Oil" value={newProduct.product_name} onChange={e => setNewProduct({ ...newProduct, product_name: e.target.value })} required />
                            <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Category *</label>
                            <input style={inputStyle} placeholder="e.g. Coconut Oils" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} required />
                            <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Description</label>
                            <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' }} placeholder="Short product description..." value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Price (₹) *</label>
                                    <input style={inputStyle} type="number" placeholder="e.g. 350" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Stock Quantity *</label>
                                    <input style={inputStyle} type="number" placeholder="e.g. 50" value={newProduct.stock_quantity} onChange={e => setNewProduct({ ...newProduct, stock_quantity: e.target.value })} required />
                                </div>
                            </div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Image URL</label>
                            <input style={inputStyle} placeholder="/img2.jpg or https://..." value={newProduct.image_url} onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })} />
                            <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Sizes (comma separated)</label>
                            <input style={inputStyle} placeholder="250ml, 500ml, 1L" value={newProduct.sizes} onChange={e => setNewProduct({ ...newProduct, sizes: e.target.value })} />
                            <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Benefits (comma separated)</label>
                            <input style={inputStyle} placeholder="Pure, Organic, Cold Pressed" value={newProduct.benefits} onChange={e => setNewProduct({ ...newProduct, benefits: e.target.value })} />
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', justifyContent: 'center', marginTop: '8px' }} disabled={saving}>
                                {saving ? 'Saving...' : 'Add Product to Store'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="data-card" style={{ overflowX: 'auto' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '32px', gap: '16px' }}>
                    <h3>Product Inventory — {products.length} Items</h3>
                    <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => setShowModal(true)}><Plus size={16} /> Add Product</button>
                </div>
                <table className="standard-table" style={{ minWidth: '700px' }}>
                    <thead><tr><th>ID</th><th>Product</th><th>Category</th><th>Stock</th><th>Price</th><th>Update Stock</th></tr></thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p._id}>
                                <td style={{ fontSize: '0.75rem', color: '#999' }}>#{p._id?.slice(-5).toUpperCase()}</td>
                                <td style={{ fontWeight: 700 }}>{p.product_name}</td>
                                <td style={{ fontSize: '0.8rem', color: '#666' }}>{p.category}</td>
                                <td style={{ color: p.stock_quantity < 15 ? 'red' : 'green', fontWeight: 700 }}>{p.stock_quantity} units</td>
                                <td>₹{p.price}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="number"
                                            defaultValue={p.stock_quantity}
                                            onChange={e => setEditStock({ ...editStock, [p._id]: e.target.value })}
                                            style={{ width: '70px', padding: '6px 8px', border: '1px solid #DDD', borderRadius: '6px', fontSize: '0.85rem' }}
                                        />
                                        <button
                                            onClick={() => handleUpdateStock(p._id, editStock[p._id] ?? p.stock_quantity)}
                                            style={{ padding: '6px 12px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                                        >Save</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No products in database. Add your first product above.</p>}
            </div>
        </div>
    );
};

export default AdminInventory;
