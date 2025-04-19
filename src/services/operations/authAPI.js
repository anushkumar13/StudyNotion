// imports

import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"




const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints





      {/* OTP */}

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))


    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)


      if (!response.data.success) {
        throw new Error(response.data.message)
      }


      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } 
    
    
    catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}





      {/* jaise hi signup button click hoga ye code backend (controllers) ko call karega */}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {


  

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))


    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })


      console.log("SIGNUP API RESPONSE............", response)


      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } 
    
    
    catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}





      {/* jaise hi login button click hoga ye code backend (controllers) ko call karega */}

export function login(email, password, navigate) {
  
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))


    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)


      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } 
    
    
    catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}





      {/* logout */}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")          // Ye code localStorage se "token" naam wali item ko permanently delete kar deta hai — jisse user logout ya session clear ho jata hai.
    localStorage.removeItem("user")           // Ye code localStorage se "user" naam wali value ko delete karta hai — yani browser ke memory se user ki saved info hata di jaati hai (jaise login ke time save hui details).
    toast.success("Logged Out")
    navigate("/")
  }
}





      {/* getPasswordResetToken */} 

export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));       // jab tak backend me call jaa rahi hai tab tak loading ko true mark kardo jisse spinner dikhne lag jaega


    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})      // apiConnector ka use karke hum RESETPASSTOKEN_API api call kar rahe hain, POST type hai aur email ko pass kiya gya hai

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {       
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);                   // email sent ho gya hia to isko true mark kardo kyuki check your email wala page dikhana hai
    }


    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));           // loading ko false kardo mtlb spinner mat dikhao
  }
}




      {/* resetPassword */}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));


    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});           // apiConnector ka use karke hum RESETPASSWORD_API api call kar rahe hain, POST type hai aur email ko pass kiya gya hai

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }


    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));

  }
}





// iss file mein hum bas functions bna rahe hai jo bs uss feature ke liye backend call kar rahe hain.
// iss file mein jo functions likha hai usme koi alag se logic nahi likha gya hai bas backend me call lga rahe hain