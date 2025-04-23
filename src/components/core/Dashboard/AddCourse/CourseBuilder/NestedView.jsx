// imports

import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"




export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)




  {/*   Yeh function ek course section ko delete karta hai backend se, aur agar delete successful ho jata hai toh updated course data ko Redux mein set karta hai, aur confirmation modal ko close kar deta hai.   */}

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }




  {/*   Yeh function ek sub-section ko delete karta hai, agar successful hota hai toh course content ko update karke Redux store mein set karta hai, aur confirmation modal ko close kar deta hai.   */}

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }




  return (
    <>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >



      {/*   Section Dropdown   */}

        {course?.courseContent?.map((section) => (

          <details key={section._id} open>


      {/*   Section Dropdown Content   */}
            
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>

              </div>

              <div className="flex items-center gap-x-3">




      {/*   edit wala button jispe click karne se "Create Section"  ---><---  "Edit Section Name"   inn dono buttons me convert hota hai. mtlb agar "Create Section" button hai to "Edit Section Name" wale button me convert ho jaega   */}

                <button
                on
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />

                </button>

      


      {/*   jab delete karne wale icon pe click karoge to ek Confirmation Modal open hoga jisme do buttons honge ---> "Delete" aur "Cancel" wala button   */}

                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />            {/*   delete karne wala icon   */}

                </button>


                <span className="font-medium text-richblack-300">|</span>

                <AiFillCaretDown className={`text-xl text-richblack-300`} />

              </div>

            </summary>


            <div className="px-6 pb-4">




      {/*   Render All Sub Sections Within a Section   */}

              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>

                  </div>


                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >



      {/*   "Edit" wala button   */}

                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />

                    </button>
      



      {/*   jab delete karne wale icon pe click karoge to ek Confirmation Modal open hoga jisme do buttons honge ---> "Delete" aur "Cancel" wala button   */}

                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />

                    </button>

                  </div>
                </div>
              ))}




      {/*   "Add Lecture" wala button   */}
              
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                
                <p>Add Lecture</p>

              </button>

            </div>
          </details>
        ))}
      </div>




      {/*   Yeh code modal ko add, view, ya edit mode mein dikhata hai based on kaunsa state variable (addSubSection, viewSubSection, editSubSection) active hai.   */}


      {addSubSection ? (                                 //  Agar addSubSection truthy hai → Matlab user naya lecture add kar raha hai Toh SubSectionModal open hoga with add={true} prop
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (                             //  Agar addSubSection nahi hai but viewSubSection truthy hai → Matlab user kisi lecture ka detail dekh raha hai Toh SubSectionModal open hoga with view={true} prop
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (                             //  Agar pehle dono nahi hai but editSubSection truthy hai → Matlab user kisi existing lecture ko edit kar raha hai Toh SubSectionModal open hoga with edit={true} prop
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}




      {/*   Confirmation Modal   */}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  )
}