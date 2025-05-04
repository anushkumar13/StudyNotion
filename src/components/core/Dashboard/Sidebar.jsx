// imports

import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"





    {/*   Yeh function ek Sidebar component banata hai, aur Redux store se profile state ke andar ka user aur loading value ko nikal raha hai. loading ko yahan profileLoading naam se use kiya gaya hai.   */}

export default function Sidebar() {

  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )





  const { loading: authLoading } = useSelector((state) => state.auth)                    // Yeh line Redux ke auth state se loading value ko nikaal rahi hai, aur usko authLoading naam ke variable me store kar rahi hai taaki baad me use kiya ja sake.
  const dispatch = useDispatch()                                                         // Yeh line Redux ka dispatch function le kar dispatch naam ke variable me store karti hai, taaki hum Redux actions ko component ke andar se call (ya bhej) kar sakein.
  const navigate = useNavigate()                                                         // Yeh line React Router ka useNavigate() hook use karke navigate function banati hai, taaki hum JavaScript ke through kisi bhi route (page) pe programmatically jaa sakein.
  const [confirmationModal, setConfirmationModal] = useState(null)                       // Yeh line ek state variable confirmationModal ko initialize karti hai, jisme initially null value hoti hai. Aur setConfirmationModal function ko use karke is state ko update kiya ja sakta hai.





    {/*   Agar profileLoading ya authLoading me se koi bhi true hai (matlab data abhi load ho raha hai), toh loading spinner dikhata hai   */}

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }




  
  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          
          {sidebarLinks.map((link) => {
            
            if (link.type && user?.accountType !== link.type) return null                // iss line ka mtlb hai ki Agar kisi link ka type aur user ka accountType uss type se match nahi karta, toh wo link sidebar me show nahi hoga. Jaise maan lo koi link sirf Instructor ke liye hai (link.type === "Instructor") Aur agar current user Student hai (user.accountType === "Student") Toh wo link skip kar diya jayega, dikhaya hi nahi jayega sidebar me.
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}

        </div>





    {/*   Ek thin horizontal line dikhana Sidebar ke center me jo do sections ko visually alag kare.   */}

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        
        
        

        
    {/*   Ye 'Settings' naam ka ek sidebar link create kar raha hai jo '/dashboard/settings' page pe le jata hai aur uske saath ek gear icon (⚙️) dikhata hai.   */}

        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />





    {/*   Sidebar me jab "Logout" button par click karte ho, to ek confirmation modal open hota hai jisme yeh message dikhai deta hai: "Are you sure?" aur "You will be logged out of your account."   */}

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),                           // Ye code user ko logout karne ke liye logout action ko dispatch karta hai aur navigate function ke through login page pe redirect karta hai.
                btn2Handler: () => setConfirmationModal(null),                           // Ye code confirmation modal ko band karne ke liye setConfirmationModal ko null set karta hai, jisse modal dikhna band ho jata hai.
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >





    {/*   Ye ek logout button banata hai jisme icon aur 'Logout' text saath me dikhte hain.   */}

            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>

          </button>

        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </>
  )
}





// Is file me uss cheez ka code hai jo dropdown se "Dashboard" pe click karne ke baad left side me 'My Profile', 'Enrolled Courses', 'Your Cart', 'Settings', aur 'Logout' wale options dikhata hai.