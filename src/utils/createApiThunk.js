import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { showToast } from "./toastUtils";


export const createApiThunk = (name , method, endpointFn) => {

    return createAsyncThunk(name, async (data, thunkAPI) => {
        try {
            const res = await api[method](endpointFn(data), data);
            return res.data;
        } catch (err) {
            if(err.status === 403 && typeof data?.navigate === "function"){
                showToast("Session Expired. Please log in again", "warn");
                data.navigate("/login");
            } 
            
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    });
};
