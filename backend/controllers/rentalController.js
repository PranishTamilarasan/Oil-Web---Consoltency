const Rental = require('../models/Rental');
const Product = require('../models/Product');

exports.createRental = async (req, res) => {
    try {
        const { equipmentId, name, email, phone, startDate, endDate, timeSlot, message } = req.body;

        // Check if equipment exists
        const equipment = await Product.findById(equipmentId);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        // Check for overlapping rentals
        const existingRental = await Rental.findOne({
            equipment: equipmentId,
            status: { $in: ['Pending', 'Approved'] },
            $or: [
                {
                    startDate: { $lte: new Date(endDate) },
                    endDate: { $gte: new Date(startDate) }
                }
            ]
        });

        if (existingRental) {
            return res.status(400).json({ message: 'Equipment is already rented for the selected dates' });
        }

        // Calculate total price (days * hours * price per hour)
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        const hoursPerDay = 8; // Assume 8 hours per rental day
        const totalPrice = days * hoursPerDay * equipment.price;

        const rental = new Rental({
            user: req.user.id,
            equipment: equipmentId,
            equipmentName: equipment.product_name,
            startDate,
            endDate,
            timeSlot,
            totalPrice,
            message,
            contactInfo: {
                name,
                email,
                phone
            }
        });

        await rental.save();
        res.status(201).json({ 
            message: 'Rental request submitted successfully', 
            rental,
            totalPrice 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserRentals = async (req, res) => {
    try {
        const rentals = await Rental.find({ user: req.user.id })
            .populate('equipment', 'product_name price image_url')
            .sort({ createdAt: -1 });
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.find()
            .populate('user', 'name email phone_number')
            .populate('equipment', 'product_name price image_url')
            .sort({ createdAt: -1 });
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRentalStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const rental = await Rental.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        ).populate('user', 'name email');
        
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }
        
        res.json({ message: 'Rental status updated successfully', rental });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAvailableEquipment = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        // Get equipment that are marked as rental type
        const allEquipment = await Product.find({ itemType: 'rental' });
        
        if (!startDate || !endDate) {
            return res.json(allEquipment);
        }

        // Get rented equipment for the date range
        const rentedEquipment = await Rental.find({
            status: { $in: ['Pending', 'Approved'] },
            $or: [
                {
                    startDate: { $lte: new Date(endDate) },
                    endDate: { $gte: new Date(startDate) }
                }
            ]
        }).distinct('equipment');

        // Filter out rented equipment
        const availableEquipment = allEquipment.filter(
            equipment => !rentedEquipment.includes(equipment._id)
        );

        res.json(availableEquipment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
