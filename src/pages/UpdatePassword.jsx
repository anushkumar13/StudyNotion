// imports

import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { resetPassword } from "../services/operations/authAPI"





function UpdatePassword() {
  const navigate = useNavigate()                                                         // navigate create kar rahe hain kyuki hume navigate use karna hai
  const dispatch = useDispatch()                                                         // dispatch create kar rahe hain kyuki hume dispatch use karna hai (line - 39)
  const location = useLocation()                                                         // location create kar rahe hain kyuki hume location use karna hai (line - 38)
  const { loading } = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)                                // ek flag banao ye decide karne ke liye ki Enter Password input field ke liye kab password show karna hai aur kab nahi. initially passwrod show nahi karenge
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)                  // ek flag banao ye decide karne ke liye ki Confirm Password input field ke liye kab password show karna hai aur kab nahi. initially passwrod show nahi karenge
  const { password, confirmPassword } = formData                                         // form ke data mein se hum password aur confirmPassword nikal rahe hain taki line - 39 mein hum inn dono ko pass kar paye





  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })





  const handleOnChange = (e) => {                                                        // ----> yaha hum handleOnChange function bna rahe hain
    setFormData((prevData) => ({
      ...prevData,                                                                       // previous data ke object ka use karna values store karne ke liye 
      [e.target.name]: e.target.value,                                                   // jo bhi filed me changes kiye ho uske value ko update kar dena
    }))
  }





  const handleOnSubmit = (e) => {
    e.preventDefault()                                                                   // ye line default behaviour ko htata hai 
    const token = location.pathname.split("/").at(-1)                                    // jab email pe Password Reset ka link send karte hain to link ke right most pe token hota hai (i.e; password/ ke baad ka) usko hum nikal rahe hain taki hum line - 39 mein usko pass kar sake
    dispatch(resetPassword(password, confirmPassword, token, navigate))        
  }




  
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">





    {/* Choose new password */}

          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>





    {/* Almost done. Enter your new password and youre all set. */}

          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </p>


          <form onSubmit={handleOnSubmit}>                                               {/*  Submit button click karne pe --> handleOnSubmi <-- ye wala function call kar dena   */} 
            <label className="relative">





    {/*  New Password *  */}

              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type={showPassword ? "text" : "password"}                                // jab showPassword wala flag true hai to text dikhao aur agar false hai to password jaisa dikhao
                name="password"
                value={password}
                onChange={handleOnChange}                                                // jab bhi iss input field mein kuch change ho jaise kuch type karna ya delete karna etc to --> handleOnChange <-- ye wala function call kar dena (line - 29)
                placeholder="Enter Password"
                className="form-style w-full !pr-10"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (





    /*  agar showPassword true hai to cut wala eye icon show karo  */

                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (




                  
    /*  agar showPassword false hai to not cut wala eye icon show karo  */

                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative mt-3 block">




            
    {/*  Confirm New Password *  */}

              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type={showConfirmPassword ? "text" : "password"}                         // jab showConfirmPassword wala flag true hai to text dikhao aur agar false hai to password jaisa dikhao
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style w-full !pr-10"
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





    {/*  Reset Password wala button  */}

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>





    {/*  <-- Back To Login wala button  */}

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





export default UpdatePassword





// ye vo wale page ka code hai jab tum forget passwrod pe click karke jab apna email dalte ho to Choose new password
// wala jo page aata hai uska hai