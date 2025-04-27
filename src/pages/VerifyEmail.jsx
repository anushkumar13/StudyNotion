// imports

import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";




function VerifyEmail() {
  const [otp, setOtp] = useState("");                                      // ye OTP ka state variable
  const { signupData, loading } = useSelector((state) => state.auth);      // line - 45 pe jo jo pass kiya gaya hai vo data pehle lao to sahi, to ye vo saare data laega
  const dispatch = useDispatch();                                          // dispatch use karna hai to ye to likhna hi padega (line - 41) mein use hua hai
  const navigate = useNavigate();                                          // navigate use karna hai to ye to likhna hi padega (line - 25) mein use hua hai




  {/*  agar signupData mein koi sa bhi data missing hai to signup wale page pe le jao  */}

  useEffect(() => {
    
    if (!signupData) {
      navigate("/signup");
    }
    
  }, []);





  {/*  Signup wale action ko dispatch karo  */}

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {                     // signupData se ye saare data nikal lo
      accountType,              // iska data nikalo
      firstName,                // iska data nikalo
      lastName,                 // iska data nikalo
      email,                    // iska data nikalo
      password,                 // iska data nikalo
      confirmPassword,          // iska data nikalo
    } = signupData;



    
    dispatch(
      signUp(                   // isme hum log ye saari chize pass kar rahe hain
        accountType,            // ye pass kar rahe hain
        firstName,              // ye pass kar rahe hain
        lastName,               // ye pass kar rahe hain
        email,                  // ye pass kar rahe hain
        password,               // ye pass kar rahe hain
        confirmPassword,        // ye pass kar rahe hain
        otp,                    // ye pass kar rahe hain
        navigate
      )
    );
  };




  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>                                  {/*  agar loading true hai to spinner dikhao  */} 
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">


        {/*  Verify Email  */}

          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>


        {/*  A verification code has been sent to you. Enter the code below  */}

          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>



          <form onSubmit={handleVerifyAndSignup}>



        {/*  OTP dalne ke liye  */}

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}                                                // 6 number ka OTP rahega
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />




        {/*  Verify Email wala button  */}

            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>




        {/*  <-- Back To Signup wala button  */}

          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>




        {/*  Resend it wala button  */}

            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email))}          // Resend it pe click karoge to OTP firse send hona chahiye isliye sendOtp function ko call kar rahe hai aur input me email bhi pass kar rahe hain (signupData se email leke aaega)
            >
              <RxCountdownTimer />
              Resend it
            </button>

          </div>
        </div>
      )}
    </div>
  );
}




export default VerifyEmail;