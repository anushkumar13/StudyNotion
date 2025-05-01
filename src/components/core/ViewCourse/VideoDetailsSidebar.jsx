// imports

import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"





export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()





    {/*   inn do paragraph ke right side wala image   */}

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)





    {/*   Jab course ka ya page ka data change hota hai, tab yeh code active section aur sub-section ka ID nikalke unko set karta hai, taaki video player aur sidebar me sahi active item dikh sake.   */}

  useEffect(() => {
    ;(() => {
      
      if (!courseSectionData.length) return                                    //  Agar courseSectionData naam ka array khali hai (yaani usmein koi data nahi hai), toh seedha function ko wahi return karke band kar do. (kyunki jab data hi nahi hai, toh aage ka logic chalane ka koi matlab nahi hai.)
      

      const currentSectionIndx = courseSectionData.findIndex(                  //  Hum courseSectionData ke andar se wo section dhund rahe hain jiska _id humare diye gaye sectionId ke barabar hai. Aur us section ka index (position number) save kar rahe hain currentSectionIndx mein.
        (data) => data._id === sectionId
      )
      

      const currentSubSectionIndx = courseSectionData?.[                       //  Phir hum us current section ke andar ke subSections mein se wo subSection dhund rahe hain jiska _id, subSectionId ke barabar ho. Aur us subSection ka index save kar rahe hain currentSubSectionIndx mein. (?. ka use kar rahe hain, taaki agar kuch galat ya undefined hua toh error na aaye.)
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)              
      

      const activeSubSectionId =                                               //  Ab hum properly confirm kar ke active subSection ka id nikaal rahe hain. Yaani jis section ka index currentSectionIndx tha, uske andar ke subSection ke andar se jis subSection ka index currentSubSectionIndx hai, uska _id nikaal rahe hain. Isse humara activeSubSectionId mil gaya.
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id


      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)            //  Active Section ka status set kar rahe hain. Yaani jo abhi humne section ka index nikaala tha, uska _id hum setActiveStatus() function ke through active karwa rahe hain.
      

      setVideoBarActive(activeSubSectionId)                                    //  Aur finally, jo active subSection id nikaali thi, use hum setVideoBarActive() function ke through set kar rahe hain.

    })()

  }, [courseSectionData, courseEntireData, location.pathname])





  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)                        //  Click karte hi user "Enrolled Courses" page pe le jaaya jaayega.
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />                                     {/*  Ye ek back arrow dikhata hai   */}
            </div>





    {/*   "Add Review" wala button jo ek modal open karega   */}

            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          
          <div className="flex flex-col">
            
            <p>{courseEntireData?.courseName}</p>                              {/*  Screen pe Course ka naam dikh raha hai   */}
            
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}                {/*  Screen pe kuch aisa dikh raha hoga jaise: "7 / 15" (Matlba 7 lectures complete ho gaye hain 15 mein se.)   */}
            </p>

          </div>

        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >





    {/*   Section   */}

              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>

                <div className="flex items-center gap-3">
                  
                  
                  
                  
                  <span
                    className={`${
                      activeStatus === course?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>

                </div>
              </div>





    {/*   Sub Sections   */}

              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >

                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      
                      {topic.title}
                    </div>
                    
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}