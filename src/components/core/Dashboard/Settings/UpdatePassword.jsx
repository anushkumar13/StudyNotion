// imports

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"





export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)





    {/*   Yeh code React Hook Form ka use kar raha hai form handling ke liye:     register: Yeh function form ke input fields ko React Hook Form ke saath register karta hai taaki form validation aur state management ho sake.     handleSubmit: Yeh function form ko submit karne ke liye use hota hai. Jab user form submit karega, yeh function validate karega form ko aur agar sab kuch sahi hoga toh submit action execute karega.     formState: { errors }: Yeh part form ke validation errors ko track karta hai. Agar koi input field invalid hota hai toh errors object me uske errors store hote hain.   */}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()





    {/*   Yeh code submitPasswordForm function ka hai jo password change karne ke liye use hota hai:     async (data): Yeh asynchronous function hai jo data parameter ko accept karta hai (jo new password aur required data ko represent karta hai).     await changePassword(token, data): Yeh line changePassword function ko call karti hai jo password ko update karta hai. Yeh function token aur data ko parameters ke roop me pass karta hai.     token: User ka authentication token jo request ko validate karta hai.     data: User ka naya password ya jo bhi required fields hain.     catch (error): Agar koi error hoti hai (jaise server error, network error, etc.), toh error message ko console me print kiya jaata hai.   */}

  const submitPasswordForm = async (data) => {
    
    try {

      await changePassword(token, data)
    } 
    
    catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }





  return (
    <>

      <form onSubmit={handleSubmit(submitPasswordForm)}>

        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">





    {/*   "Password"   */}

          <h2 className="text-lg font-semibold text-richblack-5"> Password </h2>
          
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">




    
    {/*   "Current Password"   */}

              <label htmlFor="oldPassword" className="lable-style">
                Current Password
              </label>

              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style"
                {...register("oldPassword", { required: true })}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.oldPassword && (
    




    /*   "Please enter your Current Password."   */

                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>

              )}
            </div>


            <div className="relative flex flex-col gap-2 lg:w-[48%]">





    /*   "New Password"   */

              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>

              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style"
                {...register("newPassword", { required: true })}
              />

              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.newPassword && (





    /*   "Please enter your New Password."   */

                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>

              )}
            </div>
          </div>
        </div>

    



    {/*   "Cancel" wala button   */}

        <div className="flex justify-end gap-2">

          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>

          <IconBtn type="submit" text="Update" />
          
        </div>
      </form>
    </>
  )
}