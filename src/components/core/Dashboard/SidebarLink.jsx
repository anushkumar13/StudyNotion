// imports

import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { resetCourseState } from "../../../slices/courseSlice"





export default function SidebarLink({ link, iconName }) {

  
  const Icon = Icons[iconName]                                                           // Yeh line Icons object me se iconName key ke corresponding value ko nikaal kar Icon variable mein store karti hai. Matlab, agar iconName "home" hai, toh Icons["home"] ko Icon mein assign kiya jaayega.
  const location = useLocation()
  const dispatch = useDispatch()





    {/*   Yeh matchRoute function ek route ko pass karta hai aur matchPath ka use karke check karta hai ki wo route current location.pathname (jo current page ka URL hai) se match karta hai ya nahi. Agar match hota hai, toh yeh true return karega.   */}
  
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }





  return (

    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >





    {/*   Ye code active page ke liye sidebar me ek yellow line dikhata hai.   */}

      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      




    {/*   Icons   */}

      <div className="flex items-center gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>

    </NavLink>
  )
}





// Iss file me Navbar ke options ko click karne par kya khulega, wo decide kiya gaya hai — aur har option ke saath uska icon bhi diya gaya hai.