const express = require('express');
const router = express.Router();
const { 
    createRental, 
    getUserRentals, 
    getAllRentals, 
    updateRentalStatus,
    getAvailableEquipment 
} = require('../controllers/rentalController');
const { auth, adminAuth } = require('../middleware/auth');

// Public route - get available equipment
router.get('/equipment', getAvailableEquipment);

// Protected routes
router.post('/', auth, createRental);
router.get('/my', auth, getUserRentals);
router.get('/all', adminAuth, getAllRentals);
router.patch('/:id/status', adminAuth, updateRentalStatus);

module.exports = router;
