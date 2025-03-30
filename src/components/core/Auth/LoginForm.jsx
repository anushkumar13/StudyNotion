// ✅ **STEP 1: REACT & DEPENDENCIES IMPORT KARNA (Kyo?)**
import { useState } from "react";  
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";  
import { useDispatch } from "react-redux";  
import { Link, useNavigate } from "react-router-dom";  
import { login } from "../../../services/operations/authAPI";  

// 🔹 **Kyo kar rahe hain?**  
//    - `useState` = **State manage** karne ke liye  
//    - `useNavigate` = **Redirect** karne ke liye  
//    - `useDispatch` = **Redux action dispatch** karne ke liye  
//    - `AiOutlineEye` & `AiOutlineEyeInvisible` = **Password visibility toggle** ke liye  
//    - `Link` = **"Forgot Password" link** ke liye  
//    - `login` = **API call karne ke liye jo backend ko request bhejega**  

// ✅ **STEP 2: LOGIN FORM COMPONENT BANANA (Kyo?)**
function LoginForm() {
  // 🔹 **React Router Navigation Setup**
  const navigate = useNavigate(); // Page redirect ke liye  

  // 🔹 **Redux Dispatch Setup**
  const dispatch = useDispatch(); // Redux actions ko dispatch karne ke liye  

  // 🔹 **Form Data ke liye State**
  const [formData, setFormData] = useState({
    email: "",  
    password: "",  
  });

  // 🔹 **Password Visibility Toggle ke liye State**
  const [showPassword, setShowPassword] = useState(false);  

  // 🔹 **formData se destructuring**
  const { email, password } = formData;

  // ✅ **STEP 3: HANDLE INPUT CHANGES (Kyo?)**
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,  
      [e.target.name]: e.target.value,  
    }));
  };
  // 🔹 **Kyo kar rahe hain?**  
  //    - Ye function **input ke changes handle karega**  
  // 🔹 **Kya hoga isse?**  
  //    - Jab user **email ya password type karega, state update ho jayegi**  

  // ✅ **STEP 4: FORM SUBMIT KARNA (Kyo?)**
  const handleOnSubmit = (e) => {
    e.preventDefault(); // Page refresh hone se rokta hai  
    dispatch(login(email, password, navigate)); // Redux action dispatch karta hai  
  };
  // 🔹 **Kyo kar rahe hain?**  
  //    - Form submit hone par **login API call** kare  
  // 🔹 **Kya hoga isse?**  
  //    - User login attempt karega aur backend se response milega  

  // ✅ **STEP 5: FORM RETURN KARNA (Kyo?)**
  return (
    <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-4">
      
      {/* ✅ **Email Input Field** */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      {/* 🔹 **Kyo kar rahe hain?**  
          - User ka **email store** karne ke liye  
          🔹 **Kya hoga isse?**  
          - User input lega aur **state me store karega** */}

      {/* ✅ **Password Input Field with Eye Icon** */}
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"} // Password hide/show  
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        
        {/* ✅ **Eye Icon for Show/Hide Password** */}
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        {/* 🔹 **Kyo kar rahe hain?**  
            - Password ko show/hide toggle karne ke liye  
            🔹 **Kya hoga isse?**  
            - User **eye icon** click karega to password **dikhega ya hide hoga** */}

        {/* ✅ **Forgot Password Link** */}
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>

      {/* ✅ **Login Button** */}
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
      {/* 🔹 **Kyo kar rahe hain?**  
          - User login button click kare  
          🔹 **Kya hoga isse?**  
          - **handleOnSubmit() function chalega aur login process start hoga** */}
    </form>
  );
}

// ✅ **STEP 6: COMPONENT EXPORT KARNA (Kyo?)**
export default LoginForm;
// 🔹 **Kyo kar rahe hain?**  
//    - Taki is component ko doosre pages me **import aur use** kiya ja sake  
// 🔹 **Kya hoga isse?**  
//    - Ye login form doosre components me **reuse ho sakega** 🚀  
