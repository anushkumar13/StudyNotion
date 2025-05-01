// imports

import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"





export default function ProfileDropdown() {

  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null





  return (

    <button className="relative" onClick={() => setOpen(true)}>





    {/*   is code mein ek profile image (circular) aur ek dropdown arrow icon display ho raha hai.   */}

      <div className="flex items-center gap-x-1">
       
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />

        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {open && (
        
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >





    {/*   Yeh code ek dashboard link banata hai jo user ko my profile page par redirect karta hai, icon aur text ke saath, aur hover par background aur text color change karne ke liye styling apply karta hai.   */}

          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>

          </Link>





    {/*   Yeh code ek Logout button banata hai jo user ko logout karta hai, logout icon ke saath, aur hover karte hi background aur text color change karta hai. Isme modal/sidebar close bhi hota hai jab button click hota hai.   */}      

          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>

        </div>

      )}
      
    </button>

  )
}