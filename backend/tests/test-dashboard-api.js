require('dotenv').config();
const mongoose = require('mongoose');

// Test dashboard API data
const testDashboardData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const User = require('./models/User');
        const Product = require('./models/Product');
        const Booking = require('./models/Booking');
        const Rental = require('./models/Rental');
        const Order = require('./models/Order');

        // Get actual dashboard data
        console.log('\n📊 Checking Dashboard Data Sources:');

        // Users
        const totalUsers = await User.countDocuments({ role: 'USER' });
        const adminUsers = await User.countDocuments({ role: 'ADMIN' });
        console.log(`👥 Users: ${totalUsers} (USER role)`);
        console.log(`👨‍💼 Admin Users: ${adminUsers} (ADMIN role)`);

        // Products
        const totalProducts = await Product.countDocuments();
        const saleProducts = await Product.countDocuments({ itemType: 'sale' });
        const rentalProducts = await Product.countDocuments({ itemType: 'rental' });
        console.log(`📦 Total Products: ${totalProducts}`);
        console.log(`🛒 Sale Products: ${saleProducts}`);
        console.log(`🔧 Rental Products: ${rentalProducts}`);

        // Bookings
        const totalBookings = await Booking.countDocuments();
        console.log(`📅 Total Bookings: ${totalBookings}`);

        // Rentals
        const totalRentals = await Rental.countDocuments();
        console.log(`🏠 Total Rentals: ${totalRentals}`);

        // Orders
        const totalOrders = await Order.countDocuments();
        console.log(`🛒 Total Orders: ${totalOrders}`);

        // Recent data
        const recentUsers = await User.find({ role: 'USER' }).sort({ createdAt: -1 }).limit(5);
        const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
        const recentRentals = await Rental.find().sort({ createdAt: -1 }).limit(5);

        console.log(`\n📋 Recent Users: ${recentUsers.length}`);
        console.log(`📋 Recent Bookings: ${recentBookings.length}`);
        console.log(`📋 Recent Rentals: ${recentRentals.length}`);

        // Bookings by status
        const bookingsByStatus = await Booking.aggregate([
            { $group: { _id: '$booking_status', count: { $sum: 1 } } }
        ]);
        console.log('\n📊 Bookings by Status:', bookingsByStatus);

        // Rentals by status
        const rentalsByStatus = await Rental.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        console.log('📊 Rentals by Status:', rentalsByStatus);

        // Calculate what the dashboard should return
        const dashboardData = {
            totalUsers,
            totalProducts,
            totalBookings,
            totalRentals,
            recentUsers,
            recentBookings,
            recentRentals,
            bookingsByStatus,
            rentalsByStatus
        };

        console.log('\n🎯 Dashboard API Response:');
        console.log(JSON.stringify(dashboardData, null, 2));

        // Calculate derived metrics
        const pendingOrders = bookingsByStatus.find(b => b._id === 'pending')?.count || 0;
        const activeBookings = bookingsByStatus.find(b => b._id === 'confirmed')?.count || 0;
        const revenue = totalRentals * 500;

        console.log('\n💰 Derived Metrics:');
        console.log(`📋 Pending Orders: ${pendingOrders}`);
        console.log(`✅ Active Bookings: ${activeBookings}`);
        console.log(`💰 Estimated Revenue: ₹${revenue}`);

        console.log('\n🔧 If all values are 0, you need to:');
        console.log('1. Create regular users (role: USER)');
        console.log('2. Add products to inventory');
        console.log('3. Create sample bookings');
        console.log('4. Add rental equipment');
        console.log('5. Place orders through the system');

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 MongoDB connection closed');
    }
};

testDashboardData();
