// imports

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"





export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()                 //  form create karna hai to ye likhna padega
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)





    {/*   Jab component first time render hota hai, tab yeh useEffect run hota hai (kyunki dependency array [] khali hai). Check karta hai: agar course ka status "PUBLISHED" hai, toh form ke "public" field ki value true set kar do. Matlab: agar course already published hai, toh form me public toggle pehle se hi ON rahe.   */}

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])





    {/*   Ye ek function hai jo user ko previous step (step 2) pe le jaata hai. dispatch(setStep(2)) ka matlab hai Redux state me course creation ka current step 2 kar do. Yeh mainly tab use hota hai jab tum form ya flow mein "Back" button dabate ho.   */}

  const goBack = () => {
    dispatch(setStep(2))
  }





  {/*      */}

  const goToCourses = () => {
    dispatch(resetCourseState())                                                    //  Redux me course ka pura data reset kar deta hai (jaise edit ya create data hata deta hai).
    navigate("/dashboard/my-courses")                                               //  User ko My Courses page pe bhej deta hai.
  }





  const handleCoursePublish = async () => {





    {/*   Check karta hai: Kya course ka status already wahi hai jo user ne select kiya hai (Published ya Draft). Agar koi change nahi hai, toh direct user ko "My Courses" page pe bhej deta hai (goToCourses()). Return lagakar niche ke code ko chalne nahi deta (kyunki publish karne ki zarurat hi nahi padti).   */}

    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      
      goToCourses()
      return
    }





    {/*   Course ko update karne ka pura process hai — jaise hi user publish ya draft karta hai, uske hisaab se server ko update bhej rahe hain. Agar sab kuch sahi gaya toh redirect kar dete hain user ko.   */}

    const formData = new FormData()
    formData.append("courseId", course._id)                                         //  Ek FormData object banaya gaya — jismein backend ke liye course ka ID bhej rahe hain.

    const courseStatus = getValues("public")                                        //  Form ke andar jo "public" field hai (checkbox ya switch ho sakta hai) — uske hisaab se decide kar rahe hain: 
      ? COURSE_STATUS.PUBLISHED                                                     //  agar true hai → PUBLISHED
      : COURSE_STATUS.DRAFT                                                         //  warna → DRAFT

    formData.append("status", courseStatus)                                         //  Ab course ka final status FormData ke andar daal diya gaya hai.
    setLoading(true)                                                                //  UI mein loading spinner dikhane ke liye loading state ko true kar diya.

    const result = await editCourseDetails(formData, token)                         //  Server pe request bhej di to update course details, using formData and user ka token.
    if (result) {
      goToCourses()                                                                 //  Agar server se successful response aata hai, toh My Courses page pe redirect kar diya jaata hai.
    }
    setLoading(false)                                                               //  Finally, loading ko false kar diya — taaki spinner hata diya jaaye.
  }





  const onSubmit = (data) => {
    handleCoursePublish()
  }





  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      




    {/*   Publish Settings   */}

      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>





    {/*   Checkbox   */}

        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />

            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>

          </label>
        </div>





    {/*   "Back" wala button   */}

        <div className="ml-auto flex max-w-max items-center gap-x-4">
          
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>

          <IconBtn disabled={loading} text="Save Changes" />
          
        </div>
      </form>
    </div>
  )
}