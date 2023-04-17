const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Invalid email address"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        /*validate: {
            validator: function (v) {
                const phoneRegex = /^[0][5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/; // phone number regex pattern
                return (v == null || v.trim().length < 1) || phoneRegex.test(v);
            }
        }*/
    },
    date: Date,
    time: String,
    message: String,
    grade: String,
    testType: String,
    lessonType: String,
    helpNeeded: String,
    helpFreq: String,
    helpUrgency: String,
});

module.exports = mongoose.model('Contact', contactSchema)