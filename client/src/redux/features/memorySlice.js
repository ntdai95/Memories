import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createMemory = createAsyncThunk("memory/createMemory", async ({ updatedMemoryData, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.createMemory(updatedMemoryData);
            toast.success("Memory Added Successfully");
            navigate("/");

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getMemories = createAsyncThunk("memory/getMemories", async (page, { rejectWithValue }) => {
        try {
            const response = await api.getMemories(page);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getMemory = createAsyncThunk("memory/getMemory", async (id, { rejectWithValue }) => {
        try {
            const response = await api.getMemory(id);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const likeMemory = createAsyncThunk("memory/likeMemory", async ({ _id }, { rejectWithValue }) => {
        try {
            const response = await api.likeMemory(_id);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getMemoriesByUser = createAsyncThunk("memory/getMemoriesByUser", async (userId, { rejectWithValue }) => {
        try {
            const response = await api.getMemoriesByUser(userId);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteMemory = createAsyncThunk("memory/deleteMemory", async ({ id, toast }, { rejectWithValue }) => {
        try {
            const response = await api.deleteMemory(id);
            toast.success("Memory Deleted Successfully");

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateMemory = createAsyncThunk("memory/updateMemory", async ({ id, updatedMemoryData, toast, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.updateMemory(updatedMemoryData, id);
            toast.success("Memory Updated Successfully");
            navigate("/");

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const searchMemories = createAsyncThunk("memory/searchMemories", async (searchQuery, { rejectWithValue }) => {
        try {
            const response = await api.getMemoriesBySearch(searchQuery);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getMemoriesByTag = createAsyncThunk("memory/getMemoriesByTag", async (tag, { rejectWithValue }) => {
        try {
            const response = await api.getTagMemories(tag);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getRelatedMemories = createAsyncThunk("memory/getRelatedMemories", async (tags, { rejectWithValue }) => {
        try {
            const response = await api.getRelatedMemories(tags);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const memorySlice = createSlice({
    name: "memory",
    initialState: {
        memory: {},
        memories: [],
        userMemories: [],
        tagMemories: [],
        relatedMemories: [],
        currentPage: 1,
        numberOfPages: null,
        error: "",
        loading: false,
    },
    reducers: {
        setCurrentPage: (state, action) => { state.currentPage = action.payload; },
    },
    extraReducers: {
        [createMemory.pending]: (state, action) => { state.loading = true; },
        [createMemory.fulfilled]: (state, action) => {
            state.loading = false;
            state.memories = [action.payload];
        },
        [createMemory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getMemories.pending]: (state, action) => { state.loading = true; },
        [getMemories.fulfilled]: (state, action) => {
            state.loading = false;
            state.memories = action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        },
        [getMemories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getMemory.pending]: (state, action) => { state.loading = true; },
        [getMemory.fulfilled]: (state, action) => {
            state.loading = false;
            state.memory = action.payload;
        },
        [getMemory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getMemoriesByUser.pending]: (state, action) => { state.loading = true; },
        [getMemoriesByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userMemories = action.payload;
        },
        [getMemoriesByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteMemory.pending]: (state, action) => { state.loading = true; },
        [deleteMemory.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: { id } } = action.meta;
            if (id) {
                state.userMemories = state.userMemories.filter((item) => item._id !== id);
                state.memories = state.memories.filter((item) => item._id !== id);
            }
        },
        [deleteMemory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateMemory.pending]: (state, action) => { state.loading = true; },
        [updateMemory.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: { id } } = action.meta;
            if (id) {
                state.userMemories = state.userMemories.map((item) => item._id === id ? action.payload : item);
                state.memories = state.memories.map((item) => item._id === id ? action.payload : item);
            }
        },
        [updateMemory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [likeMemory.pending]: (state, action) => {},
        [likeMemory.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: { _id } } = action.meta;
            if (_id) {
                state.memories = state.memories.map((item) => item._id === _id ? action.payload : item);
            }
        },
        [likeMemory.rejected]: (state, action) => { state.error = action.payload.message; },
        [searchMemories.pending]: (state, action) => { state.loading = true; },
        [searchMemories.fulfilled]: (state, action) => {
            state.loading = false;
            state.memories = action.payload;
        },
        [searchMemories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getMemoriesByTag.pending]: (state, action) => { state.loading = true; },
        [getMemoriesByTag.fulfilled]: (state, action) => {
            state.loading = false;
            state.tagMemories = action.payload;
        },
        [getMemoriesByTag.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getRelatedMemories.pending]: (state, action) => { state.loading = true; },
        [getRelatedMemories.fulfilled]: (state, action) => {
            state.loading = false;
            state.relatedMemories = action.payload;
        },
        [getRelatedMemories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export const { setCurrentPage } = memorySlice.actions;

export default memorySlice.reducer;