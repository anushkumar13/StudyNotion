// ✅ **STEP 1: REQUIRED MODULES IMPORT KARNA (Kyo?)**
import { useRef, useState } from "react"; // State aur reference handle karne ke liye  
import { AiOutlineCaretDown } from "react-icons/ai"; // Dropdown arrow ke liye  
import { VscDashboard, VscSignOut } from "react-icons/vsc"; // Dashboard aur Logout icons ke liye  
import { useDispatch, useSelector } from "react-redux"; // Redux store se user data aur logout action dispatch karne ke liye  
import { Link, useNavigate } from "react-router-dom"; // Navigation aur routing ke liye  

import useOnClickOutside from "../../../hooks/useOnClickOutside"; // Custom hook jo dropdown ko close karega  
import { logout } from "../../../services/operations/authAPI"; // Logout function jo user ko logout karega  

// ✅ **STEP 2: PROFILEDROPDOWN COMPONENT BANANA (Kyo?)**
export default function ProfileDropdown() {
  // 🔹 **Redux store se user data fetch karna**  
  const { user } = useSelector((state) => state.profile); // User ki details le rahe hain Redux store se  
  const dispatch = useDispatch(); // Redux ka function jo actions dispatch karega  
  const navigate = useNavigate(); // Navigation ke liye  

  // 🔹 **Dropdown open/close track karne ke liye state**  
  const [open, setOpen] = useState(false); // Dropdown open hai ya nahi  

  // 🔹 **Dropdown ko close karne ke liye reference aur event listener**  
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false)); // Agar user bahar click kare toh dropdown band ho jaye  

  // ✅ **Kyo kar rahe hain?**  
  //    - User ka data Redux se fetch karna  
  //    - Dropdown ka state manage karna  
  //    - Dropdown ko automatically close karwana agar user bahar click kare  

  // ✅ **Agar user login nahi hai toh kuch bhi return mat karo**  
  if (!user) return null; // User agar login nahi hai toh dropdown dikhane ka koi matlab nahi  

  return (
    // ✅ **Dropdown button jo user ka profile image show karega**
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        {/* ✅ **User ka profile image show karna** */}
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        {/* ✅ **Dropdown ka arrow icon** */}
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {/* ✅ **Agar dropdown open hai tabhi ye content dikhega** */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()} // Taaki parent ke click event se dropdown close na ho  
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref} // Dropdown ko close karne ke liye reference pass karna  
        >
          {/* ✅ **Dashboard link** */}
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          {/* ✅ **Logout button** */}
          <div
            onClick={() => {
              dispatch(logout(navigate)); // User ko logout karne ka function  
              setOpen(false); // Dropdown close karna  
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
