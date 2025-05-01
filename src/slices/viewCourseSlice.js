//   imports

import { createSlice } from "@reduxjs/toolkit"




    {/*   Yeh initialState ek object hai jo course se related data ko manage karta hai. Isme chaar properties hain: courseSectionData, jo ki ek empty array hai, jisme course ke sections ka data store hoga; courseEntireData, jo poore course ka data rakhega; completedLectures, jo ek empty array hai jisme wo lectures store honge jo user ne complete kiye hain; aur totalNoOfLectures, jo ek number hai (initially 0) aur course ke total lectures ki count rakhega.   */}

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
}




    {/*   Yeh viewCourseSlice ek Redux slice hai jo course-related data ko manage karta hai. Ismein initialState se course ke sections, poore course ka data, lectures ke total number, aur completed lectures ko store karne wale reducers hain. setCourseSectionData reducer course ke sections ka data update karta hai, setEntireCourseData poore course ka data update karta hai, setTotalNoOfLectures total lectures ki count update karta hai, setCompletedLectures completed lectures ki list update karta hai, aur updateCompletedLectures ek naye lecture ko completed lectures mein add karta hai.   */}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {

    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },

    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },

    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },

    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },

    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
    
  },
})




    {/*   Yeh code Redux slice ka part hai jisme viewCourseSlice se kuch actions ko destructure kiya gaya hai. Actions hain: setCourseSectionData, setEntireCourseData, setTotalNoOfLectures, setCompletedLectures, aur updateCompletedLectures. In actions ka use Redux store mein course ke data ko update karne ke liye kiya jaayega. Jaise hi action dispatch hoga, usse related state ko update kiya jayega.   */}

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions





export default viewCourseSlice.reducer