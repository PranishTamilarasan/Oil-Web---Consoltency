require('dotenv').config();
const mongoose = require('mongoose');

// Test dummy payment system
const testDummyPayment = async () => {
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

        // Create test dummy order
        const testOrderData = {
            user: admin._id,
            total_amount: 899,
            shippingAddress: {
                street: 'Main Mill Road',
                city: 'Tiruppur',
                state: 'Tamil Nadu',
                zip: '641601',
                phone: '9999999999'
            },
            order_status: 'confirmed',
            payment_method: 'Cash on Delivery',
            payment_status: 'Confirmed'
        };

        const order = new Order(testOrderData);
        await order.save();
        console.log('✅ Dummy order created:', order._id);

        // Create test order items
        const testItems = [
            {
                order: order._id,
                product: 'dummy-product-1',
                quantity: 2,
                price: 299
            },
            {
                order: order._id,
                product: 'dummy-product-2',
                quantity: 1,
                price: 399
            }
        ];

        for (const itemData of testItems) {
            const item = new OrderItem(itemData);
            await item.save();
            console.log('✅ Order item created:', item._id);
        }

        // Verify orders in database
        const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
        console.log('\n📊 All Orders in Database:');
        orders.forEach(o => {
            console.log(`- Order ${o._id}: ₹${o.total_amount} by ${o.user.name} (${o.order_status})`);
            console.log(`  Payment: ${o.payment_method} - ${o.payment_status}`);
            console.log(`  Created: ${o.createdAt.toLocaleDateString()}`);
        });

        console.log('\n✅ Dummy payment system test completed successfully!');
        console.log('\n🎯 What to test next:');
        console.log('1. Add products to cart in frontend');
        console.log('2. Complete checkout - should always succeed');
        console.log('3. Check admin orders page - should show new orders');
        console.log('4. Verify database updates');
        
        process.exit(0);

    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
};

testDummyPayment();
