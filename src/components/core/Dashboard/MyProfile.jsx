// imports

import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"




export default function MyProfile() {
  
  const { user } = useSelector((state) => state.profile)                                 // Yeh line Redux ke profile state se user value ko nikaal kar user variable me store karti hai.
  const navigate = useNavigate()                                                         // Yeh line React Router ka useNavigate() hook use karke navigate function banati hai, taaki hum JavaScript ke through kisi bhi route (page) pe programmatically jaa sakein.




  return (
    <>


    {/*   "My Profile"   */}

      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          
          
          
          
    {/*   user image   */}

          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />

          <div className="space-y-1">




      {/*   user first name and last name   */}

            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>




      {/*   user email   */}

            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
         



      {/*   edit wala button   */}

        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")                                              // jaise hi 'Edit' wala button click hoga to 'Settings' pe chale jaoge
          }}
        >
          <RiEditBoxLine />
        </IconBtn>

      </div>


      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">




    {/*   About   */}

          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`${
            user?.additionalDetails?.about                                               // Yeh code check karta hai ki agar user object, uska additionalDetails object, aur usme about property sab safely exist karte ho, toh us about ka value le aao. Agar koi bhi cheez missing ho, toh error na de.
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}           {/*   Yeh code check karta hai ki agar user?.additionalDetails?.about ka value available hai toh usse dikhaye, warna default message "Write Something About Yourself" dikhaye.   */} 
        </p>

      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">





    {/*   Personal Details   */}

          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>

          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          
        </div>

        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>





    {/*   First Name   */}

              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>





    {/*   Email   */}

              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>

            <div>





    {/*   Gender   */}

              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>





    {/*   Last Name   */}

              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>

            <div>





    {/*   Phone Number   */}

              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>

            <div>





    {/*   Date Of Birth   */}

              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}





// jab dropdown se dashboard click karte hain to My Profile khulta hai, uss page ka code iss file me hai