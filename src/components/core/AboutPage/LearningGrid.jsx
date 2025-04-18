// imports

import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";




{/*   as an array, object banao taki map  method ka use kar sake   */}

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs", 
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];




const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">

      {LearningGridArray.map((card, i) => {                                  // card pass karo aur uska i yani inex pass karo
        return (

          <div

            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  ${       // agar i yani index, 0 hai (yani -1 order wala) to 2 column ki jagah kha jao yani ye --> "xl:col-span-2 xl:h-[294px]"  
              card.order % 2 === 1                                           // agar order odd hai to 
                ? "bg-richblack-700 h-[294px]"                             // ye karo  
                : card.order % 2 === 0                                       // aur agar order even hai to 
                ? "bg-richblack-800 h-[294px]"                             // ye karo
                : "bg-transparent"                                           // -1 order wale card ke liye background ko transparent kardo
            } ${card.order === 3 && "xl:col-start-2"}  `}                    // agar order 3 ke barabar hai to dusre column se start karna 
          >
            {card.order < 0 ? (                                              // agar card ka order 0 se kam hai yani -1 order wale ke liye to

              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">




          {/*   -1 order wale card ke liye   */}

                <div className="text-4xl font-semibold ">
                  {card.heading}                                             {/*   card ki heading insert karo yani ye insert karo --> "World-Class Learning for"   */}
                  <HighlightText text={card.highlightText} />                {/*   aur yahan pe card ka highlightText insert karo yani ki ye --> "Anyone, Anywhere"   */}
                </div>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>            {/*   Learn More wala button   */}
                    {card.BtnText}
                  </CTAButton>
                </div>

              </div>


            ) : (




          /*   baki ke cards ke liye   */
 
              <div className="p-8 flex flex-col gap-8">

                <h1 className="text-richblack-5 text-lg">{card.heading} </h1>       {/*   card ka heading dikhao   */}

                <p className="text-richblack-300 font-medium">
                  {card.description}                                                  {/*   card ka description dikhao   */}
                </p>

              </div>


            )}
          </div>
        );
      })}
    </div>
  );
};




export default LearningGrid;