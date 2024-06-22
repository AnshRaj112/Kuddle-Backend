const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); 
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /@kiit\.ac\.in$/.test(v); 
            },
            message: props => `${props.value} is not a valid KIIT email!`
        }
    },
    year: {
        type: String,
        enum: ['Year 1', 'Year 2', 'Year 3', 'Year 4'], 
        required: true,
    },
    branch: {
        type: String,
        enum: ['Civil Engineering', 'Mechanical Engineering', 'Mechanical Engineering (Automobile)', 'Electrical Engineering', 'Electronics & Tele-Communication Engineering', 'Computer Science Engineering', 'Information Technology', 'Electronics & Electrical Engineering', 'Electronics and Instrumentation', 'Aerospace Engineering', 'Mechatronics Engineering', 'Production Engineering', 'Electronics and Computer Science Engineering', 'Communication Engineering', 'Medical Electronics Engineering','Computer Science & Communication Engineering', 'Computer Science & Systems Engineering', 'Chemical Technology'], // Example branches, adjust as necessary
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value === this.password; 
            },
            message: props => 'Passwords do not match!'
        }
    },
    isAvatarImageSet :{
        type: Boolean,
        default: false,
    },
    AvatarImage: {
        type: String,
        default: "",
    },
    
});

module.exports = mongoose.model("User", userSchema);
