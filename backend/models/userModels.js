import mongoose from 'mongoose';

export const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number }
});

export const userSchema = new mongoose.Schema({
    userid: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});
export const User = mongoose.model('User', userSchema);
export const Counter = mongoose.model('Counter', counterSchema);