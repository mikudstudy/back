const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcrypt");

const lessonSchema = new mongoose.Schema({

    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
    place: {
        type: String,
        required: [true, "Place is required"],
    },
    price: {
        type: Number,
        required: false,
        default: 100,
    },
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Student email is required"],
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Teacher id is required"],
    },
    date: {
        type: Date,
        required: [true, "Start date is required"],
    },
    approved: {
        type: Boolean,
        default : false,
    },
    studentReview: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    teacherReview: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
});


// eslint-disable-next-line prefer-arrow-callback
lessonSchema.pre(/^find/, async function (next) {
    next();
});

module.exports = mongoose.model('Lesson', lessonSchema);