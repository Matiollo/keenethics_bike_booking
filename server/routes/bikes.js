const express = require('express')
const router = express.Router()
const Bike = require('../models/bike')
const bike = require('../models/bike')

// Getting all bikes
router.get('/', async (req, res) => {
    try {
        const bikes = await Bike.find()
        res.send(bikes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Creating a bike
router.post('/', async (req, res) => {
    const bike = new Bike({
        name: req.body.name,
        type: req.body.type,
        color: req.body.color,
        wheel_size: req.body.wheel_size,
        price: req.body.price,
        description: req.body.description,
        availability: "available"
    })
    try {
        const newBike = await bike.save()
        res.status(201).json(newBike)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Changing status of a bike
router.patch('/:id', getBike, async (req, res) => {
    if (req.body.availability != "available" && req.body.availability != "busy" && req.body.availability != "unavailable") {
        res.status(400).json({ message: "Incorrect availability" })
        return 
    }

    res.bike.availability = req.body.availability
    try {
        const updatedBike = await res.bike.save()
        res.json(updatedBike)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Removing a bike
router.delete('/:id', getBike, async (req, res) => {
    try {
        await res.bike.deleteOne()
        res.json({ message: "Deleted bike" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting number of bicycles
router.get('/count', async (req, res) => {
    try {
        const count = await Bike.countDocuments()
        res.json({ count: count })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting number of available bicycles
router.get('/count/available', async (req, res) => {
    try {
        const count = await Bike.countDocuments({ availability: "available" })
        res.json({ count: count })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting number of booked bicycles
router.get('/count/busy', async (req, res) => {
    try {
        const count = await Bike.countDocuments({ availability: "busy" })
        res.json({ count: count })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting an average price of a bicycle
router.get('/average_price', async (req, res) => {
    try {
        const averagePrice = await Bike.aggregate([{ $group: { _id: null, averagePrice: { $avg: "$price" } } }])
        res.json({ averagePrice: averagePrice[0].averagePrice.toFixed(2) })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getBike(req, res, next) {
    let bike
    try {
        bike = await Bike.findById(req.params.id)
        if (bike == null) {
            return res.status(404).json({ message: 'Cannot find bike'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.bike = bike
    next()
}

module.exports = router