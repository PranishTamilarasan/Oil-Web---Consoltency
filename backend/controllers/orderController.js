const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

exports.createOrder = async (req, res) => {
    try {
        const { products, total_amount, shippingAddress } = req.body;

        // 1. Stock Validation
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).json({ message: `Product ${item.product} not found` });
            if (product.stock_quantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.product_name}` });
            }
        }

        // 2. Create Main Order
        const order = new Order({
            user: req.user.id,
            total_amount,
            shippingAddress
        });
        await order.save();

        // 3. Create Order Items and Deduct Stock
        for (const item of products) {
            const product = await Product.findById(item.product);

            // Create item
            const newItem = new OrderItem({
                order: order._id,
                product: product._id,
                quantity: item.quantity,
                price: item.priceAtTime || product.price
            });
            await newItem.save();

            // Deduct stock from Product table
            product.stock_quantity -= item.quantity;
            await product.save();

            // Update Inventory table if it exists
            const inventory = await Inventory.findOne({ product: product._id });
            if (inventory) {
                inventory.available_stock = product.stock_quantity;
                await inventory.save();
            }
        }

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
