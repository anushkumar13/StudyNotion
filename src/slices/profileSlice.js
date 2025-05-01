// imports

import {createSlice} from "@reduxjs/toolkit"




    {/*   Yeh initialState ek object hai jo Redux state ke initial values ko set karta hai. Isme do properties hain: user aur loading. user ko localStorage se fetch kiya jaata hai agar wo localStorage mein saved ho, tab usko parse karke object bana diya jaata hai, warna null assign hota hai. Aur loading ko initial value false di gayi hai, jo batata hai ki koi loading process abhi chal nahi raha.   */}

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
};




    {/*   Yeh profileSlice Redux Toolkit ka ek slice hai jo profile-related actions ko handle karta hai. Iska name "profile" diya gaya hai aur initialState ko humne pehle define kiya tha. Isme do reducers hain: setUser aur setLoading. setUser action state.user ko value.payload se update karta hai, jo ki jo user data pass hota hai uska value hai. setLoading action state.loading ko value.payload se update karta hai, jo loading state ko manage karta hai (e.g. true ya false).   */}

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});





export const {setUser, setLoading} = profileSlice.actions;



 
export default profileSlice.reducer;