// imports

import { createSlice } from "@reduxjs/toolkit"




    {/*   Yeh ek initial state hai jo kisi Redux slice ke liye define kiya gaya hai. Ismein 4 properties hain: step, course, editCourse, aur paymentLoading. step ka initial value 1 hai, jo kisi process ke step ko represent karta hai, jaise ek multi-step form ya process. course ka value initially null hai, jo course ki information ko store karega jab data fetch hoga. editCourse ka initial value false hai, jo yeh batata hai ki course ko edit karne ka mode active nahi hai. Aur paymentLoading ka initial value false hai, jo yeh batata hai ki payment ka process load nahi ho raha hai.   */}

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
}




    {/*   Yeh courseSlice Redux ka ek slice hai, jisme hum course-related state ko manage kar rahe hain. createSlice ka name "course" hai, aur initialState mein jo initial values humne define ki hain. Isme kuch reducers hain jo specific actions handle karte hain. setStep action state mein step ko update karta hai, setCourse action course ko update karta hai, setEditCourse action editCourse ko set karta hai, aur setPaymentLoading action paymentLoading ko set karta hai. resetCourseState action state ko reset karta hai, jisme step ko 1, course ko null, aur editCourse ko false set kiya jata hai.   */}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setCourse: (state, action) => {
      state.course = action.payload
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetCourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
    },
  },
})




    {/*   Yeh code courseSlice se kuch actions ko destructure kar raha hai. setStep, setCourse, setEditCourse, setPaymentLoading, aur resetCourseState yeh sab actions hain jo hum courseSlice ke state ko update karne ke liye use karenge. Har action apne respective state properties ko set karne ka kaam karega. Jaise setStep course ke step ko set karega, setCourse course ko set karega, setEditCourse edit course ka state update karega, setPaymentLoading payment process ke loading state ko handle karega, aur resetCourseState course ke state ko reset karega.   */}

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions





export default courseSlice.reducer