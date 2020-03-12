const mongoose = require('mongoose');

const JerseySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    kit: {
        type: String,
        default: 'Home'
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Jersey', JerseySchema);