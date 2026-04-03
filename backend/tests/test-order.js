require('dotenv').config();
const mongoose = require('mongoose');

// Test order creation
const testOrder = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const Order = require('./models/Order');
        const OrderItem = require('./models/OrderItem');
        const User = require('./models/User');

        // Check if admin user exists
        const admin = await User.findOne({ email: 'admin@gmail.com' });
        if (!admin) {
            console.log('❌ Admin user not found. Please run createAdmin.js first');
            process.exit(1);
        }

        // Create test order
        const testOrderData = {
            user: admin._id,
            total_amount: 599,
            shippingAddress: {
                street: 'Main Mill Road',
                city: 'Tiruppur',
                state: 'Tamil Nadu',
                zip: '641601',
                phone: '9999999999'
            },
            order_status: 'pending'
        };

        const order = new Order(testOrderData);
        await order.save();
        console.log('✅ Test order created:', order._id);

        // Create test order items
        const testItems = [
            {
                order: order._id,
                product: 'mock-product-1',
                quantity: 2,
                price: 299
            },
            {
                order: order._id,
                product: 'mock-product-2',
                quantity: 1,
                price: 399
            }
        ];

        for (const itemData of testItems) {
            const item = new OrderItem(itemData);
            await item.save();
            console.log('✅ Order item created:', item._id);
        }

        // Verify order with items
        const orders = await Order.find().populate('user', 'name email');
        console.log('\n📊 All Orders:');
        orders.forEach(o => {
            console.log(`- Order ${o._id}: ₹${o.total_amount} by ${o.user.name} (${o.order_status})`);
        });

        console.log('\n✅ Order system test completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
};

testOrder();
