const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    equipment: { type: mongoose.Schema.Types.Mixed, required: true }, // Allow both ObjectId and string
    equipmentName: { type: String, required: true },
    rental_start_date: { type: Date, required: true },
    rental_end_date: { type: Date, required: true },
    startDate: { type: Date }, // keeping for compatibility
    endDate: { type: Date }, // keeping for compatibility
    timeSlot: { type: String, required: true },
    total_amount: { type: Number, required: true },
    totalPrice: { type: Number }, // keeping for compatibility
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed', 'active', 'pending'], default: 'Pending' },
    message: { type: String },
    contactInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);
