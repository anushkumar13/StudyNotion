// ✅ **STEP 1: REACT LIBRARY IMPORT KAR RAHE HAIN**
// - React ek **JavaScript library hai jo UI components banane ke liye use hoti hai**
// - `useEffect` ➝ Yeh ek **React Hook hai**, jo **side effects handle** karne ke kaam aata hai
// - `useState` ➝ Yeh ek **React Hook hai**, jo **state variables ko handle** karne ke kaam aata hai
// - Dono hooks functional components ke andar use hote hain
import React, { useEffect, useState } from "react"

// ✅ **STEP 2: REACT ICONS IMPORT KAR RAHE HAIN**
// - **Yeh icons rating ke stars ke liye use honge**
// - `TiStarFullOutline` ➝ ⭐ Full Star (Pura bhara hua star)
// - `TiStarHalfOutline` ➝ ⭐⭘ Half Star (Aadha bhara hua star)
// - `TiStarOutline` ➝ ⭘ Empty Star (Khali star)
import {
  TiStarFullOutline,  // ⭐ FULL STAR
  TiStarHalfOutline,  // ⭐⭘ HALF STAR
  TiStarOutline,      // ⭘ EMPTY STAR
} from "react-icons/ti"

// ✅ **STEP 3: FUNCTIONAL COMPONENT BAN RAHA HAI**
// - Yeh ek **React Functional Component** hai jo ek rating ke stars render karega
// - **Props milenge**:
//   - `Review_Count` ➝ Kitna rating diya gaya hai (Jaise: `4.5`, `3.0`, `2.5`, etc.)
//   - `Star_Size` ➝ Kitne pixels ka star hoga (Jaise: `20px`, `30px`, `50px`, etc.)
function RatingStars({ Review_Count, Star_Size }) {
  
  // ✅ **STEP 4: STATE CREATE KAR RAHE HAIN**
  // - Iske andar **3 alag alag types ke stars ka count store hoga**
  // - `useState({})` ka use ho raha hai taaki yeh values **dynamic** ho sakein
  const [starCount, SetStarCount] = useState({
    full: 0,   // ⭐ Pura bhara hua star (Shuru me 0)
    half: 0,   // ⭐⭘ Aadha bhara hua star (Shuru me 0)
    empty: 0,  // ⭘ Khali star (Shuru me 0)
  })

  // ✅ **STEP 5: `useEffect` HOOK USE KAR RAHE HAIN**
  // - Jab bhi `Review_Count` change hoga, tabhi yeh effect chalega
  useEffect(() => {
    // 🔢 **STEP 5.1: PURA BHARA HUA STAR NIKALNA**
    // - `Math.floor(Review_Count)` ➝ Yeh `Review_Count` ka **integer part** dega
    // - Example:
    //   - `Math.floor(4.7) = 4`
    //   - `Math.floor(3.2) = 3`
    // - Agar `Review_Count` `undefined` ho ya koi galti ho toh **default `0` use karega**
    const wholeStars = Math.floor(Review_Count) || 0

    // 🔢 **STEP 5.2: HALF STAR CHECK KARNA**
    // - `Number.isInteger(Review_Count)` ➝ Check karta hai ki rating **pure integer hai ya nahi**
    // - Agar rating `3.0`, `4.0`, `5.0` ho ➝ Matlab **half star nahi hoga**
    // - Agar rating `3.5`, `4.8`, `2.3` ho ➝ Matlab **half star hoga**
    const isInteger = Number.isInteger(Review_Count)

    // 🔢 **STEP 5.3: EMPTY STARS CALCULATE KARNA**
    // - Agar rating **pure integer hai** ➝ `empty = 5 - full`
    // - Agar rating **decimal hai** ➝ `empty = 4 - full` (Kyuki ek half star hoga)
    const emptyStars = isInteger ? (5 - wholeStars) : (4 - wholeStars)

    // ✅ **STEP 5.4: STATE UPDATE KARNA**
    // - `SetStarCount({ full, half, empty })` ➝ Yeh naya data update karega
    SetStarCount({
      full: wholeStars,      // ⭐ Pura stars ka count
      half: isInteger ? 0 : 1,  // ⭐⭘ Half star hoga ya nahi
      empty: emptyStars,     // ⭘ Empty stars ka count
    })
  }, [Review_Count])  // 🔄 **Dependency array** ➝ Jab `Review_Count` change hoga, tabhi effect chalega

  // ✅ **STEP 6: RETURN PART (JO UI ME SHOW HOGA)**
  return (
    // 🔹 **Flexbox use kar rahe hain** taaki stars ek hi line me aayein
    // 🔹 `gap-1` ➝ Har star ke beech me spacing ho
    // 🔹 `text-yellow-100` ➝ Stars ka color **yellow** hoga
    <div className="flex gap-1 text-yellow-100">
      
      {/* ✅ **STEP 6.1: FULL STARS RENDER KARNA** */}
      {[...new Array(starCount.full)].map((_, i) => {
        return (
          // ⭐ **Pura bhara hua star render kar rahe hain**
          // - `key={i}` ➝ Har star ko unique key assign kar rahe hain
          <TiStarFullOutline key={i} size={Star_Size || 20} />
        )
      })}

      {/* ✅ **STEP 6.2: HALF STAR RENDER KARNA** */}
      {[...new Array(starCount.half)].map((_, i) => {
        return (
          // ⭐⭘ **Aadha bhara hua star render kar rahe hain**
          <TiStarHalfOutline key={i} size={Star_Size || 20} />
        )
      })}

      {/* ✅ **STEP 6.3: EMPTY STARS RENDER KARNA** */}
      {[...new Array(starCount.empty)].map((_, i) => {
        return (
          // ⭘ **Khali star render kar rahe hain**
          <TiStarOutline key={i} size={Star_Size || 20} />
        )
      })}
      
    </div>
  )
}

// ✅ **STEP 7: COMPONENT EXPORT KAR RAHE HAIN**
// - Isko `export default` kar rahe hain taaki yeh doosri files me use ho sake
export default RatingStars
