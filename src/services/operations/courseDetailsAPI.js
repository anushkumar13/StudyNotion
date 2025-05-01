// imports

import { toast } from "react-hot-toast"
import { updateCompletedLectures } from "../../slices/viewCourseSlice"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"





    {/*   is line mein hum courseEndpoints object se multiple course-related API endpoints ko destructure kar rahe hain, jisse har ek endpoint ko alag-alag variable ke through easily access kiya ja sake bina baar-baar courseEndpoints.XYZ likhe.   */}

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints





    {/*   getAllCourses ek async function hai jo saare courses fetch karta hai. Shuru mein ek loading toast dikhaya jata hai, phir apiConnector se GET_ALL_COURSE_API ko GET request bheji jati hai. Agar response success nahi hota, toh error throw hota hai aur error toast show hota hai. Agar sab kuch theek hota hai, toh saare courses result mein store ho jaate hain. Last mein loading toast dismiss hota hai aur result return kiya jata hai.   */}

export const getAllCourses = async () => {

  const toastId = toast.loading("Loading...")
  let result = []
  
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } 
  
  catch (error) {
    console.log("GET_ALL_COURSE_API API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)

  return result
}





    {/*   fetchCourseDetails function ek specific course ke details backend se fetch karta hai. Start mein ek loading toast show hota hai, fir apiConnector ke through COURSE_DETAILS_API pe POST request jaati hai jisme courseId bheja jata hai. Agar response successful hota hai, toh result mein course data store hota hai. Agar koi error aata hai, toh catch block us error ko handle karta hai aur result mein error response store hota hai. Last mein loading toast dismiss kar diya jata hai aur result return hota hai.   */}

export const fetchCourseDetails = async (courseId) => {

  const toastId = toast.loading("Loading...")

  let result = null

  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } 
  
  catch (error) {

    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    
  }

  toast.dismiss(toastId)
 
  return result
}






    {/*   fetchCourseCategories function backend se saari course categories ko fetch karta hai. Pehle apiConnector se COURSE_CATEGORIES_API pe GET request bheji jaati hai. Agar response success hota hai to result me categories store hoti hain. Agar koi error aata hai to catch block me console log aur toast error dikhaya jata hai. Finally result return hota hai.   */}

export const fetchCourseCategories = async () => {

  let result = []

  try {

    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
    console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
    
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } 
  
  catch (error) {

    console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }

  return result
}






    {/*   addCourseDetails function instructor ke course details ko backend pe bhejne ke liye use hota hai. Yeh CREATE_COURSE_API pe POST request bhejta hai jisme data (jaise title, description, thumbnail etc.) aur token bheja jata hai. Header me multipart/form-data set hota hai kyunki image ya file bhi ja sakti hai. Agar response success hota hai toh success toast aata hai aur data result me store hota hai. Error aane par error toast show hota hai. Last me loading toast dismiss hota hai aur result return hota hai.   */}

export const addCourseDetails = async (data, token) => {

  let result = null
  const toastId = toast.loading("Loading...")

  try {

    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COURSE API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }

    toast.success("Course Details Added Successfully")
    result = response?.data?.data

  } 
  
  catch (error) {
    console.log("CREATE COURSE API ERROR............", error)

    toast.error(error.message)
  }

  toast.dismiss(toastId)

  return result
}






    {/*   editCourseDetails function kisi existing course ki details update karne ke kaam aata hai. Yeh backend pe EDIT_COURSE_API ko call karta hai POST method se, aur saath me data (naye details) aur token bhejta hai authorization ke liye. Agar update successful hota hai to success toast dikhata hai, aur updated data ko result me store karta hai. Agar error aata hai to error toast dikhata hai. End me loading toast hata deta hai aur result return karta hai.   */}

export const editCourseDetails = async (data, token) => {

  let result = null

  const toastId = toast.loading("Loading...")

  try {

    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    console.log("EDIT COURSE API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }

    toast.success("Course Details Updated Successfully")
    result = response?.data?.data

  } 
  
  catch (error) {

    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}






    {/*   createSection function course ke andar ek naya section create karne ke liye use hota hai. Isme hum data aur token bhejte hain, aur yeh backend API CREATE_SECTION_API ko call karta hai POST method se. Agar section ban jata hai to success toast show hota hai, aur updated course ko return karta hai. Agar koi error hota hai to error toast dikhata hai. End me loading toast dismiss kar deta hai.   */}

export const createSection = async (data, token) => {

  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log("CREATE SECTION API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }

    toast.success("Course Section Created")

    result = response?.data?.updatedCourse
  } 
  
  catch (error) {

    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}






    {/*   createSubSection function ek section ke andar ek new lecture (sub-section) add karne ke kaam aata hai. Isme data aur token ke sath CREATE_SUBSECTION_API ko POST request bhejte hain. Agar lecture successfully add ho jata hai to success toast dikhata hai aur result me updated data return karta hai. Agar error aaye to error toast show karta hai. End me loading toast ko hata deta hai.   */}

export const createSubSection = async (data, token) => {

  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log("CREATE SUB-SECTION API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }

    toast.success("Lecture Added")
    result = response?.data?.data

  } 
  
  catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}






    {/*   updateSection function already existing course section ko update karne ke liye use hota hai. Isme data aur token ke sath UPDATE_SECTION_API ko POST request bhejate hain. Agar section successfully update ho jata hai to success toast dikhata hai aur updated data ko result me return karta hai. Agar error hota hai to error toast show karta hai. End me loading toast ko dismiss kar deta hai.   */}

export const updateSection = async (data, token) => {

  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log("UPDATE SECTION API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }

    toast.success("Course Section Updated")
    result = response?.data?.data
  } 
  
  catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}






    {/*   updateSubSection function ek existing lecture (sub-section) ko update karne ke liye use hota hai. Isme data aur token ko UPDATE_SUBSECTION_API ke saath POST request bhejte hain. Agar lecture successfully update ho jata hai to success toast dikhata hai aur updated data ko result me return karta hai. Agar koi error hota hai to error toast show karta hai. End me loading toast ko dismiss kar deta hai.   */}

export const updateSubSection = async (data, token) => {

  let result = null
  const toastId = toast.loading("Loading...")

  try {
    
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log("UPDATE SUB-SECTION API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }

    toast.success("Lecture Updated")
    result = response?.data?.data

  } 
  
  catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}






    {/*   deleteSection function ka use course section ko delete karne ke liye hota hai. Isme data (section details) aur token ko DELETE_SECTION_API ke saath POST request ke through bheja jata hai. Agar deletion successful hota hai to success toast dikhata hai aur updated course data ko result me return karta hai. Agar koi error hota hai to error toast show karta hai. End me loading toast ko dismiss kar diya jata hai.   */}

export const deleteSection = async (data, token) => {

  let result = null
  const toastId = toast.loading("Loading...")

  try {

    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    
    console.log("DELETE SECTION API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }

    toast.success("Course Section Deleted")
    result = response?.data?.data

  } 
  
  catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}





    {/*   deleteSubSection function ka use course lecture ko delete karne ke liye hota hai. Yaha pe data (lecture details) aur token ko DELETE_SUBSECTION_API ke saath POST request bheja jata hai. Agar deletion successful hota hai to success toast dikhata hai aur updated data ko result me store karke return karta hai. Agar koi error hota hai to error toast show hota hai. Aur loading toast ko dismiss kar diya jata hai.   */}

export const deleteSubSection = async (data, token) => {

  let result = null
  const toastId = toast.loading("Loading...")

  try {

    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }

    toast.success("Lecture Deleted")
    result = response?.data?.data

  } 
  
  catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}





    {/*   Yeh fetchInstructorCourses function instructor ke dwara diye gaye courses ko fetch karta hai. Isme hum GET request bhejte hain GET_ALL_INSTRUCTOR_COURSES_API endpoint pe, jisme instructor ka token Authorization header mein pass kiya jata hai. Agar API ka response successful hota hai, to wo courses ko result variable mein store kar leta hai aur return kar deta hai. Agar koi error hota hai, to wo error message ko toast.error ke through show karta hai aur console mein error log karta hai taaki debugging ho sake. Aur jab API call complete ho jata hai, to loading toast ko dismiss kar diya jata hai.   */}

export const fetchInstructorCourses = async (token) => {

  let result = []
  const toastId = toast.loading("Loading...")

  try {

    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("INSTRUCTOR COURSES API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data

  } 
  
  catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}





    {/*   Yeh deleteCourse function course ko delete karne ke liye use hota hai. Hum DELETE request bhejte hain DELETE_COURSE_API endpoint pe, aur authorization ke liye instructor ka token pass karte hain. Agar API ka response successful hota hai, to course delete kar diya jata hai aur ek success message toast ke through dikhaya jata hai. Agar koi error hota hai, to wo error message ko toast.error ke through show karte hain aur console mein error log karte hain. Function ke end mein, loading toast ko dismiss kar diya jata hai.   */}

export const deleteCourse = async (data, token) => {

  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log("DELETE COURSE API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }

    toast.success("Course Deleted")

  } 
  
  catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
}





    {/*   Yeh getFullDetailsOfCourse function ek specific course ke full authenticated details lane ke liye banaya gaya hai. Jab yeh function call hota hai, tab sabse pehle ek loading toast show hota hai jisse user ko lage ki kuch ho raha hai. Uske baad apiConnector ke through POST request bheji jaati hai GET_FULL_COURSE_DETAILS_AUTHENTICATED API par, jisme courseId bheja jaata hai aur authorization ke liye token header mein diya jaata hai. Agar API se response success hota hai to result mein course ka detailed data store ho jaata hai. Agar response fail hota hai ya koi error aata hai to catch block mein jaake error ko console mein log karte hain aur result mein error response store karte hain. Aakhir mein loading toast ko dismiss kar dete hain aur result return kar dete hain.   */}

export const getFullDetailsOfCourse = async (courseId, token) => {
  
  const toastId = toast.loading("Loading...")
  let result = null

  try {

    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data

  } 
  
  catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    
  }

  toast.dismiss(toastId)
  
  return result
}





    {/*   Yeh markLectureAsComplete function ka kaam hai ek lecture ko complete mark karna jab student ne usse dekh liya ho. Function start hote hi console mein data log hota hai fir ek loading toast dikhaya jaata hai. Phir apiConnector se POST request jaati hai LECTURE_COMPLETION_API par jisme data aur token bheja jaata hai. Agar response mein message nahi milta matlab kuch gadbad hai, to error throw kar dete hain. Agar sab kuch sahi chalta hai to ek success toast show hota hai "Lecture Completed" aur result ko true set karte hain. Agar koi error aata hai to catch block chalega jahan error console mein aayega, toast se error dikhate hain aur result = false kar dete hain. End mein toast dismiss karte hain aur result return karte hain.   */}

export const markLectureAsComplete = async (data, token) => {

  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")

  try {

    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }

    toast.success("Lecture Completed")
    result = true
  } 
  
  catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }

  toast.dismiss(toastId)
  return result
}





    {/*   Yeh createRating function ka kaam hai course ke liye rating create karna jab student feedback deta hai. Function start hote hi ek toast loading show hota hai aur success ko false set karte hain. Fir apiConnector se CREATE_RATING_API par POST request bhejte hain jisme data (jaise rating, review) aur token diya jaata hai. Agar response mein success false hota hai to error throw kar dete hain. Agar sab sahi chalta hai to ek success toast dikhate hain "Rating Created" aur success = true set kar dete hain. Agar koi error hota hai to catch block chalega, error ko console mein log karte hain, error toast dikhate hain aur success = false hi rehta hai. End mein loading toast hata dete hain aur success return karte hain.   */}

export const createRating = async (data, token) => {

  const toastId = toast.loading("Loading...")
  let success = false

  try {

    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })

    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } 
  
  catch (error) {

    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return success
}