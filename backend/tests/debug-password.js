require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Debug password hashing
const debugPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const User = require('./models/User');

        // Delete existing admin
        await User.deleteOne({ email: 'admin@gmail.com' });
        console.log('🗑️ Deleted existing admin');

        // Hash password manually
        const plainPassword = 'admin123';
        console.log('📝 Plain password:', plainPassword);
        
        const hashedPassword = await bcrypt.hash(plainPassword, 12);
        console.log('🔐 Hashed password:', hashedPassword);
        
        // Test the hash immediately
        const testMatch = await bcrypt.compare(plainPassword, hashedPassword);
        console.log('✅ Hash test match:', testMatch);

        // Create admin with this hash
        const admin = new User({
            name: 'Admin User',
            email: 'admin@gmail.com',
            password: hashedPassword,
            phone_number: '9999999999',
            address: 'Admin Headquarters',
            role: 'ADMIN'
        });

        await admin.save();
        console.log('✅ Admin created with manual hash');

        // Test login with the created user
        const savedAdmin = await User.findOne({ email: 'admin@gmail.com' });
        const loginTest = await bcrypt.compare(plainPassword, savedAdmin.password);
        console.log('✅ Login test match:', loginTest);

        // Test the actual login API
        const fetch = require('node-fetch');
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@gmail.com', password: plainPassword })
        });

        const result = await response.json();
        console.log('📡 API Response status:', response.status);
        console.log('📦 API Response:', result);

    } catch (error) {
        console.error('❌ Debug failed:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 MongoDB connection closed');
    }
};

debugPassword();
