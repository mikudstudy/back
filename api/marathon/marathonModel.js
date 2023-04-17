const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcrypt");

const marathonSchema = new mongoose.Schema({

    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
    school: {
        type: String,
        required: [true, "School is required"],
    },
    price: {
        type: Number,
        default: 100,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    teacherName: {
        type:String,
        required: [true, "Teacher Name is required"],
    },
    paymentLink: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    date: {
        type: Date,
        required: [true, "Start date is required"],
    },
});

marathonSchema.pre(/^find/, async function (next) {
    next();
});

module.exports = mongoose.model('Marathon', marathonSchema);