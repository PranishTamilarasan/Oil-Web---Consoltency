const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        const { booking_date, time_slot, areaSize } = req.body;

        // Double Booking Prevention
        const existing = await Booking.findOne({
            booking_date: new Date(booking_date),
            time_slot,
            booking_status: { $ne: 'Rejected' }
        });

        if (existing) {
            return res.status(400).json({ message: 'This slot is already booked for the selected date.' });
        }

        const booking = new Booking({
            user: req.user.id,
            booking_date,
            time_slot,
            areaSize,
            booking_status: 'Pending'
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name email phone_number').sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { booking_status } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { booking_status }, { new: true });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
