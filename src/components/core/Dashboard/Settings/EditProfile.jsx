// imports

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"





    {/*   Yeh line ek array banati hai jismein 5 gender options hain: "Male", "Female", "Non-Binary", "Prefer not to say", aur "Other" — inhe user ko gender select karne ke liye form dropdown ya radio button me dikhaya ja sakta hai.   */}

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]





export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()





    {/*   Yeh code React Hook Form ka use karta hai form validation aur submission ke liye.     register: Yeh function form ke input fields ko register karta hai, jisse unko track kiya ja sake.     handleSubmit: Yeh function form submit hone par validation check karta hai aur form data ko handle karta hai.     formState: { errors }: Yeh part form ke errors ko track karta hai, jo form submission ke time validation fail hone par show hote hain.   */}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()





    {/*   Yeh function submitProfileForm form submit hone par call hota hai, aur yeh data ko server par bhejne ka kaam karta hai.     data: Yeh parameter form ke input values ko represent karta hai.     dispatch(updateProfile(token, data)): Yeh Redux action ko dispatch karta hai, jisme user ka token aur form data pass hota hai, jisse profile update kiya jaata hai.     try-catch: Agar koi error aata hai during the dispatch, toh woh catch block me handle hota hai, aur error message console me print hota hai.   */}

  const submitProfileForm = async (data) => {
    
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }





  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">





    {/*   "Profile Information"   */}      

          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
    




    {/*   "First Name"   */}

              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />

              {errors.firstName && (
    




    /*   "Please enter your first name."   */

                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>

              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
    




    {/*   "Last Name"   */}

              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />

              {errors.lastName && (





    /*   "Please enter your last name."   */

                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>

              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
    




    {/*   "Date of Birth"   */}

              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>

              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />

              {errors.dateOfBirth && (

                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>

              )}
            </div>


            <div className="flex flex-col gap-2 lg:w-[48%]">
    




    {/*   "Gender"   */}

              <label htmlFor="gender" className="lable-style">
                Gender
              </label>

              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >

                {genders.map((ele, i) => {
                  return (

                    <option key={i} value={ele}>
                      {ele}
                    </option>

                  )
                })}
              </select>

              {errors.gender && (
    




    /*   "Please enter your Date of Birth."   */

                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>

              )}
            </div>
          </div>


          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
    




    {/*   "Contact Number"   */}

              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>

              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />

              {errors.contactNumber && (

                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>

              )}
            </div>


            <div className="flex flex-col gap-2 lg:w-[48%]">
    




    {/*   "About"   */}

              <label htmlFor="about" className="lable-style">
                About
              </label>

              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />

              {errors.about && (
    




    /*   "Please enter your About."   */

                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>

              )}
            </div>
          </div>
        </div>


        <div className="flex justify-end gap-2">
    




    {/*   "Cancel" wala button   */}

          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>

          <IconBtn type="submit" text="Save" />

        </div>
      </form>
    </>
  )
}