// imports 

import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"





    {/*   rootReducer mein combineReducers ka use ho raha hai:     combineReducers: Ye multiple reducers ko ek single root reducer mein combine karne ka kaam karta hai.  Yahan par auth, profile, cart, course, aur viewCourse ke liye alag-alag reducers (authReducer, profileReducer, etc.) use kiye gaye hain. Iska matlab hai ki tumhare Redux state ka structure kuch is tarah hoga: auth state ko authReducer handle karega profile state ko profileReducer handle karega Aur baaki sab alag reducers handle karenge apne apne parts ko.   */}

const rootReducer  = combineReducers({
    auth: authReducer,                       
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
})




export default rootReducer