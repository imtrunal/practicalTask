const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
}, {
    collection: "department"
}
);

module.exports = mongoose.model("department", departmentSchema);