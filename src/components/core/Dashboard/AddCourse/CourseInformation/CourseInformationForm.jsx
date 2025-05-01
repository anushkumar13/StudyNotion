// imports

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"





    {/*   Yeh code ek asynchronous function getCategories ko call karta hai jo course categories fetch karta hai, aur phir un categories ko courseCategories mein store kar deta hai. aur jab categories aa jati hai to loading ko false kar deta hai mtlb ki spinner ko hta deta hai   */}

export default function CourseInformationForm() {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()





  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)                    /*   Is line ka matlab hai ki Redux store ke course wale part se course aur editCourse naam ka data leke aa rahe hain, jise hum component ke andar use kar sakte hain.   */
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])                           /*   Yeh line ek state variable banata hai courseCategories jo initially empty array se start hota hai. Jab bhi course categories milengi, hum unhe is array mein store karenge. Course Information wale form me jo Choose a Category wala dropdown hai uske liye   */





    {/*   Yeh code ek asynchronous function getCategories ko call karta hai jo course categories fetch karta hai, aur phir un categories ko courseCategories mein store kar deta hai. aur jab categories aa jati hai to loading ko false kar deta hai mtlb ki spinner ko hta deta hai   */}

  useEffect(() => {

    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        
        setCourseCategories(categories)
      }
      setLoading(false)
    }





    {/*   Agar editCourse true hai, toh form ke input fields ko course ki details se fill kiya jata hai, jaise course name, description, price, etc. Uske baad, course categories fetch karne ke liye getCategories function call hota hai.   */}

    if (editCourse) {
      
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

  }, [])





    {/*   Yeh function course ke form fields ko current values se compare karta hai. Agar kisi field ki value course ke details se alag hoti hai, toh yeh true return karega, matlab form updated hai. Agar sab kuch same hai, toh false return karega.   */}

  const isFormUpdated = () => {
    const currentValues = getValues()
    
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {

      return true
    }

    return false
  }





    {/*   Agar course ko edit karna hai (editCourse true hai), toh yeh function check karta hai ki form mein koi changes kiye gaye hain ya nahi. Agar changes hain, toh yeh changes ko formData mein append karta hai aur backend pe editCourseDetails API call karta hai. Agar form mein koi changes nahi hain, toh yeh ek error message dikhata hai: "No changes made to the form".   */}

  const onSubmit = async (data) => {
    
    if (editCourse) {
      
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        
        formData.append("courseId", course._id)

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }

        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) 
        
        {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }

        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        
        setLoading(true)




        const result = await editCourseDetails(formData, token)

        setLoading(false)

        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } 





    /*   Agar form mein koi changes nahi hain, toh yeh ek error message dikhata hai: "No changes made to the form".   */

        else {
        toast.error("No changes made to the form")
      }
      return
    }





    {/*   Yeh code naya course add karne ke liye formData banata hai, jisme course ke details (jaise title, description, price, etc.) append kiye jaate hain. Phir, yeh addCourseDetails API call ke through backend ko data bhejta hai. Agar API call successful hota hai, toh course details ko state mein update kiya jaata hai aur user ko next step pe bheja jaata hai.   */}

    const formData = new FormData()

    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    setLoading(true)

    const result = await addCourseDetails(formData, token)

    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }

    setLoading(false)
  }




  return (
    <form
      onSubmit={handleSubmit(onSubmit)}                                                  // Jab user form submit karta hai, tab handleSubmit(onSubmit) trigger hota hai. handleSubmit form ko validate karta hai, aur agar form sahi hai (valid), toh onSubmit function ko call kiya jaata hai, jo form ke data ko handle karta hai.
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >





    {/*   Course Title   */}

      <div className="flex flex-col space-y-2">
        
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200"> * </sup>
        </label>

        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />

        {errors.courseTitle && (
          
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>

        )}
      </div>





    {/*   Course Short Description   */}

      <div className="flex flex-col space-y-2">
        
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200"> * </sup>
        </label>

        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />

        {errors.courseShortDesc && (
          
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>

        )}
      </div>





    {/*   Course Price   */}

      <div className="flex flex-col space-y-2">
        
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200"> * </sup>
        </label>

        <div className="relative">
          
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
        




    {/*   rupee ka icon   */}

          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        
        </div>

        {errors.coursePrice && (
          
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>

        )}
      </div>





    {/*   Course Category   */}

      <div className="flex flex-col space-y-2">
        
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200"> * </sup>
        </label>

        <select                                                                          //  'select' tag ka use kiya gya kyoki hume user ko multiple options me se ek option choose karne dena ho 
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          
          <option value="" disabled>                                                     {/*   <option> tag ko hum tab use karte hain jab hum select tag me ek specific option dikhana chahte hain jise user choose kar sake. Har <option> tag ek individual choice ko represent karta hai. Har option ka value attribute hota hai jo us option ka unique identifier hota hai, aur jab user us option ko choose karta hai, toh uska value return hota hai.   */}
            Choose a Category
          </option>

          {!loading &&                                                                   /*   Is code me, agar loading false hai (yaani data load ho gaya hai), toh courseCategories array ko map kiya ja raha hai. Har category ke liye ek <option> tag banaya ja raha hai jisme category ka name show ho raha hai aur value attribute me us category ka _id set ho raha hai. Ye code dropdown me categories ko populate karne ka kaam karta hai jab data successfully load ho jata hai.   */
            courseCategories?.map((category, indx) => (
              
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>

            ))}
        </select>

        {errors.courseCategory && (
          
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>

        )}
      </div>





    {/*   Course Tags   */}

      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />





    {/*   Course Thumbnail Image   */}

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />






    {/*   Benefits of the course   */}

      <div className="flex flex-col space-y-2">
        
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200"> * </sup>
        </label>

        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />

        {errors.courseBenefits && (
          
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>

        )}
      </div>





    {/*   Requirements/Instructions   */}

      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />




      

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          




    /*   "Continue Without Saving" wala button   */

          <button
            onClick={() => dispatch(setStep(2))}                                         //  "Continu Without Saving" wale button pe click karne se user step 2 pe chala jayega
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>

        )}





    {/*   "Next" aur "Save Changes" wale button   */}

        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >

          <MdNavigateNext />

        </IconBtn>

      </div>
    </form>
  )
}





// iss file me 'Add Course' ka pehle step 'Course Information' ke form ka code hai 