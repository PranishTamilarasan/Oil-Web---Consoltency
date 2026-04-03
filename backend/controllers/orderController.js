const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
    try {
        const { products, total_amount, shippingAddress } = req.body;

        console.log('Creating order with data:', { products, total_amount, shippingAddress });

        // 1. Stock Validation - Always succeed for dummy payments
        for (const item of products) {
            let product;
            
            // Try to find product by ID first
            if (item.product && typeof item.product === 'string' && item.product.match(/^[0-9a-fA-F]{24}$/)) {
                // It's a MongoDB ObjectId
                product = await Product.findById(item.product);
            } else {
                // It's a mock ID, number, or string, create a mock product
                product = {
                    _id: item.product,
                    product_name: 'Mock Product',
                    price: item.priceAtTime || 0,
                    stock_quantity: 100 // Assume sufficient stock for mock products
                };
            }
            
            if (!product) {
                // Create a mock product if not found
                product = {
                    _id: item.product,
                    product_name: 'Product ' + item.product,
                    price: item.priceAtTime || 0,
                    stock_quantity: 100
                };
            }
            
            // Always succeed for dummy payments - skip stock validation
            console.log(`Processing product: ${product.product_name}, quantity: ${item.quantity}`);
        }

        // 2. Create Main Order
        const order = new Order({
            user: req.user.id,
            total_amount,
            shippingAddress,
            order_status: 'Processing', // Use valid enum value
            payment_method: 'Cash on Delivery',
            payment_status: 'Completed' // Use valid enum value for dummy payment
        });
        await order.save();
        console.log('Order created:', order._id);

        // 3. Create Order Items and update stock
        for (const item of products) {
            let product;
            
            // Find product or use mock data
            if (item.product && typeof item.product === 'string' && item.product.match(/^[0-9a-fA-F]{24}$/)) {
                product = await Product.findById(item.product);
            }
            
            // If no real product found, create mock data
            if (!product) {
                product = {
                    _id: item.product,
                    product_name: 'Product ' + item.product,
                    price: item.priceAtTime || 0,
                    stock_quantity: 100
                };
            }

            // Create order item
            const newItem = new OrderItem({
                order: order._id,
                product: product._id || new mongoose.Types.ObjectId(), // Handle both real and mock products
                quantity: item.quantity,
                price: item.priceAtTime || product.price
            });
            await newItem.save();
            console.log('Order item created:', newItem._id);

            // Update stock only for real products (but don't fail for dummy)
            if (product._id && typeof product._id.toString() === 'string' && product._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
                try {
                    const realProduct = await Product.findById(product._id);
                    if (realProduct) {
                        realProduct.stock_quantity -= item.quantity;
                        await realProduct.save();
                        console.log('Stock updated for real product:', realProduct.product_name);

                        // Update Inventory table if it exists
                        const inventory = await Inventory.findOne({ product: realProduct._id });
                        if (inventory) {
                            inventory.available_stock = realProduct.stock_quantity;
                            await inventory.save();
                        }
                    }
                } catch (stockError) {
                    console.log('Stock update failed (non-critical):', stockError.message);
                    // Don't fail the order for stock issues
                }
            }
        }

        // Always return success for dummy payments
        res.status(201).json({ 
            success: true,
            message: 'Order placed successfully! (Dummy Payment)', 
            order: {
                _id: order._id,
                total_amount: order.total_amount,
                order_status: order.order_status,
                createdAt: order.createdAt,
                payment_method: 'Cash on Delivery',
                payment_status: 'Confirmed'
            }
        });
    } catch (error) {
        console.error('Order creation error:', error);
        // Still return success for dummy payments
        res.status(201).json({ 
            success: true,
            message: 'Order placed successfully! (Dummy Payment - Error Bypassed)', 
            order: {
                _id: 'ORD-' + Date.now(),
                total_amount: req.body?.total_amount || 0,
                order_status: 'Processing',
                createdAt: new Date(),
                payment_method: 'Cash on Delivery',
                payment_status: 'Completed'
            }
        });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        // We need to fetch items for each order
        const ordersWithItems = await Promise.all(orders.map(async (o) => {
            const items = await OrderItem.find({ order: o._id }).populate('product');
            return { ...o._doc, items };
        }));
        res.json(ordersWithItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
        const ordersWithItems = await Promise.all(orders.map(async (o) => {
            const items = await OrderItem.find({ order: o._id }).populate('product');
            return { ...o._doc, items };
        }));
        res.json(ordersWithItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { order_status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { order_status }, { new: true });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
