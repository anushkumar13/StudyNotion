// imports

import { createSlice } from "@reduxjs/toolkit";





    {/*   Yeh initialState object mein hum 3 properties define kar rahe hain: signupData, loading, aur token. signupData initially null set hai, jo future mein user ke signup data ko store karega. loading bhi false pe set hai, jo batata hai ki koi process chal raha hai ya nahi (e.g., API call). Aur token mein hum localStorage se token ko fetch kar rahe hain. Agar localStorage mein "token" exist karta hai, toh usse parse karke store kar rahe hain, agar nahi toh null set ho jaata hai.   */}

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};




    {/*   authSlice ek Redux slice hai jo createSlice function se banaya gaya hai. Ismein humne name ko "auth" diya hai, jo slice ka naam hai. Fir initialState ko initial state set kiya hai, jo pehle discuss kiya gaya tha. reducers mein 3 functions hain: setSignupData, setLoading, aur setToken. Har function state ko update karta hai. setSignupData mein hum state.signupData ko payload ke value se update karte hain, jo signup data ko store karega. setLoading mein hum state.loading ko payload ke value se update karte hain, jo loading status ko represent karega. setToken mein hum state.token ko payload ke value se update karte hain, jo user ke authentication token ko store karega.   */}

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