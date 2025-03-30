// ✅ **STEP 1: REACT AUR COMPONENTS IMPORT KAR RAHE HAIN (Kyo?)**  
import React from "react";  
import HighlightText from "../../../components/core/HomePage/HighlightText";  
import CTAButton from "../../../components/core/HomePage/Button";  
// 🔹 **Kyo kar rahe hain?**  
//    - `React` ka import zaroori hai kyunki ye ek **React component** hai  
//    - `HighlightText`: Ek component jo text ko highlight karega (important words ke liye)  
//    - `CTAButton`: Ek **Call-To-Action (CTA) button**, jo user ko kisi action pe le jayega  
// 🔹 **Kya hoga isse?**  
//    - UI me **highlighted text aur button** automatically integrate ho jayenge  

// ✅ **STEP 2: LEARNING GRID KE LIYE DATA BANANA (Kyo?)**  
const LearningGridArray = [
  {
    order: -1,  // 🔹 Order define karta hai ki grid me kis position pe aayega
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere", // 🔹 Ye text **highlight** hoga
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More", // 🔹 Button me ye text show hoga
    BtnLink: "/",  // 🔹 Button click karne par homepage pe le jayega
  },
  {
    order: 1, // 🔹 Iska position 1 hai grid me
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
// 🔹 **Kyo kar rahe hain?**  
//    - Har ek **grid item ka data yahan store kar rahe hain**  
//    - Taki hum dynamically ye data map karke UI me show kar sakein  
// 🔹 **Kya hoga isse?**  
//    - Agar koi naya item add karna ho to **bas yahan data add karna hoga** (component me change nahi karna padega)

// ✅ **STEP 3: LEARNING GRID COMPONENT BANANA (Kyo?)**  
const LearningGrid = () => {  
  return (
    // 🔹 **Main Container**: Grid ka parent div jo saara content hold karega  
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      
      {/* ✅ **LEARNING GRID ITEMS KO MAP KARNA (Kyo?)** */}
      {LearningGridArray.map((card, i) => {  
        return (
          <div
            key={i}  // 🔹 Unique key dena zaroori hai React me (performance optimization ke liye)
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  
              ${card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"  // 🔹 Agar order **odd** hai to ye color hoga  
                : card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"  // 🔹 Agar order **even** hai to ye color hoga  
                : "bg-transparent"  // 🔹 Agar order -1 hai to transparent background hoga  
            } ${card.order === 3 && "xl:col-start-2"}  `} // 🔹 Order 3 wale card ko **column 2** se start karwana hai  
          >
            {/* ✅ **SPECIAL CARD (Jisme CTA Button hai) (Kyo?)** */}
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                
                {/* ✅ **HEADING + HIGHLIGHTED TEXT** */}
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />  
                  {/* 🔹 **Kyo kar rahe hain?**  
                      - Heading ka ek part normal text hoga aur ek part highlighted  
                      🔹 **Kya hoga isse?**  
                      - `HighlightText` component important words ko visually alag karega */}
                </div>

                {/* ✅ **DESCRIPTION TEXT** */}
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                {/* ✅ **CTA BUTTON** */}
                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                  {/* 🔹 **Kyo kar rahe hain?**  
                      - User ko action lene ke liye button dena zaroori hai  
                      🔹 **Kya hoga isse?**  
                      - Button pe click karne pe user ko `BtnLink` pe redirect karega */}
                </div>

              </div>
            ) : (
              /* ✅ **NORMAL GRID CARDS (CTA Button wale cards ke alawa sab yahan aayenge)** */
              <div className="p-8 flex flex-col gap-8">
                
                {/* ✅ **CARD HEADING** */}
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                {/* ✅ **CARD DESCRIPTION** */}
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );  
};

// ✅ **STEP 4: COMPONENT EXPORT KARNA (Kyo?)**  
export default LearningGrid;  
// 🔹 **Kyo kar rahe hain?**  
//    - Taki ye component doosri jagah **import** karke use kiya ja sake  
// 🔹 **Kya hoga isse?**  
//    - Ye component kisi bhi **page ya section me import** karke use ho sakega  
