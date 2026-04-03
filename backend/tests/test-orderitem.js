require('dotenv').config();
const mongoose = require('mongoose');

// Test OrderItem creation
const testOrderItem = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const Order = require('./models/Order');
        const OrderItem = require('./models/OrderItem');
        const User = require('./models/User');

        // Find a user and order
        const user = await User.findOne({ email: 'pranish@gmail.com' });
        const order = await Order.findOne({ user: user._id });

        console.log('📦 Found order:', order._id);
        console.log('👤 User:', user.name);

        // Test creating OrderItem with different product types
        console.log('\n🧪 Testing OrderItem creation...');

        // Test 1: With valid ObjectId
        try {
            const item1 = new OrderItem({
                order: order._id,
                product: new mongoose.Types.ObjectId(),
                quantity: 2,
                price: 299
            });
            await item1.save();
            console.log('✅ OrderItem created with ObjectId:', item1._id);
        } catch (error) {
            console.log('❌ ObjectId test failed:', error.message);
        }

        // Test 2: With string
        try {
            const item2 = new OrderItem({
                order: order._id,
                product: 'test-product-string',
                quantity: 1,
                price: 399
            });
            await item2.save();
            console.log('✅ OrderItem created with string:', item2._id);
        } catch (error) {
            console.log('❌ String test failed:', error.message);
        }

        // Check final order items
        const finalItems = await OrderItem.find({ order: order._id });
        console.log('\n📊 Final OrderItems count:', finalItems.length);
        finalItems.forEach((item, index) => {
            console.log(`${index + 1}. Product: ${item.product} - Qty: ${item.quantity} - ₹${item.price}`);
        });

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 MongoDB connection closed');
    }
};

testOrderItem();
