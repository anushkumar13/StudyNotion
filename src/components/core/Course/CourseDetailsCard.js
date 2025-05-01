// imports

import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"





    {/*   Yeh CourseDetailsCard function component hai jo course details dikhata hai. Isme useSelector se user aur token ko Redux store se access kiya jata hai. useNavigate hook se navigation handle kiya jata hai aur useDispatch se actions dispatch kiye jate hain. Is component ka purpose course details dikhana aur user ko course buy karne ka option dena hai.   */}

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()





    {/*   Yeh code course object se thumbnail, price, aur _id properties ko destructure karke unhe ThumbnailImage, CurrentPrice, aur courseId variables mein store kar raha hai. Isse specific properties ko easily use kiya ja sakta hai.   */}

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course





    {/*   Yeh handleShare function current page ka URL clipboard mein copy karta hai aur user ko ek success message display karta hai ("Link copied to clipboard"). window.location.href se current page ka URL milta hai, jo copy function ke through clipboard mein store hota hai.   */}

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }





    {/*   handleAddToCart function course ko cart me add karta hai. Sabse pehle check karta hai agar user instructor hai (jo course nahi kharid sakte). Agar user logged in nahi hai, toh ek modal dikhata hai jo user ko login karne ke liye bolta hai. Agar user logged in hai, toh course ko cart me add karne ke liye action dispatch karta hai.   */}

  const handleAddToCart = () => {

    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {

      toast.error("You are an Instructor. You can't buy a course.")

      return
    }

    if (token) {

      dispatch(addToCart(course))

      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }





  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >





    {/*   Ye code ek image tag hai jo ThumbnailImage ko source ke roop me use karta hai. alt attribute me course ka naam dikhaya jata hai, jo accessibility ke liye zaroori hai. Agar image load nahi hoti, toh alt text display hoga.   */}

        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
    




    {/*   Rs.   */}

          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {CurrentPrice}
          </div>

          <div className="flex flex-col gap-4">
    




    {/*      */}

            <button
              className="yellowButton"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>

            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (





    /*   "Add to Cart" wala button   */

              <button onClick={handleAddToCart} className="blackButton">
                Add to Cart
              </button>

            )}
          </div>
    




    {/*   30-Day Money-Back Guarantee   */}

          <div>

            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>

          </div>

          <div className={``}>




    
    {/*   This Course Includes :   */} 

            <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>

            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (

                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>

                )
              })}
            </div>

          </div>

          <div className="text-center">
    




    {/*   "Share" wala button   */}

            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>

          </div>
          
        </div>
      </div>
    </>
  )
}





export default CourseDetailsCard