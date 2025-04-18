// imports

import { createSlice } from "@reduxjs/toolkit";




     // initial state define kar rahe hain

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};




     // 

const authSlice = createSlice({
  name: "auth",                                // ye function me pass kar rahe hain
  initialState: initialState,                  // ye function me pass kar rahe hain
  reducers: {                                  // ye function me pass kar rahe hain
    
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});




export const { setSignupData, setLoading, setToken } = authSlice.actions;




export default authSlice.reducer;