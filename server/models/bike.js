const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    type: {
        type: String, 
        required: true
    }, 
    color: {
        type: String, 
        required: true
    },
    wheel_size: {
        type: Number, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    availability: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Bike', bikeSchema)

