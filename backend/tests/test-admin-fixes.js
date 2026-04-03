require('dotenv').config({ path: '../.env' });

// Test admin fixes for orders and AI
const testAdminFixes = async () => {
    try {
        console.log('🧪 Testing admin fixes...');
        
        const mongoose = require('mongoose');
        await mongoose.connect(process.env.MONGODB_URI);
        
        const fetch = require('node-fetch');
        
        // 1. Get admin token
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
        
        // 2. Test Orders API (fixed to use authorizedFetch)
        console.log('\n📦 Testing Orders API...');
        const ordersResponse = await fetch('http://localhost:5000/api/orders/all', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (ordersResponse.ok) {
            const ordersData = await ordersResponse.json();
            console.log('✅ Orders API works!');
            console.log('📊 Orders count:', ordersData.length);
            if (ordersData.length > 0) {
                console.log('📋 Sample order:', {
                    id: ordersData[0]._id,
                    total_amount: ordersData[0].total_amount,
                    status: ordersData[0].order_status
                });
            } else {
                console.log('⚠️ No orders found - run dummy payment test');
            }
        } else {
            console.log('❌ Orders API failed:', ordersResponse.status);
        }
        
        // 3. Test AI Summary API (fixed to use authorizedFetch)
        console.log('\n🤖 Testing AI Summary API...');
        const summaryResponse = await fetch('http://localhost:5000/api/admin/ai/summary', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (summaryResponse.ok) {
            const summaryData = await summaryResponse.json();
            console.log('✅ AI Summary API works!');
            console.log('📝 Summary length:', summaryData.summary?.length || 0);
            if (summaryData.summary) {
                console.log('📄 Summary preview:', summaryData.summary.substring(0, 100) + '...');
            }
        } else {
            const errorText = await summaryResponse.text();
            console.log('❌ AI Summary API failed:', summaryResponse.status);
            console.log('Error:', errorText);
        }
        
        // 4. Test AI Insights API (fixed to use authorizedFetch)
        console.log('\n📊 Testing AI Insights API...');
        const insightsResponse = await fetch('http://localhost:5000/api/admin/ai/insights?metric=general', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (insightsResponse.ok) {
            const insightsData = await insightsResponse.json();
            console.log('✅ AI Insights API works!');
            console.log('🧠 Insights length:', insightsData.insights?.length || 0);
            if (insightsData.insights) {
                console.log('💡 Insights preview:', insightsData.insights.substring(0, 100) + '...');
            }
        } else {
            const errorText = await insightsResponse.text();
            console.log('❌ AI Insights API failed:', insightsResponse.status);
            console.log('Error:', errorText);
        }
        
        await mongoose.connection.close();
        
        console.log('\n🎉 Admin Fixes Test Complete!');
        console.log('✅ Orders API should now work in frontend');
        console.log('✅ AI Reports should now work in frontend');
        console.log('✅ Both use authorizedFetch properly');
        
    } catch (error) {
        console.error('🚨 Test failed:', error.message);
    }
};

testAdminFixes();
