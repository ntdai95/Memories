import express from "express";
import auth from "../middleware/auth.js";
import {
    createMemory,
    deleteMemory,
    getRelatedMemories,
    getMemory,
    getMemories,
    getMemoriesBySearch,
    getMemoriesByTag,
    getMemoriesByUser,
    likeMemory,
    updateMemory,
} from "../controllers/memory.js";

const router = express.Router();
router.get("/search", getMemoriesBySearch);
router.get("/tag/:tag", getMemoriesByTag);
router.post("/relatedMemories", getRelatedMemories);
router.get("/", getMemories);
router.get("/:id", getMemory);
router.post("/", auth, createMemory);
router.delete("/:id", auth, deleteMemory);
router.patch("/:id", auth, updateMemory);
router.get("/userMemories/:id", auth, getMemoriesByUser);
router.patch("/like/:id", auth, likeMemory);

export default router;