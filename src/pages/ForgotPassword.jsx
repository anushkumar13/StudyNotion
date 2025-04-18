// imports

import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getPasswordResetToken } from "../services/operations/authAPI"




function ForgotPassword() {

  const [email, setEmail] = useState("")                   // email store karega taki ye dikha sake --> We have sent the reset email to kumarmall1308@gmail.com. isko empty string se initialize kiya gya hai

  const [emailSent, setEmailSent] = useState(false)        // email sent hua ki nahi ye uska flag hai shuru me false hai mtlb nahi send hua hai

  const dispatch = useDispatch()                           // dispatch use karna hai to ye likna padega (line 24 pe use kar rahe hain)

  const { loading } = useSelector((state) => state.auth)    

  const handleOnSubmit = (e) => {                          // Submit click karne pe kya hoga ye function handle karega
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))   // getPasswordResetToken <-- ye function call hoga aur email aur setEmailSent pass kiya gya hai. yahan pe setEmailSent iss liye pass kiya gya hai kyuki jab email send kar denge to reset wale page check your email wale page me convert karna hai 
  }




  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">

    {/* agar loading true hai to spinner dikhao */}

      {loading ? (
        <div className="spinner"></div>
      ) : (
        

        /* agar loading true hai to page dikhao */

        <div className="max-w-[500px] p-4 lg:p-8">




          {/* agar email sent nahi hua hai to Reset your password dikhao agar ho gya hai to Check email dikhao */}
          
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}   
          </h1>
          



          {/* agar email sent nahi hua hai to --> ? <-- ye wala dikhao agar ho gya hai to --> : <-- ye wala dikhao */}

          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>




          {/* Sumbit button pe click karte hi handleOnSubmit function call ho jaye (line 22- 25) */} 

          <form onSubmit={handleOnSubmit}>  



           {/* agar email sent nahi hua hai to input field dikhao --> Enter email address */}

            {!emailSent && (
              
              <label className="w-full">
                
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>     
                </p>

                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style w-full"
                />

              </label>

            )}




          {/* Sumbit button and Resend Email button */}

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}     {/* agar email sent nahi hua hai to Submit button dikhao agar ho gya hai to Resend Email button dikhao */}
            </button>

          </form>




          {/* <-- Back to Login */}
  
          <div className="mt-6 flex items-center justify-between">
            
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>

          </div>
        </div>
      )}
    </div>
  )
}




export default ForgotPassword