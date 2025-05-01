// imports

import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"





    {/*   Yeh CourseAccordionBar component ek accordion-style UI create karta hai. Isme useRef hook ka use DOM element ko reference karne ke liye hota hai. isActive se decide hota hai ki content expand ya collapse hoga, aur handleActive function ko active state manage karne ke liye use kiya jata hai.   */}

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)





  const [active, setActive] = useState(false)
  const [sectionHeight, setSectionHeight] = useState(0)





    {/*   Yeh useEffect hook course ke active state ko manage karta hai. Jab isActive change hota hai, toh yeh setActive ko call karke check karta hai ki kya current course ka _id isActive array mein hai. Agar hai, toh course active ho jata hai.   */}

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])





    {/*   Yeh useEffect hook course section ki height ko dynamically adjust karta hai. Jab active state change hota hai, toh agar section active ho, toh contentEl.current.scrollHeight se section ki height set hoti hai. Agar section inactive ho, toh height 0 ho jati hai.   */}

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])




  
  return (
    
    <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      <div>
        
        <div
          className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
          onClick={() => {
            handleActive(course._id)
          }}
        >
          
          <div className="flex items-center gap-2">





    {/*   Yeh code AiOutlineDown icon ko rotate karta hai. Agar isActive array mein current course ka _id hai, toh icon ko rotate-180 class milti hai (jo icon ko 180 degrees rotate karti hai), aur agar nahi hai, toh icon normal (rotate-0) position pe rehta hai.   */}        

            <i
              className={
                isActive.includes(course._id) ? "rotate-180" : "rotate-0"
              }
            >
              <AiOutlineDown />
            </i>
            
            <p> {course?.sectionName} </p>

          </div>

          
          <div className="space-x-4">
            
            <span className="text-yellow-25">
              {`${course.subSection.length || 0} lecture(s)`}
            </span>

          </div>

        </div>
      </div>
      
      
      <div
        ref={contentEl}
        className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
        style={{
          height: sectionHeight,
        }}
      >
        
        <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
          {course?.subSection?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>

      </div>
    </div>
  )
}