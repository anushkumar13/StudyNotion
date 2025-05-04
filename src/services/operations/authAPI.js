// imports

import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"





{/*   yeh line endpoints object se kuch specific API endpoints ko destructure kar rahi hai:   */}

const {
  SENDOTP_API,                                                                           //  OTP bhejne ka endpoint.
  SIGNUP_API,                                                                            //  User signup ka endpoint.
  LOGIN_API,                                                                             //  User login ka endpoint.
  RESETPASSTOKEN_API,                                                                    //  Password reset token ka endpoint.
  RESETPASSWORD_API,                                                                     //  Password reset karne ka actual endpoint.
} = endpoints





    {/*   sendOtp function mein pehle ek loading toast dikhaya jata hai aur setLoading(true) se Redux state ko loading ke liye set kiya jata hai. Phir apiConnector ka use karke SENDOTP_API ko email aur checkUserPresent: true ke sath POST request bheja jata hai. Agar response success hota hai, toh success message toast dikhaya jata hai aur user ko /verify-email page pe navigate karne ke liye navigate("/verify-email") call kiya jata hai. Agar response fail hota hai, toh error throw karte hai aur toast mein error message dikhaya jata hai. Jab request complete hoti hai, setLoading(false) se loading state ko false karte hai aur toast.dismiss(toastId) se loading toast ko dismiss karte hai.   */}

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





    {/*   jaise hi signup button click hoga ye code backend (controllers) ko call karega   */}

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



  

    {/*   yeh code signup process ko handle karta hai. Pehle ek loading toast show hota hai (toast.loading("Loading...")), taaki user ko pata chale ki request chal rahi hai. Uske baad dispatch(setLoading(true)) ke through Redux state ko true set kiya jata hai, jo UI mein loading indicator ko trigger karta hai. Phir, apiConnector function ka use karke SIGNUP_API endpoint pe POST request send ki jati hai. Is request mein tumhare input values jaise accountType, firstName, lastName, email, password, confirmPassword, aur otp bheje ja rahe hain. Agar API response successful nahi hota (yaani response.data.success false hota hai), toh ek error throw kiya jata hai, jisse signup fail hone ka message dikhaya ja sake. Agar API response successful hota hai, toh next steps jaise success message show kiya jata hai aur further actions perform kiye jate hain. Finally, request ke complete hone ke baad, loading state ko false kar diya jata hai aur loading toast ko dismiss kar diya jata hai.   */}

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





    {/*   jaise hi login button click hoga ye code backend (controllers) ko call karega. login function mein pehle ek loading toast show hota hai aur setLoading(true) se Redux state ko loading ke liye set kiya jata hai. Phir apiConnector ka use karke LOGIN_API ko email aur password ke sath POST request bheja jata hai. Agar response success hota hai, toh success toast dikhaya jata hai, setToken ke through user ka token Redux state mein set hota hai aur user ka image set kiya jata hai. Agar user ka image available nahi hai, toh default image generate hoti hai. Uske baad setUser ke through user details Redux state mein store kiye jate hain, aur token aur user information ko localStorage mein store kiya jata hai. Finally, user ko /dashboard/my-profile page pe navigate kar diya jata hai. Agar response fail hota hai, toh error toast show hota hai aur setLoading(false) ke through loading state ko false kiya jata hai, phir loading toast ko dismiss kiya jata hai.   */}

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

      const userImage = response.data?.user?.image                                                                                                   //   Yeh line check karti hai: Agar user.image already available hai (matlab user ne image upload ki hai), to use wahi wali image.
        ? response.data.user.image 
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`                            //   Agar image nahi hai (null, undefined, etc.), to dicebear se ek default avatar bana do initials ke saath (first name + last name).
      
        dispatch(setUser({ ...response.data.user, image: userImage }))                                                                               //   Yeh line redux me user ki updated info store karti hai:
      
      localStorage.setItem("token", JSON.stringify(response.data.token))                                                                             //   Token ko localStorage me store karo. yani browser me save karo taki jab site reload ho to ye use ho sake
      localStorage.setItem("user", JSON.stringify(response.data.user))                                                                               //   User ke details (name, email, image...) ko bhi ocalStorage me daal do

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





    {/*   logout   */}

export function logout(navigate) {
  
  return (dispatch) => {

    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())

    localStorage.removeItem("token")                                                     //  Ye code localStorage se "token" naam wali item ko permanently delete kar deta hai — jisse user logout ya session clear ho jata hai.
    localStorage.removeItem("user")                                                      //  Ye code localStorage se "user" naam wali value ko delete karta hai — yani browser ke memory se user ki saved info hata di jaati hai (jaise login ke time save hui details).
    
    toast.success("Logged Out")
    navigate("/")
  }
}





    {/*   getPasswordResetToken function ka kaam hai user ke email pe password reset link bhejna. Function start hote hi setLoading(true) se Redux store mein loading ko true set kar diya jata hai taaki spinner dikhe. Fir apiConnector ke through RESETPASSTOKEN_API pe email ke sath POST request send hoti hai. Agar response successful hota hai, toh "Reset Email Sent" ka success toast show hota hai aur setEmailSent(true) se confirm page dikhane ke liye state update hoti hai. Agar koi error aata hai toh catch block mein jaake error console pe log hota hai aur ek error toast show kiya jata hai. End mein setLoading(false) se spinner hata diya jata hai.   */} 

export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));                                                          //  jab tak backend me call jaa rahi hai tab tak loading ko true mark kardo jisse spinner dikhne lag jaega


    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})          //  apiConnector ka use karke hum RESETPASSTOKEN_API api call kar rahe hain, POST type hai aur email ko pass kiya gya hai

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {       
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);                                                                //  email sent ho gya hia to isko true mark kardo kyuki check your email wala page dikhana hai
    }


    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));                                                         //  loading ko false kardo mtlb spinner mat dikhao
  }
}





    {/*   resetPassword function ka kaam hai backend ke through user ka password reset karwana. Sabse pehle setLoading(true) se Redux mein loading state active karte hain taaki spinner dikh sake. Uske baad apiConnector se RESETPASSWORD_API pe POST request bhejte hain jisme password, confirmPassword, aur token bheja jata hai. Agar response successful hota hai toh success toast show hota hai jisme bola jata hai ki password reset ho chuka hai. Agar response fail hota hai ya koi error aata hai toh catch block us error ko console pe log karta hai aur ek error toast display karta hai. Finally, loading complete hone ke baad setLoading(false) se spinner hata diya jata hai.   */}

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