// imports

import React from "react";
import ContactUsForm from "./ContactUsForm";




    {/*   Purpose: Ye component ek Contact Us form show karta hai, jisme ek heading, short description, aur form input area hota hai.    Heading ko larger font me render kiya gaya hai, aur description ko smaller text ke style mein dikhaya gaya hai.     Form: ContactUsForm component ko embed kiya gaya hai jisme form fields ho sakte hain (assuming wo separate component hai jo user input handle karta hoga).   */}

const ContactForm = () => {

  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">





    {/*   Got a Idea? We've got the skills. Let's team up   */}

      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
 

    


    {/*   Tell us more about yourself and what you're got in mind.   */}

      <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
      
    </div>
  );
};




export default ContactForm;