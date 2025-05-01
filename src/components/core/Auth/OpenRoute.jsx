// imports

import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"





{/*   Ye component authentication ke basis par conditional routing karta hai, yani agar user logged in nahi hai to wo children (jo bhi component diya gaya hai) ko render hota hai, aur agar logged in hai to wo Navigate component ke through specific page par redirect hota hai.   */}

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } 

  else {

    return <Navigate to="/dashboard/my-profile" />
  }
}





export default OpenRoute