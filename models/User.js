import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String},
    role: {type: String, required: true, enum: ['admin', 'user'], default: 'user'},
})

const User = mongoose.model('User', userSchema);
export default User;