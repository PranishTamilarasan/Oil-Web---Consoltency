const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    equipmentName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' },
    message: { type: String },
    contactInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);
