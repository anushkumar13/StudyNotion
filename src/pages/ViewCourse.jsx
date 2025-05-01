// imports

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"

import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"





    {/*      */}

export default function ViewCourse() {
  const { courseId } = useParams()                                                       //  Ye hook se courseId ko URL se fetch karta hai.
  const { token } = useSelector((state) => state.auth)                                   //  Ye state.auth se token ko fetch karta hai (user ki login status check karne ke liye).
  const dispatch = useDispatch()                                                         //  Ye Redux ka hook hai, jo actions dispatch karne ke liye use hota hai. 
  const [reviewModal, setReviewModal] = useState(false)                                  //  Ye reviewModal state create karta hai, jo initially false hai (matlab modal show nahi ho raha).





    {/*   Jab bhi yeh component load (mount) hota hai, tab yeh course ki full details fetch karta hai backend se, aur Redux store mein woh data save karta hai — jaise sections, completed lectures, total lectures, etc.   */}

  useEffect(() => {
    ;(async () => {
      
      const courseData = await getFullDetailsOfCourse(courseId, token)                   //  API call ho rahi hai — courseId aur token ke basis pe. Backend se pura course ka detailed data aa raha hai:--> courseContent (sections + lectures), completedVideos aur course ka basic info (name, description, price, etc.)

      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))             //  Course ke sections aur subsections ko Redux mein save kar diya.
      dispatch(setEntireCourseData(courseData.courseDetails))                            //  Poora course ka data (title, description, price, image) Redux store mein save kar diya.
      dispatch(setCompletedLectures(courseData.completedVideos))                         //  Kaunse videos already complete kar chuke ho, woh Redux mein store kar diya.
 




    {/*   Har section ke andar jitne subSections hain (lectures hain), unka total count calculate kar rahe ho.e   */}

      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })

      dispatch(setTotalNoOfLectures(lectures))                                           //  Aur finally, total lectures ka number Redux store mein save kar diya.
  
    })()
  
  }, [])





    {/*   Yeh ek layout bana raha hai — jisme left side mein ek sidebar hai aur right side mein main content area hai (jahan Outlet ka content render hoga).   */}

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />                          {/*  Left side mein ek Sidebar component render ho raha hai. setReviewModal naam ka ek function usko props mein diya gaya hai — taaki sidebar ke andar se review ka modal open kara sake.   */}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
         
          <div className="mx-6">
            <Outlet />
          </div>

        </div>
      </div>





    {/*   Agar reviewModal true hai, tab CourseReviewModal component ko render karo screen par   */}

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      
    </>
  )
}