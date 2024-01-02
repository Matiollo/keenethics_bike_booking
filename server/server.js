const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL)  
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


app.use(express.json())

const bikesRouter = require('./routes/bikes')
app.use('/bikes', bikesRouter)

app.listen(5000, () => {
    console.log("Server started on port 5000")
})




