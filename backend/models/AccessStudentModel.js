const mongoose = require('mongoose');

const accessStudentSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true }, // Added 'trim' to remove extra spaces
    mailID: { type: String, required: true, unique: true, lowercase: true }, // Ensure unique email and lowercase
    phone: { type: String, required: true, unique: true }, // Ensure unique phone numbers
    password: { type: String, required: true }, // Consider hashing the password for security
    collageid: { type: String, required: true },
    department: { type: String, required: true },
    coures: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    collection: 'AccessStudents'
})

const accessStudentModel = mongoose.model('AccessStudents', accessStudentSchema);
module.exports = accessStudentModel;