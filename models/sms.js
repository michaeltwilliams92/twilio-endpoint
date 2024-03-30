const mongoose = require('mongoose')

const SMSSchema = new mongoose.Schema({
    phoneNumber: String,
    message: String,
})


module.exports = mongoose.model('SMS', SMSSchema);