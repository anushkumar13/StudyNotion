// ✅ **STEP 1: REACT AUR COMPONENT IMPORT KARNA (Kyo?)**  
import React from 'react';  
import HighlightText from '../HomePage/HighlightText';  
// 🔹 **Kyo kar rahe hain?**  
//    - `React` import karna zaroori hai kyunki ye ek **React component** hai  
//    - `HighlightText` ek custom component hai jo kisi text ko **highlight** karega  
// 🔹 **Kya hoga isse?**  
//    - `HighlightText` wale text ko special styling milegi  

// ✅ **STEP 2: QUOTE COMPONENT BANANA (Kyo?)**  
const Quote = () => {  
  return (
    // 🔹 **Main Container**: Isme poora Quote ka content hoga  
    <div className="text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
      
      {/* ✅ **QUOTE TEXT (Normal + Highlighted Parts)** */}
      We are passionate about revolutionizing the way we learn. Our
      innovative platform  
      
      {/* ✅ **HIGHLIGHTED TEXT** */}
      <HighlightText text={"combines technology"} />  
      {/* 🔹 **Kyo kar rahe hain?**  
          - `HighlightText` component ka use kar rahe hain taki **"combines technology"** ka styling alag ho  
          🔹 **Kya hoga isse?**  
          - Ye text visually alag dikhega taki **important lag sake** */}

      {", "}  {/* 🔹 Extra space aur comma maintain karne ke liye */}

      {/* ✅ **GRADIENT TEXT (Expertise word)** */}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        {" "} expertise  
      </span>  
      {/* 🔹 **Kyo kar rahe hain?**  
          - `span` ka use gradient effect dene ke liye kiya hai  
          🔹 **Kya hoga isse?**  
          - "expertise" text ek **gradient color effect** me dikhega */}

      {", and community to create an"}  

      {/* ✅ **GRADIENT TEXT (Unparalleled Educational Experience)** */}
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
        {" "} unparalleled educational experience.  
      </span>  
      {/* 🔹 **Kyo kar rahe hain?**  
          - `span` ka use is text ke liye bhi **gradient effect** dene ke liye kiya hai  
          🔹 **Kya hoga isse?**  
          - Ye text bhi ek **attractive color gradient** me dikhega jo focus attract karega */}
      
    </div>
  );  
};

// ✅ **STEP 3: COMPONENT EXPORT KARNA (Kyo?)**  
export default Quote;  
// 🔹 **Kyo kar rahe hain?**  
//    - Taki ye component doosre components/pages me import karke use ho sake  
// 🔹 **Kya hoga isse?**  
//    - Ye quote kisi bhi **landing page ya about page me easily use** ho sakega  
