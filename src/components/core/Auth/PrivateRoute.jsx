// ✅ **STEP 1: REQUIRED MODULES IMPORT KARNA (Kyo?)**
import React from "react"; // React component banane ke liye  
import { useSelector } from "react-redux"; // Redux se auth state access karne ke liye  
import { Navigate } from "react-router-dom"; // Redirect karne ke liye  

// ✅ **STEP 2: PRIVATEROUTE COMPONENT BANANA (Kyo?)**
const PrivateRoute = ({ children }) => {
  // 🔹 **Redux store se token nikalna**  
  const { token } = useSelector((state) => state.auth);
  // ✅ **Kyo kar rahe hain?**  
  //    - Redux state me se **token fetch** kar rahe hain  
  // ✅ **Kya hoga isse?**  
  //    - Hume pata chalega ki user authenticated hai ya nahi  

  // ✅ **STEP 3: AUTHENTICATION CHECK KARNA (Kyo?)**
  if (token !== null) {
    return children; // User logged in hai, toh route allow kar do  
  } else {
    return <Navigate to="/login" />; // User logged in nahi hai, toh login page pe bhej do  
  }
  // ✅ **Kyo kar rahe hain?**  
  //    - **Agar user authenticated hai** toh route allow karenge  
  //    - **Agar user authenticated nahi hai** toh usko login page pe redirect karenge  
  // ✅ **Kya hoga isse?**  
  //    - **Authenticated users** ko private routes access mil jayenge  
  //    - **Unauthenticated users** ko login page pe redirect kar diya jayega  
};

// ✅ **STEP 4: COMPONENT EXPORT KARNA (Kyo?)**
export default PrivateRoute;
// ✅ **Kyo kar rahe hain?**  
//    - Taaki is component ko **doosre jagah import aur use** kar sakein  
// ✅ **Kya hoga isse?**  
//    - Ye component **protected routes pe apply** kiya ja sakega 🚀  
