// Required dependencies import kar rahe hain
import { useState } from "react"
import { toast } from "react-hot-toast" // Error ya success messages ke liye
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai" // Password toggle ke icons
import { useDispatch } from "react-redux" // Redux store ke actions dispatch karne ke liye
import { useNavigate } from "react-router-dom" // Page navigate karne ke liye

// Authentication se related functions import kar rahe hain
import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab" // UI tab component import kiya

function SignupForm() {
  // Page navigate karne ke liye hook
  const navigate = useNavigate()
  // Redux store se data update karne ke liye dispatch hook
  const dispatch = useDispatch()

  // Account type track karne ke liye (default: student)
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  // Form input fields ka state manage kar rahe hain
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Password aur confirm password ke visibility toggle ke liye state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // formData ko destructure kar rahe hain taaki bar-bar likhna na pade
  const { firstName, lastName, email, password, confirmPassword } = formData

  // Input field ke change ko handle karne ka function
  const handleOnChange = (e) => {
    // User jo likh raha hai use state me update kar rahe hain
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Form submit karne pe kya hoga
  const handleOnSubmit = (e) => {
    e.preventDefault() // Form ka default behavior (page reload) rok rahe hain

    // Agar password aur confirm password match nahi kar rahe to error show karega
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    // Signup ke liye jo data bhejna hai use ek object me store kar rahe hain
    const signupData = {
      ...formData,
      accountType, // Student ya Instructor ka type add kar diya
    }

    // Redux store me signup data save kar rahe hain
    dispatch(setSignupData(signupData))

    // Email pe OTP bhejne ka function call kar rahe hain
    dispatch(sendOtp(formData.email, navigate))

    // Form reset kar rahe hain
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT) // Account type bhi reset kar diya
  }

  // Tab component ke liye data define kiya
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
      {/* Student aur Instructor tab select karne ke liye */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* Signup Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          {/* First Name Input */}
          <label>
            <p>First Name <sup>*</sup></p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full p-[12px]"
            />
          </label>

          {/* Last Name Input */}
          <label>
            <p>Last Name <sup>*</sup></p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full p-[12px]"
            />
          </label>
        </div>

        {/* Email Address Input */}
        <label className="w-full">
          <p>Email Address <sup>*</sup></p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full p-[12px]"
          />
        </label>

        <div className="flex gap-x-4">
          {/* Password Input */}
          <label className="relative">
            <p>Create Password <sup>*</sup></p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full p-[12px] pr-10"
            />
            {/* Password visibility toggle button */}
            <span onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          {/* Confirm Password Input */}
          <label className="relative">
            <p>Confirm Password <sup>*</sup></p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full p-[12px] pr-10"
            />
            {/* Confirm password visibility toggle button */}
            <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>
        </div>

        {/* Signup Button */}
        <button type="submit" className="mt-6 bg-yellow-50 py-[8px] px-[12px]">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
