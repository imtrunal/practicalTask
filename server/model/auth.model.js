const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require("dotenv").config()

const authSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: Number,  // 1-male 2-female 3-other
        required: true
    },
    hobbies:{
        type: Array,
        required: true
    },
    role: {
        type: Number, // 1-Employee 2-Manager
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,   // 6-digit
        required: true,
    },
    token: {
        type: String
    }
}, {
    timestamps: true
}, {
    collection: "auth"
}
);

authSchema.methods.generateauthtoken = async function () {
    try {
        const t = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.tokens = t
        await this.save();
        return t;
    }
    catch (err) {
        console.log("err", err);
    }
}

module.exports = mongoose.model("auth", authSchema);