require('dotenv').config();
const mongoose = require('mongoose');

// Test database connection and data
const testAI = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        // Check models
        const User = require('./models/User');
        const Product = require('./models/Product');
        const Booking = require('./models/Booking');
        const Rental = require('./models/Rental');

        // Get counts
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();
        const bookingCount = await Booking.countDocuments();
        const rentalCount = await Rental.countDocuments();

        console.log('\n📊 Dashboard Data:');
        console.log(`Users: ${userCount}`);
        console.log(`Products: ${productCount}`);
        console.log(`Bookings: ${bookingCount}`);
        console.log(`Rentals: ${rentalCount}`);

        // Check admin user
        const admin = await User.findOne({ email: 'admin@gmail.com' });
        if (admin) {
            console.log('\n✅ Admin user found:', admin.email, 'Role:', admin.role);
        } else {
            console.log('\n❌ Admin user not found');
        }

        // Check OpenRouter
        try {
            const { OpenRouter } = require('@openrouter/sdk');
            console.log('\n✅ OpenRouter SDK installed');
            
            if (process.env.OPENROUTER_API_KEY) {
                console.log('✅ OpenRouter API key found');
            } else {
                console.log('⚠️  OpenRouter API key not found in .env');
            }
        } catch (err) {
            console.log('\n❌ OpenRouter SDK not installed');
            console.log('Run: npm install @openrouter/sdk');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
};

testAI();
