// imports

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"

import {
  fetchCourseDetails,
  getFullDetailsOfCourse,
} from "../../../../services/operations/courseDetailsAPI"





    

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)





    {/*   Jab component mount hota hai tab useEffect chalti hai, uske andar ek async function turant call hota hai jo sabse pehle loading ko true karta hai, phir getFullDetailsOfCourse function se course ki details fetch karta hai, agar course details mil jaati hain to Redux me setEditCourse(true) se edit mode on karta hai aur setCourse(...) se course data store karta hai, finally loading ko false karta hai; aur agar loading true hoti hai to screen pe ek spinner dikhaya jaata hai.   */}

  useEffect(() => {
    ;(async () => {

      setLoading(true)
      
      const result = await getFullDetailsOfCourse(courseId, token)
      
      if (result?.courseDetails) {

        dispatch(setEditCourse(true))
        
        dispatch(setCourse(result?.courseDetails))
      
      }
      
      setLoading(false)
    
    })()

  }, [])


  if (loading) {
    return (
     
     <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }





  return (
    <div>





    {/*   Edit Course   */}

      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>

      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (





    /*   Course not found   */

          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>

        )}
      </div>
    </div>
  )
}