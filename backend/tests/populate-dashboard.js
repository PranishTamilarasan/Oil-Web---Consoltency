require('dotenv').config();
const mongoose = require('mongoose');

// Populate dashboard with sample data
const populateDashboard = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const Product = require('./models/Product');
        const Booking = require('./models/Booking');
        const Rental = require('./models/Rental');

        console.log('\n🔧 Populating dashboard with sample data...');

        // 1. Create sample products
        console.log('\n📦 Creating sample products...');
        
        const sampleProducts = [
            {
                product_name: 'Premium Coconut Oil',
                description: 'High-quality cold-pressed coconut oil',
                price: 299,
                stock_quantity: 50,
                itemType: 'sale',
                category: 'coconut-oil',
                image: '/img1.webp'
            },
            {
                product_name: 'Virgin Coconut Oil',
                description: 'Extra virgin coconut oil for cooking',
                price: 399,
                stock_quantity: 30,
                itemType: 'sale',
                category: 'virgin-oil',
                image: '/img2.webp'
            },
            {
                product_name: 'Oil Mill Machine Rental',
                description: 'Industrial oil extraction machine',
                price: 5000,
                stock_quantity: 5,
                itemType: 'rental',
                category: 'equipment',
                image: '/machine1.webp'
            },
            {
                product_name: 'Coconut Press Machine',
                description: 'Manual coconut press machine',
                price: 3000,
                stock_quantity: 8,
                itemType: 'rental',
                category: 'equipment',
                image: '/machine2.webp'
            },
            {
                product_name: 'Specialty Herbal Oil',
                description: 'Ayurvedic herbal oil blend',
                price: 599,
                stock_quantity: 20,
                itemType: 'sale',
                category: 'specialty-oils',
                image: '/img3.webp'
            }
        ];

        for (const productData of sampleProducts) {
            const existingProduct = await Product.findOne({ product_name: productData.product_name });
            if (!existingProduct) {
                const product = new Product(productData);
                await product.save();
                console.log(`✅ Created product: ${product.product_name}`);
            } else {
                console.log(`📦 Product already exists: ${existingProduct.product_name}`);
            }
        }

        // 2. Create sample bookings
        console.log('\n📅 Creating sample bookings...');
        
        const sampleBookings = [
            {
                user: '69bf93c08f7434f65d09f252', // Pranish T
                booking_date: new Date('2026-04-05'),
                time_slot: '10:00 AM - 12:00 PM',
                purpose: 'Coconut oil extraction',
                booking_status: 'confirmed',
                total_amount: 1500
            },
            {
                user: '69cf58fb635ceab2e9136808', // Pranish T
                booking_date: new Date('2026-04-06'),
                time_slot: '2:00 PM - 4:00 PM',
                purpose: 'Oil processing',
                booking_status: 'pending',
                total_amount: 1200
            },
            {
                user: '69bf93c08f7434f65d09f252', // Pranish T
                booking_date: new Date('2026-04-03'),
                time_slot: '9:00 AM - 11:00 AM',
                purpose: 'Bulk oil production',
                booking_status: 'confirmed',
                total_amount: 2000
            }
        ];

        for (const bookingData of sampleBookings) {
            const existingBooking = await Booking.findOne({
                user: bookingData.user,
                booking_date: bookingData.booking_date
            });
            if (!existingBooking) {
                const booking = new Booking(bookingData);
                await booking.save();
                console.log(`✅ Created booking: ${bookingData.purpose}`);
            } else {
                console.log(`📅 Booking already exists for ${existingBooking.purpose}`);
            }
        }

        // 3. Create sample rentals
        console.log('\n🏠 Creating sample rentals...');
        
        const sampleRentals = [
            {
                user: '69bf93c08f7434f65d09f252', // Pranish T
                equipment: 'Oil Mill Machine Rental',
                equipmentName: 'Oil Mill Machine Rental',
                rental_start_date: new Date('2026-04-01'),
                rental_end_date: new Date('2026-04-07'),
                timeSlot: 'Full Day',
                total_amount: 35000,
                status: 'active',
                contactInfo: {
                    name: 'Pranish T',
                    email: 'pranish@gmail.com',
                    phone: '8270233560'
                }
            },
            {
                user: '69cf58fb635ceab2e9136808', // Pranish T
                equipment: 'Coconut Press Machine',
                equipmentName: 'Coconut Press Machine',
                rental_start_date: new Date('2026-04-10'),
                rental_end_date: new Date('2026-04-15'),
                timeSlot: 'Half Day',
                total_amount: 15000,
                status: 'pending',
                contactInfo: {
                    name: 'Pranish T',
                    email: 'pranishtamilarasan@gmail.com',
                    phone: '8270233560'
                }
            }
        ];

        for (const rentalData of sampleRentals) {
            const existingRental = await Rental.findOne({
                user: rentalData.user,
                equipment: rentalData.equipment
            });
            if (!existingRental) {
                const rental = new Rental(rentalData);
                await rental.save();
                console.log(`✅ Created rental: ${rentalData.equipment}`);
            } else {
                console.log(`🏠 Rental already exists: ${existingRental.equipment}`);
            }
        }

        // 4. Show final dashboard data
        console.log('\n📊 Final Dashboard Data:');
        const User = require('./models/User');
        const Order = require('./models/Order');

        const totalUsers = await User.countDocuments({ role: 'USER' });
        const totalProducts = await Product.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalRentals = await Rental.countDocuments();
        const totalOrders = await Order.countDocuments();

        console.log(`👥 Users: ${totalUsers}`);
        console.log(`📦 Products: ${totalProducts}`);
        console.log(`📅 Bookings: ${totalBookings}`);
        console.log(`🏠 Rentals: ${totalRentals}`);
        console.log(`🛒 Orders: ${totalOrders}`);

        console.log('\n🎉 Dashboard populated successfully!');
        console.log('📱 Refresh your admin dashboard to see the updated data.');

    } catch (error) {
        console.error('❌ Population failed:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 MongoDB connection closed');
    }
};

populateDashboard();
