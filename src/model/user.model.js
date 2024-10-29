const mongoose = require('mongoose');

// Define the registration schema with timestamps
const registrationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,

    },
    whatsappNumber: {
        type: String,
        required:true
    },
    phoneNumber: {
        type: String,
        required: true

    },
    pincode: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,

    },
    state: {
        type: String,

    },
    country:{
        type:String
    },
    visitingCard: {
        type: String, // URL or path to the uploaded file
    },
    otp: {
        type: String,
        expires: 86400
    },
    pin: {
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    planName: {
        type: String,
        enum: [ 'standard', 'premium', 'basic'],
    },
    extendendDays:{
        type:Number,
        default:0
    },
    isRejected:{
        type:Boolean,
        default:false
    },
    rejectionDate:{
        type:Date
    },
    isInTrail:{
        type:Boolean,
        default:true
    },
    isFreeUser:{
        type:Boolean,
        default:false
    },
    planStartDate:{
        type:Date
    },
    planEndDate:{
    type:Date
    }
}, { timestamps: true });

// Create the model from the schema
const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
