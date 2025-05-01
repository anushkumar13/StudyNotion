// imports

import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";




    {/*   Ye ek array hai jisme footer ke 3 important links/texts hain — Privacy Policy, Cookie Policy, aur Terms — jo generally website ke bottom mein show hote hain.   */}

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];




    {/*   Ye ek list of resource items hai jo tumhare web app ke kisi section (jaise footer, sidebar, dropdown menu, etc.) mein show kiye jaate honge.   */}

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];




    {/*   Ye array website/app ke different plan options ko represent kar raha hai — jo user ke liye available hote hain, jaise: paid plan, student plan, ya business plan.   */}

const Plans = ["Paid memberships", "For students", "Business solutions"];




    {/*   Ye array tumhari website/app ke community features ko represent karta hai — jaha log ek dusre se interact ya collaborate kar sakte hain.   */}

const Community = ["Forums", "Chapters", "Events"];




const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          
          
          
    {/*      */}

          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              
              <img src={Logo} alt="" className="object-contain" />




    {/*   Company   */}

              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>

              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                   
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele} </Link>                           {/*  string ko lowercase mein convert karke URL banata hai jaise "About" → /about,  "Careers" → /careers  */}
                    </div>

                  );
                })}
              </div>




    {/*   Social Media Logos   */}

              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>

              <div></div>
            </div>




    {/*   Resources   */}

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>




    {/*      */}

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {                                           {/*  Ye code tumhare Resources array ke har element ko loop karke process karta hai, jisme ele har item ko represent karta hai aur index uska position (0, 1, 2, ...) batata hai.  */}
                  return (
                    <div
                      key={index}                                                          /*  key={index} React ko help karta hai list ke elements ko uniquely identify karne mein taaki jab koi item add, remove, ya update ho, React efficiently render kar sake.  */
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>                   {/*  Ye code tumhare ele string ko space ke jagah hyphen (-) se replace kar raha hai, usse lowercase kar raha hai, aur fir React Router ke Link component ke through dynamically URL generate kar raha hai. example --> "About Us" → /about-us,  "Careers" → /careers  */}
                        {ele}
                      </Link>

                    </div>
                  );
                })}
              </div>




    {/*   Support   */}

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>

              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}> Help Center </Link>                             {/*  Agar tumhare paas ek Help Center page hai, toh jab user "Help Center" pe click karega, wo /help-center page pe chala jayega.  */}
              </div>

            </div>




    {/*   Plans   */}

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>




    {/*      */}

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {                                               {/*  Ye code tumhare Plans array ke har element ko loop karke render kar raha hai, aur har element ko ek key ke saath uniquely identify kar raha hai.  */}
                  return (
                    
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>                   {/*  Ye code tumhare array ke har element ko space-separated string se hyphen-separated lowercase string mein convert karta hai aur React Router ka Link banata hai, jisme URL ko dynamically generate kiya jata hai.  */}
                        {ele}
                      </Link>

                    </div>
                  );
                })}
              </div>


            

    {/*   Community   */}

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>


              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {                                           {/*  Ye code tumhare Community array ke har element ko loop karke render kar raha hai aur har element ko uniquely identify karne ke liye key={index} ka use kar raha hai.  */}
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>                   {/*  Ye code tumhare array ke har element ko space-separated string se hyphen-separated lowercase string mein convert karta hai aur React Router ka Link generate karta hai, jisme URL ko dynamically create kiya jata hai.  */}
                        {ele}
                      </Link>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>




    {/*      */}

          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => {                                                 {/*  Ye code tumhare FooterLink2 array ke har element ko loop karke render kar raha hai, aur har element ko uniquely identify karne ke liye key={i} ka use kar raha hai.  */}
              return (
                
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  
                  <h1 className="text-richblack-50 font-semibold text-[16px]">           {/*  Ye code tumhare ele.title ko ek heading (<h1>) ke andar render kar raha hai, jisme custom CSS classes apply ki gayi hain for styling (color, font weight, size).  */}
                    {ele.title}
                  </h1>

                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {                                      {/*  Ye code tumhare ele.links array ke har element ko loop karke render kar raha hai aur har element ko uniquely identify karne ke liye key={index} ka use kar raha hai.  */}
                      return (
                        
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>                         {/*  Ye code tumhare dynamic link ko render kar raha hai, jisme link.link URL ko specify karta hai aur link.title ko display text ke roop mein dikhata hai.  */}

                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>




      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        
        
    {/*      */}

        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {                                                {/*  Ye code tumhare BottomFooter array ke har element ko loop karke render kar raha hai, aur har element ko uniquely identify karne ke liye key={index} ka use kar raha hai.  */}
              return (
                <div
                  key={i}
                  className={` ${                                                          /*  Ye code dynamically classes apply kar raha hai. Agar current item last item hai, toh border aur hover effect nahi hote, otherwise right border aur hover effect apply hoti hai.  */
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                 
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>                 {/*  Ye code tumhare ele ko dynamically URL-safe string mein convert kar raha hai, jisme spaces ko "-" se replace karke, sabko lowercase banaya jaata hai aur uss URL ko <Link> mein to prop ke through apply kiya jaata hai.  */}
                    {ele}
                  </Link>

                </div>
              );
            })}
          </div>

          <div className="text-center"> Made with ❤️ Anush Kumar Mall </div>
        </div>
      </div>
    </div>
  );
};




export default Footer;