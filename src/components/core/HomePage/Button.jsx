// imports

import React from "react";
import { Link } from "react-router-dom";





{/*   Iska overall goal hai ki ek clean, customizable, aur interactive button create kiya jaaye jo kisi bhi page me easily use ho sakta hai, navigation ka kaam kare, aur UI ko appealing banaye.   */}

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
          active ? "bg-yellow-50 text-black " : "bg-richblack-800"
        } hover:shadow-none hover:scale-95 transition-all duration-200 `}
      >
        {children}
      </div>
      
    </Link>
  );
};





export default Button;





// iss file me CTAButton ka code hai (i.e; Learn More aur Book a Demo wale Button)