// imports

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"






  {/*   Ye component kuch props leta hai jaise modalData, setModalData, aur teen boolean flags: add, view, edit. Ye flags batate hain ki modal ka kaam kya hai — naya subsection add karna, existing subsection ko view karna, ya edit karna.   */}

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {




  {/*   Isse hum form ke inputs ko handle karne ke liye functions jaise register, handleSubmit, setValue, getValues lete hain. formState: { errors } ka matlab hai ki agar form me koi validation error hai, toh wo errors object me store hoga.   */}

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()




  const dispatch = useDispatch()                                   //  Redux ka hook hai jo action dispatch karne ke liye use hota hai.
  const [loading, setLoading] = useState(false)                    //  React ka hook hai jo loading naam ka state variable define karta hai, jo initially false set hota hai.
  const { token } = useSelector((state) => state.auth)             //  Redux ka hook hai jo state se auth object ka token retrieve karta hai
  const { course } = useSelector((state) => state.course)          //  Redux se course object ko access karne ke liye use hota hai, jo state.course se milta hai.




  {/*   Jab component load hota hai (useEffect chalta hai), aur agar view ya edit mode active hai, Jab component load hota hai (useEffect chalta hai), aur agar view ya edit mode active hai, Taaki user ko already existing values dikhe jab wo lecture dekh raha ho ya edit kar raha ho.   */}

  useEffect(() => {
    if (view || edit) {
      
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])




  {/*   Yeh function check karta hai ki kya lecture form mein koi changes kiye gaye hain ya nahi, agar kiye gaye hain toh true return karta hai.   */}

  const isFormUpdated = () => {
    const currentValues = getValues()
    
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }
    return false
  }




  
  {/*   handleEditSubsection function check karta hai ki kaunse fields change huye hain. Sirf wahi fields formData mein add kiye jaate hain jo original modalData se different hote hain. Yeh efficient update ke liye hota hai — unnecessary data backend ko nahi bhejte.   */}

  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()
    
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }




  {/*   setLoading(true) se loading indicator chalu hota hai. updateSubSection API call hoti hai, agar update successful ho, toh course content update kiya jaata hai. Modal ko band kiya jaata hai (setModalData(null)) aur loading ko hata diya jaata hai (setLoading(false)).   */}

    setLoading(true)

    const result = await updateSubSection(formData, token)
    
    if (result) {
      

      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )


      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    
    setModalData(null)
    setLoading(false)
  }




  const onSubmit = async (data) => {
    
    if (view) return                                            //  Agar view mode hai toh kuch bhi submit nahi karte — bas return kar jaate hain.

    if (edit) {
      if (!isFormUpdated()) {                                   //  Agar edit mode hai, toh check karte hain ki form me koi change hua ya nahi (isFormUpdated)
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()                                  //  Agar change hua toh handleEditSubsection() call karte hain, warna error message show kar dete hain.
      }
      return
    }




  {/*   Ek naya FormData object banaya jaa raha hai file/video upload ke liye. sectionId, title, description, aur video jaise fields formData me add kiye ja rahe hain. Yeh formData backend ko bhejne ke liye ready kiya ja raha hai, mostly POST ya PUT API call ke through.   */}

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)




  {/*   Pehle setLoading(true) se loading spinner dikhaya jaata hai. API call createSubSection ke through hoti hai, agar success mila toh course content update kiya jaata hai. setModalData(null) modal band karta hai, aur setLoading(false) loading state hata deta hai.   */}

    setLoading(true)

    const result = await createSubSection(formData, token)
    if (result) {
    

      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )


      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }

    setModalData(null)
    setLoading(false)
  }




  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        



  {/*   Modal Header   */}

        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          


  {/*   Agar view true hai → "Viewing Lecture" dikhayega. Agar add true hai → "Adding Lecture" dikhayega. Agar edit true hai → "Editing Lecture" dikhayega.   */}

          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>




  {/*   Yeh <button> tag ek "close" button hai, jo modal ko band karta hai — lekin sirf tab jab loading false ho. Agar loading false hai → setModalData(null) chalega (modal close ho jaayega). Agar loading true hai → kuch nahi hoga (modal close nahi hoga). Ye isliye kiya gaya hai taaki user modal ko close na kar paaye jab koi operation (like saving) background mein chal raha ho. con ke liye RxCross2 ka use kiya gaya hai — ye ek cross (✖️) icon hota hai   */}

          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>

        </div>




  {/*   Yeh <form> tag ek form banata hai jo submit hone par onSubmit function ko call karta hai. Jab user form submit karega (jaise button dabaye), toh handleSubmit pehle form validation karega, phir agar sab kuch sahi hua toh onSubmit function ko call karega.   */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >




  {/*   Lecture Video Upload   */}

          <Upload
            name="lectureVideo"                                     //  Form ke field ka naam.
            label="Lecture Video"                                   //  Field ke upar dikhega ye label.
            register={register}                                    
            setValue={setValue}                                     
            errors={errors}
            video={true}                                            //  Bata raha hai ki yeh video file ke liye hai.
            viewData={view ? modalData.videoUrl : null}             //  Agar view mode hai toh existing video show karega.
            editData={edit ? modalData.videoUrl : null}             //  Agar edit mode hai toh pehle se jo video upload hai, usse dikhaayega ya pre-fill karega.
          />




  {/*   Lecture Title   */}

          <div className="flex flex-col space-y-2">
            
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">          {/*   htmlFor="lectureTitle" → Ye uss input field se linked hai jiska id="lectureTitle" hoga.   */}
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}            {/*   !view && <sup>*</sup> → Agar view mode nahi hai (i.e. add ya edit mode hai), toh ek asterisk (*) dikhaata hai mandatory field ka symbol dikhane ke liye.   */}
            </label>

            <input
              disabled={view || loading}                                                   /*   disabled={view || loading} → Agar view mode me ho ya loading ho raha ho, toh input field disable rahega (read-only).   */
              id="lectureTitle"                                                            /*   id="lectureTitle" → Iska label tag ke htmlFor="lectureTitle" se connection hota hai.   */
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}                            /*   React Hook Form ke through yeh field form me register ho raha hai, aur required bhi hai (empty nahi chhod sakte)   */
              className="form-style w-full"
            />




  {/*   Yeh part sirf tab dikhai deta hai jab user lecture title ka input empty chhod deta hai.   */}

            {errors.lectureTitle && (                                                      /*   Yeh check karta hai ki kya title field me koi error hai (jaise required field empty chhod di gayi ho). Agar error hai, toh <span> ke andar ek chhota warning message dikhata hai.   */
              
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required                                                  {/*   "Lecture title is required" → Yeh message user ko batata hai ki title bharna zaroori hai.   */} 
              </span>

            )}
          </div>




  {/*   Lecture Description   */}

          <div className="flex flex-col space-y-2">
            
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">           {/*   Iska matlab yeh label id="lectureDesc" wale input ke liye hai.   */}
              Lecture Description{" "}                                                     {/*   Text "Lecture Description" form mein field ka naam dikhata hai.   */}  
              {!view && <sup className="text-pink-200">*</sup>}                          {/*   Agar view mode nahi hai (matlab add/edit mode hai), toh ek red asterisk * dikhata hai (jo batata hai ki yeh required field hai).   */}
            </label>
  
  {/*   Ye ek textarea hai jisme user "Lecture Description" likh sakta hai.   */}

            <textarea
              disabled={view || loading}                                                   //  Agar view mode ya loading chal raha hai, toh yeh field disable ho jaata hai (user edit nahi kar sakta).   
              id="lectureDesc"                                                             //  Yeh field ka ID hai, jo HTML element ko uniquely identify karta hai
              placeholder="Enter Lecture Description"                                      //  Jab field khali ho, toh placeholder text dikhega (jo user ko bataata hai ki yeh field kis cheez ke liye hai)
              {...register("lectureDesc", { required: true })}                             //  React Hook Form ka register function, jo field ko track karta hai aur validation rules (yaha 'required') apply karta hai
              className="form-style resize-x-none min-h-[130px] w-full"
            />

            {errors.lectureDesc && (                                                       //  Yeh condition check karti hai agar lectureDesc field mein koi error hai. Agar error hai, tab yeh condition true ho jaati hai aur error message display hota hai.
              
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required                                            {/*  Yeh error message hai jo user ko dikhaya jaata hai jab lectureDesc field empty chhoda gaya ho (kyunki humne validation mein required: true set kiya hai).  */}
              </span>

            )}
          </div>

          {!view && (                                                                      //  !view: Yeh condition check karti hai agar view variable false ho. view ka matlab hota hai ki agar user sirf dekh raha hai (view mode), toh button ko render nahi kiya jayega. Agar view false hai (i.e., user editing ya adding mode mein hai), toh yeh block render hoga.

            <div className="flex justify-end">
              
              <IconBtn
                disabled={loading}                                                         //  Jab loading state true ho, tab button disable ho jaayega. Iska matlab hai ki jab koi background task (e.g., saving changes) chal raha ho, tab user button pe click nahi kar sakta.
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}              //  Yeh ternary condition hai jo button ka text decide karti hai. Agar loading true hai (e.g., data save ho raha hai), toh button ka text "Loading.." hoga. 
              />

            </div>
          )}
        </form>
      </div>
    </div>
  )
}