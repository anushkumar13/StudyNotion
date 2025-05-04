// imports

import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"





export default function RenderSteps() {

  const { step } = useSelector((state) => state.course)                             /*   Redux store ke course slice se step value nikal ke local variable step me store kar raha hai — taaki current course step ko track kiya ja sake.   */





    {/*   Yeh ek array hai jo course creation ke 3 steps ko define karta hai — har step ka id aur title diya gaya hai.   */}

  const steps = [

    {
      id: 1,
      title: "Course Information",
    },

    {
      id: 2,
      title: "Course Builder",
    },

    {
      id: 3,
      title: "Publish",
    },
    
  ]




  
  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div
              className="flex flex-col items-center "
              key={item.id}
            >

              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id





    /*   agar step === item ki id hai to yellowish dikhao   */

                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"





    /*   nahi to to gray dikhao   */

                    : "border-richblack-700 bg-richblack-800 text-richblack-300"

                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >





    {/*   agar step > item ki id hai to tick (✅ jaisa) dikhao   */}

                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (





    /*   nahi to uss step ka number (item.id) dikhana.   */   

                  item.id
                )}

              </button>
              
            </div>





    {/*   Yeh code ek progress line (line between steps) bana raha hai — lekin sirf tab jab current step last step nahi ho.   */}

            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${





    /*   Agar current step item.id se aage hai, toh yellow border dikhao (complete step), warna black border dikhao (incomplete step).   */

                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>

              </>
            )}
          </>
        ))}
      </div>



      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              




    {/*   Yeh line har step ke title ka color decide karti hai. Agar current step (step) us step (item.id) ke barabar ya bada hai → color white (text-richblack-5) ho jaata hai. Nahi to color grey (text-richblack-500) ho jaata hai.    */}

              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>





    {/* Render specific component based on current step */}

      {step === 1 && <CourseInformationForm />}                                     {/*   iss component me Course ke information ka form ka code hai   */}
      {step === 2 && <CourseBuilderForm />}                                         {/*   iss component me Course Builder ka form ka code hai   */}
      {step === 3 &&  <PublishCourse /> }                                           {/*   iss component me Course ke publish karne ka form ka code hai   */}
    </>
  )
}





// jab dashboard me jake sidebar se Add Course pe jaoge, usme jo teen steps dikha raha hai 'Course Information', 'Course Builder', aur 'Publish'
// to vo teen steps ko time to time highlight karna aur 'Course Information' wale step ka poore form ka code iss file mein hai