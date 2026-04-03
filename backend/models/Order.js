const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total_amount: { type: Number, required: true },
    payment_status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Confirmed'], default: 'Pending' },
    order_status: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Confirmed', 'Pending'], default: 'Processing' },
    payment_method: { type: String, default: 'Cash on Delivery' },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        phone: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
