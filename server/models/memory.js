import mongoose from "mongoose";

const memorySchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likes: {
        type: [String],
        default: [],
    },
});

const MemoryModal = mongoose.model("Memory", memorySchema);

export default MemoryModal;