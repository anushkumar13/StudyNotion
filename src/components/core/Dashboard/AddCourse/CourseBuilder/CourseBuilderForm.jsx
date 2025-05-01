// imports

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"


import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"


import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"





    {/*   Yeh line useForm() ka use kar ke React Hook Form ka setup kar rahi hai, taaki hum form fields ko register, validate, aur submit kar sakein.   */}

export default function CourseBuilderForm() {
  const {
    register,                                                                            // form ke input fields ko React Hook Form ke control mein laane ke liye use hota hai.
    handleSubmit,                                                                        // jab form submit ho, toh yeh function data ko handle karta hai.
    setValue,                                                                            // form ke kisi field ka manually value set karne ke kaam aata hai.
    formState: { errors },                                                               // validation errors ko track karta hai.
  } = useForm()





  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()





    {/*   Yeh onSubmit function form submit hone par chalta hai aur section create/update karta hai   */}

  const onSubmit = async (data) => {
    
    setLoading(true)                                                                     //  Form submit hote hi loading start hoti hai

    let result
 
    if (editSectionName) {                                                               //  Agar editSectionName hai: Matlab edit mode hai, toh existing section update hota hai using updateSection(...)
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
      
    } else {                                                                             //  Agar editSectionName nahi hai:
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }

    if (result) {
      
      dispatch(setCourse(result))                                                        //  Redux mein course data update hota hai
      setEditSectionName(null)                                                           //  Edit mode cancel ho jata hai   
      setValue("sectionName", "")                                                        //  Form field reset ho jata hai               
    }
    setLoading(false)                                                                    //  Finally loading band hoti hai
  }





    {/*   Yeh cancelEdit function basically Edit mode ko cancel karta hai aur section name input ko blank kar deta hai.    */}

  const cancelEdit = () => {
    setEditSectionName(null)                                                             //  isse jo section edit ho raha tha, uska reference hata diya jaata hai.
    setValue("sectionName", "")                                                          //  form ke input field ko reset kar diya jaata hai (section name empty kar diya jaata hai).
  }





    {/*   Yeh handleChangeEditSectionName function tab chalta hai jab user kisi section ka naam edit karna chahta hai: Agar already edit ho raha section dobara click ho gaya toh edit cancel kar deta hai, warna naye section ka naam edit karne ka mode activate karta hai.    */}

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)                                                        // jis section ka naam edit karna hai, uska ID store karta hai.
    setValue("sectionName", sectionName)                                                 // form input field ko uss section ke current name se fill kar deta hai.
  }





    {/*   Yeh function ensure karta hai ki kam se kam ek section aur har section me ek lecture ho — tabhi user ko 3rd step pe le jaata hai.    */}

  const goToNext = () => {
    if (course.courseContent.length === 0) {                                             // Check karta hai ki kam se kam ek section hona chahiye. warna ye wala error dikhayega ---> "Please add atleast one section"
      toast.error("Please add atleast one section")                                  
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)            // Check karta hai ki Har section ke andar kam se kam ek lecture (subsection) hona chahiye. aur agar nahi hai to ye wala error dikhayega ---> "Please add atleast one lecture in each section"
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))                                                                 // Agar dono condition satisfy ho jaati hain, toh dispatch(setStep(3)) se next step (3rd step) pe le jaata hai.
  }





    {/*   Jab user "back" jaata hai, toh course form ko step 1 pe le jaake edit mode activate kar deta hai.    */}

  const goBack = () => { 
    dispatch(setStep(1))                                                                 // Course creation form ko step 1 pe le jaata hai (wapis pehle page pe).
    dispatch(setEditCourse(true))                                                        // Edit mode on karta hai, taaki existing course ko wapis se edit kiya ja sake.
  }




  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      




    {/*   Course Builder   */}

      <p className="text-2xl font-semibold text-richblack-5"> Course Builder </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="flex flex-col space-y-2">





    {/*   Section Name   */}

          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200"> * </sup>
          </label>

          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />

          {errors.sectionName && (





    /*   Section name is required   */

            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>

          )}
        </div>


        <div className="flex items-end gap-x-4">





    {/*   "Edit Section Name" and "Create Section" wala button   */}

          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />                  {/*   ye "add" ka icon hai jo iske "Edit Section Name" ya to "Create Section" side me show karega   */}
          </IconBtn>

          {editSectionName && (
            





    /*   "Cancel Edit" wala button   */

            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>

          )}
        </div>
      </form>
      




    {/*   Yeh line condition check kar rahi hai ki: Agar course.courseContent.length 0 se zyada hai (matlab course ke andar kuch content sections available hain),  toh <NestedView /> component ko render karo, aur usme handleChangeEditSectionName function ko as a prop bhejo — taaki wo component section name ko edit kar sake.   */}

      {course.courseContent.length > 0 && (

        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      
      
      <div className="flex justify-end gap-x-3">
        




    {/*   "Back" wala button   */}

        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>

        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>

      </div>

    </div>
  )
}