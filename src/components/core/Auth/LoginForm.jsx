// imports

import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"





function LoginForm() {

  const navigate = useNavigate()
  const dispatch = useDispatch()





    {/*   Ye code ek form ke state (formData) ko manage kar raha hai, jisme email aur password ki fields hain. Tumhare form inputs ke values ko formData se bind kiya gaya hai aur unhe update karne ke liye setFormData function ka use kiya jata hai.   */}

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })





    {/*   Ye code password visibility ko manage karne ke liye showPassword state ka use kar raha hai, jo initially false hota hai (password hidden). Tum setShowPassword function ka use karke password ko show ya hide kar sakte ho.   */}

  const [showPassword, setShowPassword] = useState(false)





    {/*   Ye code destructuring ka use kar raha hai, jisme formData object se email aur password ko directly extract karke unhe variables mein store kiya gaya hai.   */}

  const { email, password } = formData





    {/*   Ye function form inputs ke values ko dynamically update karta hai, har field ke name attribute ke basis pe, bina har ek field ko manually update kiye, bas ek generic method se.   */}

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }





    {/*   Ye function form submit hone par login action ko dispatch karta hai, jo user ke email aur password ke saath login request bhejta hai, aur page reload hone se rokta hai.   */}

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }





  return (

    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >

      <label className="w-full">





    {/*   Email Address*   */}    

        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200"> * </sup>
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



      <label className="relative">
    




    {/*   Password*   */}

        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200"> * </sup>
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
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

        <Link to="/forgot-password">
    




    {/*   Forgot Password   */}

          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>

        </Link>

      </label>
    




    {/*   "Sign In" wala button   */}

      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
      
    </form>
  )
}





export default LoginForm