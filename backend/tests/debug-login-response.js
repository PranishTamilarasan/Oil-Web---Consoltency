require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

// Debug admin login response
const debugLoginResponse = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const User = require('../models/User');

        // Find admin user
        const admin = await User.findOne({ email: 'admin@gmail.com' });
        if (!admin) {
            console.log('❌ Admin user not found');
            return;
        }

        console.log('\n👤 Admin User Details:');
        console.log('Name:', admin.name);
        console.log('Email:', admin.email);
        console.log('Role:', admin.role);
        console.log('Role type:', typeof admin.role);
        console.log('Role length:', admin.role.length);

        console.log('\n🔍 Role Comparison Tests:');
        console.log('admin.role === "ADMIN":', admin.role === 'ADMIN');
        console.log('admin.role === "admin":', admin.role === 'admin');
        console.log('admin.role.toUpperCase() === "ADMIN":', admin.role.toUpperCase() === 'ADMIN');
        console.log('admin.role.toLowerCase() === "admin":', admin.role.toLowerCase() === 'admin');
        
        console.log('\n💡 Issue Found:');
        console.log('The role is "ADMIN" (uppercase) but frontend might be checking for "admin" (lowercase)');
        console.log('Solution: Fix role comparison in Login.jsx');

    } catch (error) {
        console.error('❌ Debug failed:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 MongoDB connection closed');
    }
};

debugLoginResponse();
