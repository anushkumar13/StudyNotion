// imports

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"                      // form banane ke liye ye import karna padta hai taki kaam asaan ho jaye jaise form reset karna etc
import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"




const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {                                                      // useForm() hook se ye sare data nikal lo
    register,                                                  // iska data nikal lo
    handleSubmit,                                              // iska data nikal lo
    reset,                                                     // iska data nikal lo
    formState: { errors, isSubmitSuccessful },
  } = useForm()




        {/*   'submitContactForm' function bana raha hai jo 'contactusEndpoint.CONTACT_US_API' URL pe 'POST' request bhej raha hai, jisme form ka data send kiya jaa raha hai.   */}

  const submitContactForm = async (data) => {
    
    try {
      setLoading(true)
      const res = await apiConnector(                          // API call 'apiConnector' function se ho rahi hai, jisme method "POST"
        "POST",
        contactusEndpoint.CONTACT_US_API,                      // 'CONTACT_US_API' call kar rahe hain
        data
      )
      
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }




        {/*   agar form successfully submit ho gya to form ke input fields ko reset kare dena   */}

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])




  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}                         // jab bhi form submit hoga to --> submitContactForm <-- iss function ko call kar dena
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">




      {/*   First Name   */}

          <label htmlFor="firstname" className="lable-style">            {/*   htmlFor ka use label tag ko input tag se connect karne ke liye hota hai   */}
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstname", { required: true })}               /*   iss line ka mtlb hai ki React Hook Form ko bolna ki yeh field form ka part hai aur yeh bharna zaroori hai.   */
          />




      {/*   Agar user ne firstname field khali chhod diya, toh yeh code usko warning message dikhata hai: "Please enter your name."   */}

          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">




      {/*   Last Name   */}

          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}                                   /*   iss line ka mtlb hai ki "lastname" wala input, form ka part hai, usme jo bhi user likhega, form usko samjhega aur yaad rakhega. required true nahi hai mtlb ye field bharna zaruri nahi hai   */
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">




      {/*   Email Address   */}

        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}                    /*   Yeh code bolta hai ki "email" field ko form me add kardo aur ensure karo ki user usse bhar ke hi submit kare, warna error aayega   */
        />




      {/*   Yeh code check karta hai ki agar "email" field me error hai (jaise user ne email nahi diya), toh ek warning message dikhata hai: "Please enter your Email address."   */}

        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">




      {/*   Phone Number   */}

        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">




      {/*   Yeh code <select> tag ka use karke ek dropdown banata hai, jisme country codes aur unke respective country names dikh rahe hain.   */}

            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style"
              {...register("countrycode", { required: true })}          /*   Yeh code "countrycode" field ko form me add kar deta hai aur ensure karta hai ki user is field ko bhar ke hi form submit kare, warna error dikhega.   */
            >
              {CountryCode.map((ele, i) => {
                return (




      /*   Yeh code har option ke liye ek dropdown item create karta hai, jisme country code aur country name dikh rahe hain.   */

                  <option key={i} value={ele.code}>
                    {ele.code} - {ele.country}
                  </option>

                )
              })}
            </select>

          </div>




      {/*   Yeh code ek input field banata hai jo user se phone number lene ke liye hai   */}

          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="xxxxx xxxxx"
              className="form-style"
              {...register("phoneNo", {                                              /*   Yeh React Hook Form ka register function hai jo phoneNo field ko form me register kar raha hai.   */
                required: {
                  value: true,                                                       /*   Yeh validation rule set karta hai ki phone number field required hai, yaani user ko is field ko bharna zaroori hai.   */
                  message: "Please enter your Phone Number.",                        /*   Agar user ne phone number nahi diya aur form submit karne ki koshish ki, toh yeh error message "Please enter your Phone Number." dikhayi dega.   */
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },           /*   Yeh validation rule ensure karta hai ki phone number ki length 12 digits se zyada na ho, agar zyada hota hai toh "Invalid Phone Number" ka error message dikhayi dega.   */
                minLength: { value: 10, message: "Invalid Phone Number" },           /*   Yeh validation rule ensure karta hai ki phone number ki length kam se kam 10 digits ho, agar kam hota hai toh "Invalid Phone Number" ka error message dikhayi dega.   */
              })}
            />

          </div>

        </div>




      {/*   Yeh code error message ko display karta hai agar phone number field me koi validation error hota hai.   */}

        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>

        )}
      </div>

      <div className="flex flex-col gap-2">




      {/*   Message   */}

        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style"
          {...register("message", { required: true })}           /*   Yeh code "message" field ko form me add kar deta hai aur ensure karta hai ki user is field ko bhar ke hi form submit kare, warna error dikhega.   */
        />




      {/*   Yeh code check karta hai ki agar "message" field me error hai (jaise user ne message nahi diya), toh ek warning message dikhata hai: "Please enter your Message."   */}

        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>




      {/*   Send Message wala button   */}

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>

    </form>
  )
}




export default ContactUsForm