// ✅ **STEP 1: NECESSARY LIBRARIES IMPORT KAR RAHE HAIN** 
// - React ko import karna zaroori hai kyunki hum React component bana rahe hain.
import React, { useEffect, useState } from "react";

// ✅ **STEP 2: FORM HANDLING LIBRARY IMPORT KAR RAHE HAIN**
// - `useForm` ek powerful hook hai jo form ka data handle karta hai, validation aur reset bhi manage karta hai.
import { useForm } from "react-hook-form";

// ✅ **STEP 3: COUNTRY CODE DATA IMPORT**
// - Yeh JSON file country codes store karti hai, taki user country select kar sake.
import CountryCode from "../../data/countrycode.json";

// ✅ **STEP 4: API CONNECTOR IMPORT**
// - API requests ko bhejne aur response handle karne ke liye `apiConnector` ka use karenge.
import { apiConnector } from "../../services/apiconnector";

// ✅ **STEP 5: CONTACT US API ENDPOINT IMPORT**
// - Yeh endpoint batayega ki API request kahan bhejni hai.
import { contactusEndpoint } from "../../services/apis";

// ✅ **STEP 6: CONTACT US FORM COMPONENT BANANA SHURU**
const ContactUsForm = () => {
  // 🔹 **Loading state jo dikhayega ki form submit ho raha hai ya nahi**
  const [loading, setLoading] = useState(false);

  // 🔹 **React Hook Form ka setup**
  const {
    register, // 🔹 Input fields ko register karne ke liye
    handleSubmit, // 🔹 Form submit hone pe kaunsa function chalega
    reset, // 🔹 Form reset karne ke liye
    formState: { errors, isSubmitSuccessful }, // 🔹 Errors aur submit status track karne ke liye
  } = useForm();

  // ✅ **STEP 7: FORM SUBMIT FUNCTION**
  // - Yeh function tab chalega jab user "Send Message" button dabayega.
  const submitContactForm = async (data) => {
    try {
      setLoading(true); // 🔹 Loading state ko `true` kar rahe hain taki button disable ho jaye.
      const res = await apiConnector(
        "POST", // 🔹 API ka method
        contactusEndpoint.CONTACT_US_API, // 🔹 API ka URL
        data // 🔹 User ke input ka data
      );
      setLoading(false); // 🔹 Loading state ko `false` kar rahe hain taki button enable ho jaye.
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message); // 🔹 Agar error aaya toh console me error message dikhao.
      setLoading(false); // 🔹 Loading ko `false` set kar rahe hain taki button wapas enable ho jaye.
    }
  };

  // ✅ **STEP 8: USEEFFECT JO FORM KO RESET KAREGA**
  // - Jab form successfully submit ho jaye, toh saare fields reset ho jayein.
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  // ✅ **STEP 9: FORM COMPONENT RETURN KAR RAHE HAIN**
  return (
    <form
      className="flex flex-col gap-7" // 🔹 Form ka layout flex column hai, jisme har field ke beech gap hai.
      onSubmit={handleSubmit(submitContactForm)} // 🔹 Jab form submit hoga toh `submitContactForm` function chalega.
    >
      {/* 🔹 **First Name & Last Name Fields** */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* 🔹 First Name Input Field */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>

        {/* 🔹 Last Name Input Field */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* 🔹 **Email Address Input Field** */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      {/* 🔹 **Phone Number Input Field (Country Code + Number)** */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>
        <div className="flex gap-5">
          {/* 🔹 Country Code Dropdown */}
          <div className="flex w-[81px] flex-col gap-2">
            <select
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>

          {/* 🔹 Phone Number Input */}
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: { value: true, message: "Please enter your Phone Number." },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* 🔹 **Message Input Field** */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      {/* 🔹 **Submit Button** */}
      <button
        disabled={loading}
        type="submit"
        className="rounded-md bg-yellow-50 px-6 py-3 text-center font-bold text-black 
          transition-all duration-200 hover:scale-95 hover:shadow-none 
          disabled:bg-richblack-500 sm:text-[16px]"
      >
        Send Message
      </button>
    </form>
  );
};

// ✅ **STEP 10: COMPONENT EXPORT KAR RAHE HAIN**
export default ContactUsForm;
