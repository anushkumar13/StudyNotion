// imports

import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"





    {/*   Yeh line ek object destructuring hai jo settingsEndpoints object ke andar se 4 API endpoints ko extract karti hai: UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API, aur DELETE_PROFILE_API. Iska matlab hai ki ab in 4 variables ko directly use kar sakte ho bina settingsEndpoints.UPDATE_DISPLAY_PICTURE_API likhe.   */}

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints





    {/*   Yeh function ek Redux thunk hai jo user ki display picture ko update karta hai. Sabse pehle ek loading toast dikhate hain, fir apiConnector function ko PUT method ke saath call karte hain UPDATE_DISPLAY_PICTURE_API endpoint pe, jisme formData aur Authorization header (Bearer token ke saath) diya jaata hai. Agar API response success return karta hai toh success toast show hoti hai aur Redux store mein user data ko setUser ke through update kar dete hain. Agar API fail hoti hai ya koi error aata hai toh usse console mein log karte hain aur error toast dikhate hain. Finally, loading toast ko dismiss kar dete hain.   */}

export function updateDisplayPicture(token, formData) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } 
    
    catch (error) {

      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }

    toast.dismiss(toastId)
  }
}





    {/*   Yeh function bhi ek Redux thunk hai jo user ka profile update karta hai. Sabse pehle ek loading toast dikhate hain, fir apiConnector function ko PUT method ke saath call karte hain UPDATE_PROFILE_API endpoint pe, jisme formData aur Authorization header (Bearer token ke saath) diya jaata hai. Agar API response success return karta hai, toh updated user details ko handle karte hain. Agar user ki image available ho, toh woh use karte hain, nahi toh ek default image generate karte hain. Uske baad setUser action ke through Redux store ko update karte hain. Success toast dikhata hai. Agar API fail hoti hai ya koi error aata hai, toh error ko console mein log karte hain aur error toast show karte hain. Last mein loading toast dismiss kar dete hain.   */}
 
export function updateProfile(token, formData) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    try {

      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      
        dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      )

      toast.success("Profile Updated Successfully")
    } 
    
    catch (error) {

      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }

    toast.dismiss(toastId)
  }
}





    {/*   Yeh function password change karne ke liye kaam karta hai. Sabse pehle ek loading toast show karte hain, fir apiConnector function ko POST method ke saath call karte hain CHANGE_PASSWORD_API endpoint pe, jisme formData (new password ki details) aur Authorization header ke saath Bearer token diya jaata hai. Agar response success hota hai, toh success toast show karte hain. Agar koi error aati hai, toh error ko console mein log karte hain aur user ko toast ke through error message dikhate hain. Aur akhir mein loading toast dismiss karte hain.   */}

export async function changePassword(token, formData) {

  const toastId = toast.loading("Loading...")

  try {

    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Password Changed Successfully")

  } 
  
  catch (error) {

    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }

  toast.dismiss(toastId)
}





    {/*   Yeh function user ke profile ko delete karne ke liye kaam karta hai. Sabse pehle loading toast show kiya jaata hai. Phir apiConnector function ko DELETE method ke saath call kiya jaata hai DELETE_PROFILE_API endpoint pe, jisme Authorization header ke saath Bearer token diya jaata hai. Agar response success hota hai, toh success toast show kiya jaata hai aur user ko logout kar diya jaata hai. Agar error hoti hai, toh error ko console mein log karte hain aur toast ke through user ko error message dikhate hain. Aur last mein loading toast dismiss karte hain.   */}

export function deleteProfile(token, navigate) {

  return async (dispatch) => {

    const toastId = toast.loading("Loading...")

    try {

      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })

      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } 
    
    catch (error) {

      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }

    toast.dismiss(toastId)
  }
}