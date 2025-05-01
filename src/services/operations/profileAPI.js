// imports

import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"





    {/*   Is line mein hum profileEndpoints object se 3 API endpoints ko destructure kar rahe hain:     GET_USER_DETAILS_API – yeh user ke personal details fetch karne ke liye use hoti hai.     GET_USER_ENROLLED_COURSES_API – yeh user ke enrolled courses fetch karne ke liye hai.     GET_INSTRUCTOR_DATA_API – yeh kisi instructor ke related data lane ke kaam aati hai.   */}

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints





    {/*   getUserDetails(token, navigate) ek async Redux thunk action hai jo backend se user ke details fetch karta hai. Sabse pehle ek loading toast show hota hai aur setLoading(true) dispatch karke loading state ko true karta hai. Fir apiConnector function ke through GET_USER_DETAILS_API ko call karta hai GET method ke saath, jisme token authorization ke liye bheja jaata hai. Agar API ka response success nahi deta, toh error throw hoti hai. Agar response aata hai, toh userImage ko set karte hain: agar user ka image present ho toh use karte hain, warna ek dummy image banate hain using DiceBear initials (user ke firstName aur lastName se). Fir setUser action dispatch hota hai jisme user ka data aur image Redux store mein save hota hai. Agar koi error aata hai toh logout(navigate) call hota hai jo user ko logout karke navigate kar deta hai, aur error toast show hota hai. Last mein, loading toast dismiss karte hain aur setLoading(false) se loading state false ho jaata hai.   */}

export function getUserDetails(token, navigate) {

  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })

      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } 
    
    catch (error) {

      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }

    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}





    {/*   Yeh ek async function hai jo backend se user ke enrolled courses ka data fetch karta hai. Sabse pehle ek loading toast dikhaate hain aur result ko empty array se initialize karte hain. Phir ek console log hota hai jo batata hai ki backend API call karne wale hain. Uske baad apiConnector function ko call karte hain GET method ke saath aur GET_USER_ENROLLED_COURSES_API endpoint pe, jisme token authorization ke header mein bhejte hain. Jab API ka response milta hai, toh console log hota hai ki API call complete ho gaya. Agar response success nahi deta, toh error throw kar dete hain. Agar response sahi hai, toh uske andar se data nikaal kar result mein daal dete hain. Agar try block mein koi bhi error aata hai toh catch block usse handle karta hai, error console pe log karta hai aur ek toast dikhata hai "Could Not Get Enrolled Courses". Finally, loading toast ko dismiss karte hain aur result return karte hain.   */}

export async function getUserEnrolledCourses(token) {

  const toastId = toast.loading("Loading...")
  let result = []

  try {

    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
  

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } 
  
  catch (error) {

    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }

  toast.dismiss(toastId)
  return result
}





    {/*   Yeh ek async function hai jo kisi instructor ke courses ka data backend se fetch karta hai. Sabse pehle ek loading toast show hota hai aur result ko empty array se initialize kar dete hain. apiConnector function ko call karte hain GET method ke saath aur GET_INSTRUCTOR_DATA_API endpoint pe, jisme Authorization header mein token bheja jaata hai. Agar API response successfully aata hai, toh response.data.courses ko result mein store kar lete hain. Agar koi error aata hai toh catch block usse console pe log karta hai aur toast mein message dikhata hai "Could not Get Instructor Data". Aakhir mein, loading toast dismiss karte hain aur result return karte hain.   */}

export async function getInstructorData(token) {

  const toastId = toast.loading("Loading...");
  let result = [];

  try{

    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses

  }

  catch(error) {

    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }

  toast.dismiss(toastId);
  return result;
}