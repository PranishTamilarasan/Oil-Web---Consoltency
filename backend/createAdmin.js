const User = require('./models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Delete any existing admin with this email
        await User.deleteOne({ email: 'admin@gmail.com' });

        // Create fresh admin
        const hashedPassword = await bcrypt.hash('admin123', 12);
        
        const admin = new User({
            name: 'Admin User',
            email: 'admin@gmail.com',
            password: hashedPassword,
            phone_number: '9999999999',
            address: 'Admin Headquarters',
            role: 'ADMIN'
        });

        await admin.save();
        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@gmail.com');
        console.log('🔑 Password: admin123');
        console.log('👤 Role: ADMIN');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error creating admin:', err);
        process.exit(1);
    }
};

createAdmin();
