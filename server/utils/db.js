const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const mongoURI = process.env.MONGODBURI

const db = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('MongoDB connection error:', err));
}

module.exports = db