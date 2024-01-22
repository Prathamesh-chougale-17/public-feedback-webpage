import mongoose from "mongoose";

const UserformSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
        address: {
            type: String,
        },
        feedback: {
            type: String,
        },
        satisfaction: {
            type: String,
        },
        rating: {
            type: Number,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Userform", UserformSchema);