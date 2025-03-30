// ✅ **STEP 1: REACT IMPORT KAR RAHE HAIN**
// - React components ko use karne ke liye React import karna padta hai.
import React from "react"

// ✅ **STEP 2: MULTIPLE ICON LIBRARIES IMPORT KAR RAHE HAIN**
// - `"react-icons/bi"` ➝ Bi (BoxIcons)
// - `"react-icons/hi2"` ➝ Hi2 (HeroIcons v2)
// - `"react-icons/io5"` ➝ Io5 (IonIcons v5)
// - `* as Icon1` ➝ Saare icons ek object me store ho jayenge. Hum object notation se access kar sakte hain.
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

// ✅ **STEP 3: CONTACT DETAILS KI LIST BANAI HAI**
// - Yeh ek **array of objects** hai jisme **contact section ka data** store hai.
const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight", // ✅ **HeroIcons v2 se chat icon use ho raha hai.**
    heading: "Chat on us", // ✅ **Section ka title.**
    description: "Our friendly team is here to help.", // ✅ **Section ka short description.**
    details: "info@studynotion.com", // ✅ **Contact email.**
  },
  {
    icon: "BiWorld", // ✅ **BoxIcons se globe icon.**
    heading: "Visit us", // ✅ **Title - Office ka address batane ke liye.**
    description: "Come and say hello at our office HQ.", // ✅ **Invitation message.**
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016", // ✅ **Full office address.**
  },
  {
    icon: "IoCall", // ✅ **IonIcons se phone icon.**
    heading: "Call us", // ✅ **Title - Call karne ke liye info.**
    description: "Mon - Fri From 8am to 5pm", // ✅ **Timing di gayi hai.**
    details: "+123 456 7869", // ✅ **Phone number diya gaya hai.**
  },
]

// ✅ **STEP 4: FUNCTIONAL COMPONENT BANAYA JO CONTACT DETAILS RENDER KAREGA**
const ContactDetails = () => {
  return (
    // 🔹 **Main container**
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
      
      {/* ✅ **STEP 5: LOOP LAGA KE HAR CONTACT DETAIL SHOW KAR RAHE HAIN** */}
      {contactDetails.map((ele, i) => {
        
        // 🔹 **Correct icon ka reference le rahe hain**
        // - Icon1, Icon2, Icon3 me se jo match karega wahi assign hoga.
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]

        return (
          // 🔹 **Individual Contact Card**
          <div
            className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
            key={i} // ✅ **React ke liye unique key deni zaroori hai.**
          >
            
            {/* ✅ **STEP 6: ICON + HEADING SHOW KARNA** */}
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} /> {/* ✅ **Yaha pe dynamically correct icon render hoga.** */}
              <h1 className="text-lg font-semibold text-richblack-5">
                {ele?.heading} {/* ✅ **Heading dynamically aa rahi hai.** */}
              </h1>
            </div>

            {/* ✅ **STEP 7: DESCRIPTION SHOW KARNA** */}
            <p className="font-medium">{ele?.description}</p>

            {/* ✅ **STEP 8: CONTACT DETAILS SHOW KARNA** */}
            <p className="font-semibold">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

// ✅ **STEP 9: COMPONENT EXPORT KAR RAHE HAIN**
export default ContactDetails
