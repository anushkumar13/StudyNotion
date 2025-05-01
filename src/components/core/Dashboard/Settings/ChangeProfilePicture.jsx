// imports

import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"





export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const fileInputRef = useRef(null)





    {/*   Jab user handleClick function ko trigger karta hai (jaise kisi button pe click se), to yeh function fileInputRef ke current value pe .click() method chalata hai, jisse hidden file input element programmatically click hota hai aur file selection dialog open ho jaata hai.   */}

  const handleClick = () => {
    fileInputRef.current.click()
  }





    {/*   Jab user koi file select karta hai, handleFileChange function chalta hai. Yeh function selected file (e.target.files[0]) ko check karta hai, aur agar file hai to usse imageFile state me store karta hai aur preview ke liye previewFile(file) function call karta hai.   */}

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }




    
  {/*   previewFile function ka kaam hai image file ka preview dikhana. Jab user image upload karta hai, toh yeh function FileReader use karta hai us image ko read karne ke liye. Pehle readAsDataURL(file) se file ko read karta hai (yeh us image ko base64 format me convert karta hai), fir onloadend ke andar setPreviewSource(reader.result) se us converted image ko preview ke liye state me store kar deta hai.   */}

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }





    {/*   handleFileUpload function image file ko backend pe bhejne ke liye banaya gaya hai. Jab user upload karta hai, tab setLoading(true) se loading start hoti hai, fir ek FormData object banaya jata hai jisme image file (imageFile) ko displayPicture key ke sath add kiya jata hai. Fir dispatch(updateDisplayPicture(...)) se Redux action ke through server pe image bheji jaati hai. Upload hone ke baad setLoading(false) se loading state hata di jaati hai. Agar koi error aata hai toh console me print ho jata hai.   */}

  const handleFileUpload = () => {
    try {

      console.log("uploading...")

      setLoading(true)

      const formData = new FormData()

      formData.append("displayPicture", imageFile)
      
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)

      })
    } 
    
    catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }





    {/*   Yeh useEffect hook tab run hota hai jab imageFile change hota hai. Agar imageFile available hota hai (i.e., user ne koi naya image select kiya), toh previewFile(imageFile) function call karke us image ka preview bana diya jata hai aur previewSource state me set kar diya jata hai, jisse image screen pe dikh sake before upload.   */}

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])





  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">




    
    {/*   Profile Image   */}

          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />

          <div className="space-y-2">
    




    {/*   Change Profile Picture   */}

            <p> Change Profile Picture </p>

            <div className="flex flex-row gap-3">
            
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
    




    {/*   "Select" wala button   */}

              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>

              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}