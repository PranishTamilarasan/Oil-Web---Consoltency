require('dotenv').config({ path: '../.env' });

// Test the order creation fix
const testOrderCreation = async () => {
    try {
        console.log('🧪 Testing order creation with number product IDs...');
        
        const mongoose = require('mongoose');
        await mongoose.connect(process.env.MONGODB_URI);
        
        const fetch = require('node-fetch');
        
        // First, get admin token
        const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@gmail.com', password: 'admin123' })
        });
        
        if (!loginResponse.ok) {
            throw new Error('Login failed');
        }
        
        const loginData = await loginResponse.json();
        const token = loginData.token;
        console.log('🔑 Got admin token');
        
        // Test order creation with number product IDs (like frontend sends)
        const orderData = {
            products: [
                { product: '2', quantity: 1, priceAtTime: 399 },
                { product: '5', quantity: 1, priceAtTime: 599 }
            ],
            total_amount: 998,
            shippingAddress: {
                street: 'Main Mill Road',
                city: 'Tiruppur',
                state: 'Tamil Nadu',
                zip: '641601',
                phone: '8270233560'
            }
        };
        
        console.log('📦 Sending order data:', orderData);
        
        const orderResponse = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        console.log('📡 Order response status:', orderResponse.status);
        
        if (orderResponse.ok) {
            const orderResult = await orderResponse.json();
            console.log('✅ Order created successfully!');
            console.log('📋 Order ID:', orderResult.order?._id);
            console.log('📊 Order details:', {
                total_amount: orderResult.order?.total_amount,
                payment_status: orderResult.order?.payment_status,
                order_status: orderResult.order?.order_status
            });
            
            // Check if order items were created
            if (orderResult.orderItems) {
                console.log('📦 Order items created:', orderResult.orderItems.length);
                orderResult.orderItems.forEach((item, index) => {
                    console.log(`  Item ${index + 1}:`, {
                        product: item.product,
                        quantity: item.quantity,
                        price: item.price
                    });
                });
            }
            
        } else {
            const errorText = await orderResponse.text();
            console.log('❌ Order creation failed:');
            console.log('Status:', orderResponse.status);
            console.log('Error:', errorText);
        }
        
        await mongoose.connection.close();
        
    } catch (error) {
        console.error('🚨 Test failed:', error.message);
    }
};

testOrderCreation();
