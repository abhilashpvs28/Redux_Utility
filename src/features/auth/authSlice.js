import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isLoading: true
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginSuccess : (state, action) => {
            state.user = action.payload.user,
            state.token = action.payload.token

            //save to local storage
            localStorage.setItem('auth', JSON.stringify({
                user: action.payload.user,
                token: action.payload.token
              }));
        },
        logout:(state) => {
            
            state.user = null;
            state.token = null;
            
            localStorage.removeItem('auth')

        },
        loadUserFromStorage: (state) => {
            const savedAuth = localStorage.getItem("auth");
            if (savedAuth) {
              try {
                const parsed = JSON.parse(savedAuth);
                if (parsed?.user && parsed?.token) {
                  state.user = parsed.user;
                  state.token = parsed.token;
                } else {
                  localStorage.removeItem("auth"); // Corrupt or empty data
                }
              } catch (err) {
                localStorage.removeItem("auth",err); // Invalid JSON
              }
            }
            state.isLoading = false; // Done loading
          }
    }
});

export const { loginSuccess, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;