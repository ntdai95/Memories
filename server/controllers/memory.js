import MemoryModal from "../models/memory.js";
import mongoose from "mongoose";

export const createMemory = async (req, res) => {
    const memory = req.body;
    const newMemory = new MemoryModal({
        ...memory,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });

    try {
        await newMemory.save();
        res.status(201).json(newMemory);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getMemories = async (req, res) => {
    const { page } = req.query;
    try {
        const limit = 6;
        const startIndex = (Number(page) - 1) * limit;
        const total = await MemoryModal.countDocuments({});
        const memories = await MemoryModal.find().limit(limit).skip(startIndex);
        res.status(200).json({
            data: memories,
            currentPage: Number(page),
            totalMemories: total,
            numberOfPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getMemory = async (req, res) => {
    const { id } = req.params;
    try {
        const memory = await MemoryModal.findById(id);
        res.status(200).json(memory);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getMemoriesByUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "User doesn't exist" });

    const userMemories = await MemoryModal.find({ creator: id });
    res.status(200).json(userMemories);
};

export const deleteMemory = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No memory exist with id: ${id}` });

        await MemoryModal.findByIdAndRemove(id);
        res.status(200).json({ message: "Memory deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const updateMemory = async (req, res) => {
    const { id } = req.params;
    const { title, description, creator, imageFile, tags } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No memory exist with id: ${id}` });

        const updatedMemory = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id: id,
        };

        await MemoryModal.findByIdAndUpdate(id, updatedMemory, { new: true });
        res.status(200).json(updatedMemory);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getMemoriesBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const memories = await MemoryModal.find({ title });
        res.status(200).json(memories);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getMemoriesByTag = async (req, res) => {
    const { tag } = req.params;
    try {
        const memories = await MemoryModal.find({ tags: { $in: tag } });
        res.status(200).json(memories);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getRelatedMemories = async (req, res) => {
    const tags = req.body;
    try {
        const memories = await MemoryModal.find({ tags: { $in: tags } });
        res.status(200).json(memories);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const likeMemory = async (req, res) => {
    const { id } = req.params;
    try {
        if (!req.userId) return res.status(400).json({ message: "User is not authenticated" });

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No memory exist with id: ${id}` });

        const memory = await MemoryModal.findById(id);
        const index = memory.likes.findIndex((id) => id === String(req.userId));
        if (index === -1) {
            memory.likes.push(req.userId);
        } else {
            memory.likes = memory.likes.filter((id) => id !== String(req.userId));
        }

        const updatedMemory = await MemoryModal.findByIdAndUpdate(id, memory, {
            new: true,
        });

        res.status(200).json(updatedMemory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};