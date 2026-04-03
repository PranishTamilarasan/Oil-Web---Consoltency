require('dotenv').config();
const mongoose = require('mongoose');

// Test admin login
const testAdminLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const User = require('./models/User');
        const bcrypt = require('bcryptjs');

        // Find admin user
        const admin = await User.findOne({ email: 'admin@gmail.com' });
        if (!admin) {
            console.log('❌ Admin user not found');
            return;
        }

        console.log('👤 Admin user found:', admin.name);
        console.log('🔧 Role:', admin.role);
        console.log('📧 Email:', admin.email);

        // Test password comparison
        const testPassword = 'admin123';
        console.log('\n🔐 Testing password comparison...');
        console.log('📝 Input password:', testPassword);
        
        const isMatch = await bcrypt.compare(testPassword, admin.password);
        console.log('✅ Password match:', isMatch);

        if (isMatch) {
            // Test JWT token generation
            const jwt = require('jsonwebtoken');
            const token = jwt.sign(
                { id: admin._id, email: admin.email, role: admin.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            console.log('\n🎫 JWT Token generated successfully');
            console.log('🔑 Token (first 50 chars):', token.substring(0, 50) + '...');
            
            // Test manual login API call
            console.log('\n🌐 Testing login API...');
            
            const fetch = require('node-fetch');
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'admin@gmail.com', password: 'admin123' })
            });

            const result = await response.json();
            console.log('📡 API Response status:', response.status);
            console.log('📦 API Response data:', result);

            if (response.ok && result.token) {
                console.log('✅ Login API working correctly');
            } else {
                console.log('❌ Login API failed:', result.message);
            }
        } else {
            console.log('❌ Password does not match');
        }

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 MongoDB connection closed');
    }
};

// Check if backend is running
testAdminLogin();
