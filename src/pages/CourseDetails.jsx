// imports

import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"





function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  
  
  

  
    {/*   Ye pura code kaam karta hai is tarah: Jab component load hota hai ya courseId change hota hai...     Tab wo backend/API se course details fetch karta hai...     Agar data mil gaya, toh setResponse() se state update hoti hai...     Agar error aaya, toh console me error message dikhata hai...   */}

  useEffect(() => {
    ;(async () => {
      
      try {
        const res = await fetchCourseDetails(courseId)
        
        setResponse(res)
      } 
      
      catch (error) {

        console.log("Could not fetch Course Details")
      }

    })()

  }, [courseId])

  



  const [avgReviewCount, setAvgReviewCount] = useState(0)                                /*   ye line React ke andar ek state variable bana rahi hai jiska naam hai: jo kisi course ka average review count ya rating represent karta hoga.   */
  const [isActive, setIsActive] = useState(Array(0))                                     /*   Ye line ek empty array isActive ko state ke roop mein set karti hai, jisme tum baad mein elements add ya modify kar sakte ho.   */
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)                          /*   ye line ek state variable totalNoOfLectures create kar rahi hai, jisme initially 0 set hai. Tum is variable ko update karne ke liye setTotalNoOfLectures function use karoge.   */
   
  
  
  

    {/*   Jab response update hota hai, tum course ke ratings se average calculate karte ho. Fir setAvgReviewCount ke through wo average avgReviewCount state mein store karte ho. Isse tumhare paas average rating ki updated value hoti hai, jo tum UI pe dikha sakte ho.   */}

  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])
  




    {/*   Agar id already isActive array mein nahi hai, toh usse add karna. Agar id already hai, toh usse array se remove karna.   */}

  const handleActive = (id) => {
    
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }





    {/*   Jab response update hota hai, tab ye code chalega. Ye total number of lectures calculate karega by iterating through courseContent aur har section ki sub-sections ka count add karega. Final count ko setTotalNoOfLectures se state mein store karega.     Agar loading ya response nahi hai, toh ek spinner show karega.     Agar response.success false hai, toh ek error component show karega.   */}

  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])


  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }


  if (!response.success) {
    return <Error />
  }





    {/*   ye line destructuring ka use kar rahi hai: response.data?.courseDetails se course ke details ko extract karke directly variables mein store kar rahi hai. Jaise: course_id, courseName, courseDescription, etc. ko unke respective values assign kiye ja rahe hain.   */}

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails





    {/*   Agar token hai (user logged in hai), toh buyCourse function call karega aur course purchase karega.     Agar token nahi hai (user logged in nahi hai), toh ek confirmation modal show karega, jisme user ko login karne ka option milega.   */}

  const handleBuyCourse = () => {
    
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }


 

    {/*   Agar paymentLoading true hai (matlab payment process ho raha hai), toh ek loading spinner dikhayega center mein.   */}

  if (paymentLoading) {
    
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }




  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        
        
        
        
        
    {/*   Hero Section   */}

        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
             
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />

            </div>


            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>

              </div>

              <p className={`text-richblack-200`}>{courseDescription}</p>


              <div className="text-md flex flex-wrap items-center gap-2">
                
                <span className="text-yellow-25">{avgReviewCount} </span>

                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />

                <span>{`(${ratingAndReviews.length} reviews)`} </span>

                <span>{`${studentsEnrolled.length} students enrolled`} </span>

              </div>

              <div>




    {/*   "Created By"   */}

                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>

              </div>


              <div className="flex flex-wrap gap-5 text-lg">
                



    {/*   "Created at"   */}

                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>




    {/*   "English"   */}

                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>

              </div>
            </div>

            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              




    {/*   Rs.   */}

              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>




    {/*   "Buy Now" ka button   */}

              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>




    {/*   "Add to Cart" ka button   */}

              <button className="blackButton"> Add to Cart </button>

            </div>
          </div>




    {/*   Courses Card   */}

          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>

        </div>
      </div>


      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          
          
          
          
    {/*   What you'll learn   */}

          <div className="my-8 border border-richblack-600 p-8">
            
            <p className="text-3xl font-semibold"> What you'll learn </p>

            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>

          </div>




    {/*   Course Content   */}

          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">

              <p className="text-[28px] font-semibold"> Course Content </p>

              <div className="flex flex-wrap justify-between gap-2">
               
                <div className="flex gap-2">
                
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>

                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>

                  <span>
                   {response.data?.totalDuration} total length
                  </span>

                </div>


                <div>

                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>

                </div>
              </div>
            </div>




    {/*   Course Details Accordion   */}

            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>




    {/*   Author Details   */}

            <div className="mb-12 py-4">

              <p className="text-[28px] font-semibold">Author</p>

              <div className="flex items-center gap-4 py-4">
               
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />

                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>

              </div>

              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>

            </div>
          </div>
        </div>
      </div>
    




    {/*   Footer   */}

      <Footer />
    




    {/*   Jab confirmationModal true ya valid object ho, tab <ConfirmationModal /> component ko render karna. Simple words mein: conditional rendering karna.   */}
    
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </>
  )
}




export default CourseDetails