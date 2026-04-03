require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simple login test
const testLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const User = require('./models/User');

        // Test admin login
        const admin = await User.findOne({ email: 'admin@gmail.com' });
        if (!admin) {
            console.log('❌ Admin not found');
            return;
        }

        // Test credentials
        const email = 'admin@gmail.com';
        const password = 'admin123';

        console.log('\n🔐 Testing login credentials:');
        console.log('📧 Email:', email);
        console.log('🔑 Password:', password);

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('✅ Password match:', isMatch);

        if (isMatch) {
            // Generate token
            const token = jwt.sign(
                { id: admin._id, email: admin.email, role: admin.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            console.log('\n🎉 Login successful!');
            console.log('👤 User:', admin.name);
            console.log('🔧 Role:', admin.role);
            console.log('🎫 Token generated');
            
            console.log('\n✅ Admin credentials are working correctly!');
            console.log('📱 You can now login with:');
            console.log('   - Email: admin@gmail.com');
            console.log('   - Password: admin123');
            console.log('   - URL: http://localhost:3000/admin-login');
            
        } else {
            console.log('❌ Password mismatch');
        }

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        mongoose.connection.close();
    }
};

testLogin();
