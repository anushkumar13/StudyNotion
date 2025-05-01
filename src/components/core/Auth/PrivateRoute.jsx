

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';




{/*   Ye component private routes ke liye hai, jisme agar user logged in hai to children render hote hain, aur agar logged out hai, to user ko login page par redirect kar diya jata hai.   */}

const PrivateRoute = ({children}) => {

    const {token} = useSelector((state) => state.auth);

    if(token !== null)
        return children
    else
        return <Navigate to="/login" />

}





export default PrivateRoute
