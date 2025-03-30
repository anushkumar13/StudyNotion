// ✅ **STEP 1: REACT KO IMPORT KAR RAHE HAIN (Kyo?)**  
import React from "react";  
// 🔹 **Kyo kar rahe hain?**  
//    - React ek JavaScript library hai jo UI components banane ke liye use hoti hai  
//    - Agar ye import nahi karenge to `React components` kaam nahi karenge  
// 🔹 **Kya hoga isse?**  
//    - Ye allow karega ki hum **React components** create aur use kar sakein  

// ✅ **STEP 2: CONTACT US FORM COMPONENT IMPORT KAR RAHE HAIN (Kyo?)**  
import ContactUsForm from "../../ContactPage/ContactUsForm";  
// 🔹 **Kyo kar rahe hain?**  
//    - `ContactUsForm` ek alag component hai jo **form fields** ko render karega  
//    - Code ko modular aur reusable banane ke liye hum form ko ek **alag component** me likh rahe hain  
// 🔹 **Kya hoga isse?**  
//    - Jab bhi `ContactFormSection` use hoga, `ContactUsForm` automatically load hoke dikh jayega  

// ✅ **STEP 3: CONTACT FORM SECTION COMPONENT BANANA (Kyo?)**  
const ContactFormSection = () => {  
  return (
    // 🔹 **Main Wrapper Div**: Isme pura form section wrap kiya jayega  
    <div className="mx-auto">
      
      {/* ✅ **SECTION KA TITLE (Heading 1) (Kyo?)** */}
      <h1 className="text-center text-4xl font-semibold">
        Get in Touch
      </h1>
      {/* 🔹 **Kyo kar rahe hain?**  
          - Ye ek heading hai jo user ko batayegi ki ye **contact form** section hai  
          - Taaki user ko samajh aaye ki is section ka purpose kya hai  
          🔹 **Kya hoga isse?**  
          - `text-center`: Text ko center align karega  
          - `text-4xl`: Font size ko bada banayega (jo visually attractive lage)  
          - `font-semibold`: Text ko **bold** karega taki easily readable ho */}

      {/* ✅ **SECTION KA DESCRIPTION (Paragraph) (Kyo?)** */}
      <p className="text-center text-richblack-300 mt-3">
        We&apos;d love to hear from you, Please fill out this form.
      </p>
      {/* 🔹 **Kyo kar rahe hain?**  
          - Ek chhoti si **description line** jo user ko guide kare ki form ka purpose kya hai  
          - Achi UX (User Experience) ke liye ek **friendly message** hona chahiye  
          🔹 **Kya hoga isse?**  
          - `text-center`: Isse text **center aligned** dikhega  
          - `text-richblack-300`: Ye ek halka greyish-black color dega (zyada readable)  
          - `mt-3`: Top margin add karega taki text aur heading ke beech me gap aaye */}

      {/* ✅ **ACTUAL FORM KA CONTAINER (Kyo?)** */}
      <div className="mt-12 mx-auto">
        <ContactUsForm />  
        {/* 🔹 **Kyo kar rahe hain?**  
            - **Actual form** ko yahan render karna hai  
            - Code ko modular aur clean rakhne ke liye form ek alag component me likha gaya hai  
            🔹 **Kya hoga isse?**  
            - `ContactUsForm` component load hoke **form fields show karega**  
            - User yahan apni details enter kar sakega */}
      </div>

    </div>
  );  
};

// ✅ **STEP 4: EXPORT KARNA (Kyo?)**  
export default ContactFormSection;  
// 🔹 **Kyo kar rahe hain?**  
//    - Taki ye component **kisi bhi doosri file me import kiya ja sake**  
//    - Agar export nahi karenge to ye component **doosri jagah use nahi ho payega**  
// 🔹 **Kya hoga isse?**  
//    - Is component ko **import** karke hum kisi bhi page ya doosre component me use kar sakenge  
