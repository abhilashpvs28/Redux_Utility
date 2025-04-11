import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import utilityReducer from './features/auth/utilitySlice'

const savedAuth = localStorage.getItem('auth');
const initialAuthState = savedAuth ? JSON.parse(savedAuth) : {
    user:null,
    token:null
}

 const store = configureStore({
    reducer:{
        auth:authReducer,
        utility: utilityReducer
    },
    preloadedState:{
        auth: initialAuthState
    }
});


export default store;