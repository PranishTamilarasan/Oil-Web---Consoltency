const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/', auth, createBooking);
router.get('/my', auth, getUserBookings);
router.get('/all', adminAuth, getAllBookings);
router.patch('/:id/status', adminAuth, updateBookingStatus);

module.exports = router;
