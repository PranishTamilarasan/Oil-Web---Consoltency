require('dotenv').config({ path: '../.env' });

// Test admin auth middleware
const testAuthMiddleware = async () => {
    try {
        console.log('🔐 Testing admin auth middleware...');
        
        // First, create a test admin user and get token
        const mongoose = require('mongoose');
        await mongoose.connect(process.env.MONGODB_URI);
        
        const User = require('../models/User');
        const bcrypt = require('bcryptjs');
        const jwt = require('jsonwebtoken');
        
        // Find or create admin user
        let admin = await User.findOne({ email: 'admin@gmail.com' });
        if (!admin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            admin = new User({
                name: 'Admin User',
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'ADMIN'
            });
            await admin.save();
            console.log('✅ Created admin user');
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        console.log('🔑 Generated token:', token.substring(0, 50) + '...');
        
        await mongoose.connection.close();
        
        // Test the API with the token
        console.log('\n🌐 Testing /api/admin/ai/dashboard with token...');
        
        const response = await fetch('http://localhost:5000/api/admin/ai/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Success! Dashboard data:');
            console.log('👥 Users:', data.totalUsers);
            console.log('📦 Products:', data.totalProducts);
            console.log('📅 Bookings:', data.totalBookings);
            console.log('🏠 Rentals:', data.totalRentals);
        } else {
            const errorText = await response.text();
            console.log('❌ Failed! Error response:');
            console.log('Status:', response.status);
            console.log('Response:', errorText);
        }
        
    } catch (error) {
        console.error('🚨 Test failed:', error.message);
    }
};

testAuthMiddleware();
