require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Test user orders endpoint
const testUserOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const Order = require('./models/Order');
        const OrderItem = require('./models/OrderItem');
        const User = require('./models/User');

        // Find or create admin user
        let admin = await User.findOne({ email: 'admin@gmail.com' });
        if (!admin) {
            console.log('❌ Admin user not found. Please run createAdmin.js first');
            process.exit(1);
        }

        console.log('✅ Found admin user:', admin.name);

        // Create a test order for the admin user if none exists
        const existingOrders = await Order.find({ user: admin._id });
        if (existingOrders.length === 0) {
            console.log('📝 Creating test order for admin user...');
            
            const testOrder = new Order({
                user: admin._id,
                total_amount: 599,
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
            });
            
            await testOrder.save();
            console.log('✅ Test order created:', testOrder._id);

            // Create order items
            const testItem = new OrderItem({
                order: testOrder._id,
                product: 'test-product-1',
                quantity: 2,
                price: 299
            });
            
            await testItem.save();
            console.log('✅ Test order item created:', testItem._id);
        } else {
            console.log(`✅ Found ${existingOrders.length} existing orders for admin user`);
        }

        // Test the getUserOrders function directly
        const getUserOrders = require('./controllers/orderController').getUserOrders;
        
        // Create mock request object
        const mockReq = {
            user: { id: admin._id }
        };
        
        // Create mock response object
        let responseData = null;
        const mockRes = {
            json: (data) => {
                responseData = data;
                console.log('✅ getUserOrders response:', JSON.stringify(data, null, 2));
            },
            status: (code) => ({
                json: (data) => {
                    console.log(`❌ Response status ${code}:`, data);
                    responseData = data;
                }
            })
        };

        // Call getUserOrders
        await getUserOrders(mockReq, mockRes);

        if (responseData && Array.isArray(responseData)) {
            console.log(`\n🎉 Success! Found ${responseData.length} orders for user`);
            responseData.forEach((order, index) => {
                console.log(`\n${index + 1}. Order ${order._id}:`);
                console.log(`   - Total: ₹${order.total_amount}`);
                console.log(`   - Status: ${order.order_status}`);
                console.log(`   - Items: ${order.items?.length || 0}`);
                console.log(`   - Created: ${order.createdAt}`);
            });
        } else {
            console.log('❌ No orders found or invalid response format');
        }

        // Test JWT token generation (for frontend testing)
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        console.log(`\n🔑 Test JWT Token for frontend:`);
        console.log(token);
        console.log(`\n📝 Use this token in Authorization header: Bearer ${token}`);

    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 MongoDB connection closed');
    }
};

testUserOrders();
