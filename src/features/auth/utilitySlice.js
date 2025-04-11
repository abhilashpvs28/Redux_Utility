import { createSlice } from "@reduxjs/toolkit";
import {getUtilities, postUtility, updateUtility, deleteUtility } from "./utilityThunk";

const initialState = {
    utilities : [],
    loading: false,
    error: null
};

const utilitySlice = createSlice({
    name:"utility",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(getUtilities.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUtilities.fulfilled, (state,action) => {
            state.loading = false;
            state.utilities = action.payload.data;
        })
        .addCase(getUtilities.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(postUtility.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(postUtility.fulfilled, (state,action) => {
            state.loading = false;
            state.utilities.push(action.payload.data);
        })
        .addCase(postUtility.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(updateUtility.fulfilled, (state,action) => {
            const updated = action.payload.data;
            const index = state.utilities.findIndex((u) => u.id === updated.id)

            if(index !== -1){
                state.utilities[index] = updated;
            }
        })

        .addCase(updateUtility.rejected ,(state, action)=>{
            state.error = action.payload;
        })


        // Delete

        .addCase(deleteUtility.fulfilled,(state,action)=>{
            const deletedId = action.payload.data.id;
            state.utilities = state.utilities.filter((u) => u.id !== deletedId)

        })

        .addCase(deleteUtility.rejected, (state,action)=>{
            state.error = action.payload;
        })


    
    }
});


export default utilitySlice.reducer;

