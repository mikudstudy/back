const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Invalid email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: true,
        min: 6,
        max: 20,
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
    },
    /*gender: { // TODO: add once front-end is ready to send this field
        type: Boolean,
        required: [true,"Gender is required"],
    },*/
    phoneNumber: {
        type: String,
        /*validate: { // TODO: add validation
            validator: function (v) {
                const phoneRegex = /^[0][5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/; // phone number regex pattern
                return (v == null || v.trim().length < 1) || phoneRegex.test(v);
            }
        },*/
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        required: [true, "isAdmin is required"],
    },
    isStudent: {
        type: Boolean,
        required: [true, "Student or Teacher is required"],
    },
    isTeacher: {
        type: Boolean,
        required: [true, "Student or Teacher is required"],
    },
    status: {
        type: String,
        required: [true, "Status is required"],
    },
    city: { // TODO: select from list instead of free text
        type: String,
        required: [true, "City is required"],
    },
    availability: String,
    date: {
        type: Date,
        required: [true, "Start date is required"],
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
},{timestamps: true}); // add createdAt and updatedAt

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);

    // if both isStudent and isTeacher are false, prevent saving
    if (!this.isStudent && !this.isTeacher) {
        throw new Error("User must be either a student or a teacher");
    }
    next();
});

// eslint-disable-next-line prefer-arrow-callback
userSchema.pre(/^find/, async function (next) {
    next();
});

module.exports = mongoose.model('User', userSchema);