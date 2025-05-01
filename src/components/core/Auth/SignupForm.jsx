// imports

import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"





function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()





  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { firstName, lastName, email, password, confirmPassword } = formData
  




    {/*   Yeh code ek state create karta hai jisme user ke form data ko store kiya jata hai, jaise firstName, lastName, email, password, aur confirmPassword. Yeh state ko useState hook ke through initialize kiya gaya hai, jisme sabhi fields initially empty strings hain.   */}

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })






    {/*   Yeh function form fields ke changes ko handle karta hai aur input field ke name aur value ke basis par formData ko update karta hai.   */}

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }





    {/*   Yeh function form submit hone par trigger hota hai. Sabse pehle, form ki default behavior ko e.preventDefault() se roka jata hai. Phir, agar password aur confirmPassword match nahi karte, to ek error message dikhaya jata hai. Agar match karte hain, to formData aur accountType ko combine karke signupData banaya jata hai.   */}

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    const signupData = {
      ...formData,
      accountType,
    }




    
    {/*   Community   */}

    dispatch(setSignupData(signupData))                   /*   signupData ko Redux store mein setSignupData action ke through dispatch karta hai, taaki user ka signup data store ho sake.   */
    
    dispatch(sendOtp(formData.email, navigate))           /*   User ke email ko sendOtp action ke through dispatch karta hai, jo OTP bhejne ka kaam karta hai. navigate function se user ko next page par redirect kiya jata hai.   */





    {/*   Yeh code form ko reset karta hai aur accountType ko STUDENT set karta hai, taaki form ko initial state par laa sake.   */}

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    setAccountType(ACCOUNT_TYPE.STUDENT)
  }





    {/*   Yeh code ek tabData array define karta hai jisme do objects hain: 1). Student tab: jisme id 1, tabName "Student", aur type ACCOUNT_TYPE.STUDENT hai.     2). Instructor tab: jisme id 2, tabName "Instructor", aur type ACCOUNT_TYPE.INSTRUCTOR hai.   */}

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },

    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]





  return (
    <div>

      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        
        <div className="flex gap-x-4">






    {/*   Yeh code ek First Name input field banata hai jisme required validation hai. Jab user input deta hai, toh value ko state variable firstName se bind kiya jata hai, aur onChange event ke through value ko update kiya jata hai. Input field ke andar placeholder "Enter first name" dikhayi deta hai   */}      

          <label>
            
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>





    {/*   Yeh code ek Last Name input field banata hai, jisme required validation hota hai. Jab user input deta hai, toh onChange event ke through value ko state variable lastName se update kiya jata hai. Input field mein placeholder "Enter last name" dikhayi deta hai.   */}

          <label>

            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>

            <input

              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            
          </label>

        </div>





    {/*   Yeh code ek Email Address input field banata hai, jisme required validation hota hai. Jab user input deta hai, toh onChange event ke through value ko state variable email se update kiya jata hai. Input field mein placeholder "Enter email address" dikhayi deta hai.   */}

        <label className="w-full">

          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>

          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />

        </label>
        
        
        
        
        
        <div className="flex gap-x-4">





    {/*   Yeh code ek Create Password input field banata hai, jisme required validation hota hai. Jab user input deta hai, toh onChange event ke through value ko state variable password se update kiya jata hai. Input field mein placeholder "Enter Password" dikhayi deta hai, aur showPassword state ke basis par password ko text ya password type mein toggle kiya jata hai. Ek eye icon bhi diya gaya hai, jise click karne par password dikhai ya chhupa sakte hain.   */}

          <label className="relative">

            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>

          </label>





    {/*   Yeh code ek Confirm Password input field banata hai, jisme required validation hota hai. Jab user input deta hai, toh onChange event ke through value ko state variable confirmPassword se update kiya jata hai. Input field mein placeholder "Confirm Password" dikhayi deta hai, aur showConfirmPassword state ke basis par password ko text ya password type mein toggle kiya jata hai. Ek eye icon bhi diya gaya hai, jise click karne par password dikhai ya chhupa sakte hain.   */}

          <label className="relative">

            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />

            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>

          </label>

        </div>





    {/*   "Create Account" wala button   */}

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>

      </form>
    </div>
  )
}





export default SignupForm