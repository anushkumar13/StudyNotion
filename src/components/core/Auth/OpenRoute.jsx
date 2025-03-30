// ✅ **STEP 1: REQUIRED MODULES IMPORT KARNA (Kyo?)**
import { useSelector } from "react-redux";  // Redux state se data access karne ke liye  
import { Navigate } from "react-router-dom"; // Page redirect karne ke liye  

// ✅ **STEP 2: OPENROUTE COMPONENT BANANA (Kyo?)**
function OpenRoute({ children }) {
  // 🔹 **Redux se `token` extract karna**
  const { token } = useSelector((state) => state.auth);
  // ✅ **Kyo kar rahe hain?**  
  //    - Redux store se **auth token** fetch karne ke liye  
  // ✅ **Kya hoga isse?**  
  //    - Ye check karega ki user **authenticated hai ya nahi**  

  // ✅ **STEP 3: AUTHENTICATION CHECK KARNA (Kyo?)**
  if (token === null) {
    return children; // User logged in nahi hai, toh route allow kar do  
  } else {
    return <Navigate to="/dashboard/my-profile" />; // User logged in hai, toh dashboard pe bhej do  
  }
  // ✅ **Kyo kar rahe hain?**  
  //    - **Agar user authenticated nahi hai** to allow karega  
  //    - **Agar user authenticated hai** to usko dashboard pe redirect karega  
  // ✅ **Kya hoga isse?**  
  //    - **Unauthenticated users ko specific pages access karne dega**  
  //    - **Authenticated users ko wapas dashboard pe redirect karega**  
}

// ✅ **STEP 4: COMPONENT EXPORT KARNA (Kyo?)**
export default OpenRoute;
// ✅ **Kyo kar rahe hain?**  
//    - Taaki is component ko **doosre jagah import aur use** kar sakein  
// ✅ **Kya hoga isse?**  
//    - Ye component **routes me apply** kiya ja sakega 🚀  
