import axios from "axios";

const API = axios.create({
    baseURL: `http://localhost:5000`,
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const createMemory = (memoryData) => API.post("/memory", memoryData);
export const getMemories = (page) => API.get(`/memory?page=${page}`);
export const getMemory = (id) => API.get(`/memory/${id}`);
export const deleteMemory = (id) => API.delete(`/memory/${id}`);
export const updateMemory = (updatedMemoryData, id) => API.patch(`/memory/${id}`, updatedMemoryData);
export const getMemoriesByUser = (userId) => API.get(`/memory/userMemories/${userId}`);
export const getMemoriesBySearch = (searchQuery) => API.get(`/memory/search?searchQuery=${searchQuery}`);
export const getTagMemories = (tag) => API.get(`/memory/tag/${tag}`);
export const getRelatedMemories = (tags) => API.post(`/memory/relatedMemories`, tags);
export const likeMemory = (id) => API.patch(`/memory/like/${id}`);