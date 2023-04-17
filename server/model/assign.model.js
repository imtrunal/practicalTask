const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const assignSchema = new mongoose.Schema({
    departmentId: {
        type: ObjectId,
        required: true
    },
    employeeID: {
        type: ObjectId,
        required: true
    }
}, {
    timestamps: true
}, {
    collection: "assign"
}
);

module.exports = mongoose.model("assign", assignSchema);