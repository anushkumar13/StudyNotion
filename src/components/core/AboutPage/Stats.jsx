// ✅ **STEP 1: REACT IMPORT KARNA (Kyo?)**
import React from "react";  
// 🔹 **Kyo kar rahe hain?**  
//    - Ye ek React component hai, isliye React import karna zaroori hai  
// 🔹 **Kya hoga isse?**  
//    - Component properly React ke andar work karega  

// ✅ **STEP 2: STATS DATA BANANA (Kyo?)**
const Stats = [
  { count: "5K", label: "Active Students" },  
  { count: "10+", label: "Mentors" },  
  { count: "200+", label: "Courses" },  
  { count: "50+", label: "Awards" },  
];
// 🔹 **Kyo kar rahe hain?**  
//    - Is array me **saari stats info** rakhi gayi hai jo hum UI me dikhayenge  
// 🔹 **Kya hoga isse?**  
//    - Ye data dynamically **map()** karke **render** ho sakta hai  
//    - Agar naye stats add karne ho to sirf **array update karna hoga, code nahi!** 😎  

// ✅ **STEP 3: STATS COMPONENT BANANA (Kyo?)**
const StatsComponenet = () => {
  return (
    // 🔹 **Background Container**: Poore stats section ka background
    <div className="bg-richblack-700">  

      {/* ✅ **Main Stats Wrapper (Container)** */}
      <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto">
        
        {/* ✅ **Grid Layout: 2 columns (mobile) & 4 columns (desktop)** */}
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          
          {/* ✅ **Dynamic Stats Rendering (Using .map())** */}
          {Stats.map((data, index) => {  
            return (
              // 🔹 **Each stat container**
              <div className="flex flex-col py-10" key={index}>
                
                {/* ✅ **Stats Count (Number)** */}
                <h1 className="text-[30px] font-bold text-richblack-5">
                  {data.count}  
                </h1>  
                {/* 🔹 **Kyo kar rahe hain?**  
                    - Ye `count` wo number hai jo UI me dikhna chahiye (5K, 10+, etc.)  
                    🔹 **Kya hoga isse?**  
                    - UI me **bold aur large size number** dikhega */}

                {/* ✅ **Stats Label (Description)** */}
                <h2 className="font-semibold text-[16px] text-richblack-500">
                  {data.label}  
                </h2>  
                {/* 🔹 **Kyo kar rahe hain?**  
                    - Ye `label` batayega ki ye number kis cheez ko represent kar raha hai  
                    🔹 **Kya hoga isse?**  
                    - UI me **properly labeled stats** dikhenge (e.g., "Active Students") */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ✅ **STEP 4: COMPONENT EXPORT KARNA (Kyo?)**
export default StatsComponenet;  
// 🔹 **Kyo kar rahe hain?**  
//    - Taki is component ko doosre pages me **import aur use** kiya ja sake  
// 🔹 **Kya hoga isse?**  
//    - Is stats section ko **website ke kahin bhi easily reuse** kar sakenge 🚀  
