import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const createApiThunk = (name , method, endpointFn) => {
    return createAsyncThunk(name, async (data, thunkAPI) => {
        try {
            const res = await api[method](endpointFn(data), data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    });
};
