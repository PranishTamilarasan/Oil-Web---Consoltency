import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('oilMillCart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
                localStorage.removeItem('oilMillCart');
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('oilMillCart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('oilMillCart');
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                item => (item._id || item.id) === (product._id || product.id)
            );
            
            if (existingItemIndex >= 0) {
                // Update existing item
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + (product.quantity || 1)
                };
                return updatedCart;
            } else {
                // Add new item
                return [...prevCart, { ...product, quantity: product.quantity || 1 }];
            }
        });
    };

    const removeFromCart = (index) => {
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
    };

    const updateQuantity = (index, quantity) => {
        if (quantity <= 0) {
            removeFromCart(index);
        } else {
            setCart(prevCart => {
                const updatedCart = [...prevCart];
                updatedCart[index] = { ...updatedCart[index], quantity };
                return updatedCart;
            });
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((acc, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 1;
            return acc + (price * quantity);
        }, 0);
    };

    const getCartCount = () => {
        return cart.reduce((acc, item) => acc + (parseInt(item.quantity) || 1), 0);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
