const mongoose = require('mongoose')

const connectDB = (URL)=>{
    return mongoose.connect(URL)
}

module.exports = connectDB




