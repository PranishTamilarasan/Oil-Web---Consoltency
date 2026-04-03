require('dotenv').config();
const mongoose = require('mongoose');

// Test user orders endpoint
const debugOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const Order = require('./models/Order');
        const OrderItem = require('./models/OrderItem');
        const User = require('./models/User');

        // Find all users
        const users = await User.find({});
        console.log(`\n👥 Found ${users.length} users:`);
        users.forEach(user => {
            console.log(`- ${user.name} (${user.email}) - ID: ${user._id}`);
        });

        // Find all orders
        const allOrders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        console.log(`\n📦 Found ${allOrders.length} total orders:`);
        
        if (allOrders.length === 0) {
            console.log('❌ No orders found in database');
            console.log('\n🔧 Creating a test order...');
            
            // Create test order for first user
            if (users.length > 0) {
                const testOrder = new Order({
                    user: users[0]._id,
                    total_amount: 599,
                    shippingAddress: {
                        street: 'Main Mill Road',
                        city: 'Tiruppur',
                        state: 'Tamil Nadu',
                        zip: '641601',
                        phone: '9999999999'
                    },
                    order_status: 'Processing',
                    payment_method: 'Cash on Delivery',
                    payment_status: 'Completed'
                });
                
                await testOrder.save();
                console.log('✅ Test order created:', testOrder._id);

                // Create order item
                const testItem = new OrderItem({
                    order: testOrder._id,
                    product: new mongoose.Types.ObjectId(), // Generate a valid ObjectId
                    quantity: 2,
                    price: 299
                });
                
                await testItem.save();
                console.log('✅ Test order item created:', testItem._id);
                
                // Fetch orders again
                const updatedOrders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
                console.log(`\n📦 Now found ${updatedOrders.length} orders:`);
                updatedOrders.forEach((order, index) => {
                    console.log(`\n${index + 1}. Order ${order._id}:`);
                    console.log(`   - User: ${order.user?.name || 'Unknown'} (${order.user?.email || 'No email'})`);
                    console.log(`   - User ID: ${order.user}`);
                    console.log(`   - Total: ₹${order.total_amount}`);
                    console.log(`   - Status: ${order.order_status}`);
                    console.log(`   - Created: ${order.createdAt}`);
                    console.log(`   - Payment: ${order.payment_method}`);
                });
            }
        } else {
            allOrders.forEach((order, index) => {
                console.log(`\n${index + 1}. Order ${order._id}:`);
                console.log(`   - User: ${order.user?.name || 'Unknown'} (${order.user?.email || 'No email'})`);
                console.log(`   - User ID: ${order.user}`);
                console.log(`   - Total: ₹${order.total_amount}`);
                console.log(`   - Status: ${order.order_status}`);
                console.log(`   - Created: ${order.createdAt}`);
                console.log(`   - Payment: ${order.payment_method}`);
                
                // Check order items
                OrderItem.find({ order: order._id }).then(items => {
                    console.log(`   - Items: ${items.length}`);
                    items.forEach((item, itemIndex) => {
                        console.log(`     ${itemIndex + 1}. ${item.product} - Qty: ${item.quantity} - ₹${item.price}`);
                    });
                });
            });
        }

        // Test getUserOrders for each user
        console.log('\n🔍 Testing getUserOrders for each user:');
        for (const user of users) {
            console.log(`\n--- Testing for user: ${user.name} (${user.email}) ---`);
            
            const userOrders = await Order.find({ user: user._id }).sort({ createdAt: -1 });
            console.log(`Found ${userOrders.length} orders for this user`);
            
            if (userOrders.length > 0) {
                // Test with items
                const ordersWithItems = await Promise.all(userOrders.map(async (o) => {
                    const items = await OrderItem.find({ order: o._id }).populate('product');
                    return { ...o._doc, items };
                }));
                
                console.log('Orders with items:', JSON.stringify(ordersWithItems, null, 2));
            }
        }

    } catch (error) {
        console.error('❌ Debug failed:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 MongoDB connection closed');
    }
};

debugOrders();
