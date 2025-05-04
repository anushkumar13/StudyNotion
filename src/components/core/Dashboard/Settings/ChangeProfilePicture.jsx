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





    {/*   Ye function tab call hota hai jab user apne file input se koi file select karta hai. Yeh function selected file (e.target.files[0]) ko check karta hai, aur agar file hai to usse imageFile state me store karta hai aur preview ke liye previewFile(file) function call karta hai.   */}

  const handleFileChange = (e) => {
    const file = e.target.files[0]                                                       //   Jab user koi file select karta hai, to e.target.files ek array-like object hota hai jisme wo sari files hoti hain.     e.target.files[0] se hum first file ko le rahe hain (agar ek se zyada files select ho, tab pehli file ko lete hain).  
    
    if (file) {                                                                          //   Hum ye check kar rahe hain ki agar koi file select hui ho tab hum setImageFile(file) aur previewFile(file) run karte hain.
      setImageFile(file)                                                                 //   Ye function ko React state ko update karne ke liye use kiya gaya hai. setImageFile wo state setter function hoga jo tumne useState hook se banaya hoga, jisme tum selected file ko store karte ho.                    
      previewFile(file)                                                                  //   Ye ek aur function hai jo file ka preview dikhane ke liye use hota hai.
    }
  }




    
  {/*   previewFile function ka kaam hai image file ka preview dikhana. Jab user image upload karta hai, toh yeh function FileReader use karta hai us image ko read karne ke liye. Pehle readAsDataURL(file) se file ko read karta hai (yeh us image ko base64 format me convert karta hai), fir onloadend ke andar setPreviewSource(reader.result) se us converted image ko preview ke liye state me store kar deta hai.   */}

  const previewFile = (file) => {
    const reader = new FileReader()                                                      //   Ye browser ka ek built-in object hai. Iska kaam hota hai: file ko read karna aur use kisi format (jaise text, URL, base64) me convert karna.
    reader.readAsDataURL(file)                                                           //   Ye line bolti hai:-> "O reader bhai, is file ko padho aur uska Data URL bana do (jo ek image preview banane ke kaam aata hai)".   Ye process asynchronous hoti hai — matlab turant result nahi aata.
    reader.onloadend = () => {                                                           //   Jab file padh li jati hai, aur convert ho jati hai — tab onloadend waala function chalega.  Matlab:  "Jo data mila (i.e., file ka base64 encoded version), use state me daal do — taaki image preview dikh sake."
      setPreviewSource(reader.result)                                                    //   Ye hota hai file ka Data URL (base64 string), jaise: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...      Isse tum img ke src me use kar sakte ho:  <img src={previewSource} alt="preview" />
    }
  }





    {/*   handleFileUpload function image file ko backend pe bhejne ke liye banaya gaya hai. Jab user upload karta hai, tab setLoading(true) se loading start hoti hai, fir ek FormData object banaya jata hai jisme image file (imageFile) ko displayPicture key ke sath add kiya jata hai. Fir dispatch(updateDisplayPicture(...)) se Redux action ke through server pe image bheji jaati hai. Upload hone ke baad setLoading(false) se loading state hata di jaati hai. Agar koi error aata hai toh console me print ho jata hai.   */}

  const handleFileUpload = () => {
    try {

      console.log("uploading...")

      setLoading(true)

      const formData = new FormData()                                                              //   Ek special object jo tumhari file/data ko waise hi package karta hai jaise HTML forms me hota hai. Server ko samajhne me easy hota hai.

      formData.append("displayPicture", imageFile)                                                 //   Form ke andar ek field banaya "displayPicture" naam se — aur usme imageFile ko daal diya (jo file user ne select ki hai).
      
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
            alt={"profile-pic"}
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
    




    {/*   "Upload" wala button   */}

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