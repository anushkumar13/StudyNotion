// imports

import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"




export default function MyCourses() {

  const { token } = useSelector((state) => state.auth)         // Yeh line Redux ke auth state se token value ko nikaal kar token variable me store karti hai. Iska matlab hai, jo user ka token store hai Redux state me, usko hum token variable me use kar sakte hain.
  const navigate = useNavigate()                               // Yeh line React Router ka useNavigate() hook use karke navigate function banati hai. Isse hum programmatically kisi bhi route (page) par navigate kar sakte hain.
  const [courses, setCourses] = useState([])                   // Yeh line ek state variable courses ko initialize karti hai, jisme initially ek empty array [] hoti hai. Aur setCourses function ko use karke is state ko update kiya ja sakta hai.




  {/*   Yeh code component render hone par ek baar fetchInstructorCourses function ko call karta hai, jo courses fetch karke state mein store karta hai.   */}

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    
  }, [])



  
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}