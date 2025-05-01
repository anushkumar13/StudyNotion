// imports

import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"




    {/*   Ye array 3 alag-alag contact methods ko represent karta hai — Chat, Visit, aur Call. Har object mein 4 cheezein hoti hain: icon: icon ka naam (jo UI me symbol dikhane ke liye hota hai). heading: contact ka type (jaise Chat on us, Visit us). description: short explanation (jaise help milegi, ya location mention). details: actual contact detail (email, address, phone number).   */}

const contactDetails = [

  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },

  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },

  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]





    {/*   Purpose: Ye component 3 contact cards render karta hai — Chat, Visit, and Call — jisme icon, heading, description aur detail hota hai.    Dynamic Icons: Har object ka icon field ek string hai, jisko dynamically match kiya ja raha hai Icon1, Icon2, ya Icon3 ke andar se.    Styling: Tailwind CSS classes se background, spacing, font weight, aur responsive padding set ki gayi hai.    Loop: map() se har contact detail ek neat box ki tarah dikhaya ja raha hai with icon + text.   */}

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        
        return (
          <div
            className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} />

              <h1 className="text-lg font-semibold text-richblack-5">
                {ele?.heading}
              </h1>

            </div>

            <p className="font-medium">{ele?.description}</p>
            
            <p className="font-semibold">{ele?.details}</p>

          </div>
        )
      })}
    </div>
  )
}





export default ContactDetails