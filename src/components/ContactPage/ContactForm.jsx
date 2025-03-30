// ✅ **STEP 1: REACT IMPORT KAR RAHE HAIN**
// - Kyunki yeh ek React component hai, isliye React import karna zaroori hai.
import React from "react";

// ✅ **STEP 2: CONTACT US FORM COMPONENT IMPORT KAR RAHE HAIN**
// - Yeh ek separate component hai jo form handle karega.
import ContactUsForm from "./ContactUsForm";

// ✅ **STEP 3: FUNCTIONAL COMPONENT BANAYA JO CONTACT FORM RENDER KAREGA**
const ContactForm = () => {
  return (
    // 🔹 **Main container jo pura Contact Form ko wrap karega**
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      
      {/* ✅ **STEP 4: HEADING SHOW KARNA** */}
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        {/* - **Yeh ek attractive heading hai jo user ko invite kar rahi hai.** */}
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>

      {/* ✅ **STEP 5: SHORT DESCRIPTION SHOW KARNA** */}
      <p className="">
        {/* - **User ko bataya ja raha hai ki yeh form kis liye hai.** */}
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      {/* ✅ **STEP 6: FORM COMPONENT KO CALL KARNA** */}
      <div className="mt-7">
        <ContactUsForm /> {/* - Yeh ek separate form component hai jo user input lega. */}
      </div>

    </div>
  );
};

// ✅ **STEP 7: COMPONENT EXPORT KARNA**
export default ContactForm;
