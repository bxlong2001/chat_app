require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require('./routes/auth')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@chatapp.wvozhsq.mongodb.net/?retryWrites=true&w=majority`)

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}
connectDB()

const app = express()

app.use(bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit:50000
}))
app.use(express.json())
app.use(cors());

//routes
app.use('/auth', authRouter)

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))