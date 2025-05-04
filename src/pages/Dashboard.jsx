// imports

import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"





function Dashboard() {

  const { loading: profileLoading } = useSelector((state) => state.profile)              //   Yeh code Redux ke profile state me se loading value ko nikaal raha hai, aur usko profileLoading naam se use karne ke liye store kar raha hai.   
  const { loading: authLoading } = useSelector((state) => state.auth)                    //   Yeh code simply auth ke andar jo loading value hai, usse nikaal kar authLoading naam ka variable bana raha hai taaki hum use aasani se use kar saken.  





  {/*   Agar profileLoading ya authLoading me se koi bhi true hai (matlab data abhi load ho raha hai), toh loading spinner dikhata hai   */}

  if (profileLoading || authLoading) {
    
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }





  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">

      <Sidebar />

      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">

          <Outlet />
          
        </div>
      </div>
    </div>
  )
}





export default Dashboard