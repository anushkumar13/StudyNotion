// imports

import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"




export default function EnrolledCourses() {

  const { token } = useSelector((state) => state.auth)                // Yeh line Redux ke auth state se token value ko nikaal kar token variable me store karti hai.
  const navigate = useNavigate()                                      // Yeh line React Router ka useNavigate() hook use karke navigate function banati hai, taaki hum JavaScript ke through kisi bhi route (page) pe programmatically jaa sakein.

  const [enrolledCourses, setEnrolledCourses] = useState(null)        // Yeh line ek state variable enrolledCourses ko initialize karti hai, jisme initially null value hoti hai. Aur setEnrolledCourses function ko use karke is state ko update kiya ja sakta hai.
  
  
  
  
  {/*   Yeh function user ke enrolled courses fetch karke enrolledCourses state me store karta hai, aur agar error aaye toh ek message print karta hai.   */}

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);

      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };




  {/*   Yeh useEffect hook getEnrolledCourses function ko component ke mount hone par ek baar run karta hai.   */}
  
  useEffect(() => {
    getEnrolledCourses();
  }, [])




  return (
    <>


    {/*   Enrolled Courses   */}

      <div className="text-3xl text-richblack-50">Enrolled Courses</div>




    {/*   agar kisi course me enrolled nahi ho to ye dikhaega   */}

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (




    /*   You have not enrolled in any course yet.   */

        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>

      ) : (




    /*   agar kisi course me enrolled ho to ye dikhega  */

        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
          
            <p className="w-[45%] px-5 py-3">Course Name</p>            {/*   Course Name   */}       
            <p className="w-1/4 px-2 py-3">Duration</p>                 {/*   Duration   */}
            <p className="flex-1 px-2 py-3">Progress</p>                {/*   Progress   */}
          </div> 




          {/*   Course Names   */}
          
          {enrolledCourses.map((course, i, arr) => (
            
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >

              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >

                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />

                <div className="flex max-w-xs flex-col gap-2">

                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>

                </div>

              </div>

              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
             
             


          {/*   Progress   */}

              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">              
                <p>Progress: {course.progressPercentage || 0}%</p>





          {/*   Progress Bar   */}

                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />

              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}




// jab dropdown se dashboard click karte hain fir Enrolled Courses click karte hai to uss page ka code iss file me hai