// ✅ **STEP 1: REACT IMPORT KAR RAHE HAIN**
// - React library se components import kar rahe hain
// - `useEffect` ➝ API se data fetch karne ke liye
// - `useState` ➝ Reviews ko store karne ke liye
import React, { useEffect, useState } from "react"

// ✅ **STEP 2: STAR RATING COMPONENT IMPORT KAR RAHE HAIN**
// - ReactStars ek external library hai jo **star rating dikhane** ke kaam aati hai
// - Isme stars ka size, color, aur interactivity control kar sakte hain
import ReactStars from "react-rating-stars-component"

// ✅ **STEP 3: SWIPER SLIDER IMPORT KAR RAHE HAIN**
// - Swiper ek **image slider/carousel** banane ka library hai
import { Swiper, SwiperSlide } from "swiper/react"

// ✅ **STEP 4: SWIPER KI CSS IMPORT KAR RAHE HAIN**
// - Yeh Swiper ke **styles ko apply** karega
import "swiper/css"           // Basic Swiper styles
import "swiper/css/free-mode" // Free movement enable karne ke liye
import "swiper/css/pagination" // Pagination dots add karne ke liye
import "../../App.css"         // Apni custom styles add karne ke liye

// ✅ **STEP 5: STAR ICON IMPORT KAR RAHE HAIN**
// - `FaStar` ➝ ⭐ Full star ke liye use hoga
import { FaStar } from "react-icons/fa"

// ✅ **STEP 6: SWIPER KE MODULES IMPORT KAR RAHE HAIN**
// - `Autoplay` ➝ Automatically slides change honge
// - `FreeMode` ➝ Swiper ko freely move karne ke liye
// - `Pagination` ➝ Pagination dots enable karne ke liye
import { Autoplay, FreeMode, Pagination } from "swiper"

// ✅ **STEP 7: API CONNECTOR IMPORT KAR RAHE HAIN**
// - `apiConnector` ➝ Backend API se data fetch karne ke liye
// - `ratingsEndpoints` ➝ API endpoint jisme reviews ka data store hai
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

// ✅ **STEP 8: REVIEWSLIDER COMPONENT BANANA**
function ReviewSlider() {
  // 🔹 **STEP 8.1: STATE BANANA**
  // - `reviews` ➝ API se jo data aayega, woh yahan store hoga
  // - `setReviews` ➝ Yeh function state update karega
  const [reviews, setReviews] = useState([])

  // 🔹 **STEP 8.2: TRUNCATE WORDS LIMIT**
  // - Review me **kitne words tak dikhane hain**
  // - Agar review lamba hai, toh truncate kar denge (e.g., "This course is amazing...")
  const truncateWords = 15

  // ✅ **STEP 9: API SE REVIEWS FETCH KAR RAHE HAIN**
  useEffect(() => {
    // 🔹 **ASYNC FUNCTION BANAYA**
    ;(async () => {
      try {
        // 🔹 **API CALL KARNA**
        const { data } = await apiConnector(
          "GET",  // `GET` method ka use kar rahe hain kyunki data lena hai
          ratingsEndpoints.REVIEWS_DETAILS_API // API endpoint jahan reviews stored hain
        )
        
        // 🔹 **STEP 9.2: RESPONSE CHECK KARNA**
        // - Agar API se `success === true` aaye, toh reviews ko store kar lo
        if (data?.success) {
          setReviews(data?.data) // Data state me daal rahe hain
        }
      } catch (error) {
        console.error("API Error: ", error) // Agar koi error aaye toh console pe show karo
      }
    })()
  }, []) // 🔄 **Empty dependency array** ➝ API sirf ek baar call hogi jab component mount hoga

  // ✅ **STEP 10: UI RENDER KAR RAHE HAIN**
  return (
    <div className="text-white">
      {/* 🔹 **STEP 10.1: SWIPER CONTAINER** */}
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        {/* ✅ **STEP 10.2: SWIPER COMPONENT** */}
        <Swiper
          slidesPerView={4}  // Ek time par **4 slides dikhenge**
          spaceBetween={25}  // Har slide ke beech **25px ka gap** hoga
          loop={true}        // **Infinite loop enable** kar rahe hain
          freeMode={true}    // **Free movement allow** kar rahe hain
          autoplay={{
            delay: 2500,               // **2.5 seconds me next slide ayegi**
            disableOnInteraction: false, // **User click kare toh bhi autoplay chalta rahe**
          }}
          modules={[FreeMode, Pagination, Autoplay]} // **Swiper ke modules add kar rahe hain**
          className="w-full"
        >
          {/* ✅ **STEP 11: REVIEWS KO MAP KAR RAHE HAIN** */}
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                {/* ✅ **STEP 11.1: SINGLE REVIEW BOX** */}
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  
                  {/* ✅ **STEP 11.2: USER DETAILS (PROFILE IMAGE + NAME + COURSE)** */}
                  <div className="flex items-center gap-4">
                    {/* 🔹 **USER IMAGE** */}
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="User Avatar"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    {/* 🔹 **USER NAME & COURSE** */}
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  {/* ✅ **STEP 11.3: REVIEW TEXT TRUNCATE KAR RAHE HAIN** */}
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>

                  {/* ✅ **STEP 11.4: STAR RATING SHOW KARNA** */}
                  <div className="flex items-center gap-2">
                    {/* 🔹 **NUMERIC RATING (e.g. 4.5)** */}
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>

                    {/* 🔹 **STAR RATING COMPONENT** */}
                    <ReactStars
                      count={5}  // **5 stars honge**
                      value={review.rating}  // **Rating ka value API se milega**
                      size={20}  // **Star size 20px hoga**
                      edit={false}  // **User isko edit nahi kar sakta**
                      activeColor="#ffd700"  // **Star ka color yellow hoga**
                      emptyIcon={<FaStar />}  // **Empty star ke liye icon**
                      fullIcon={<FaStar />}  // **Full star ke liye icon**
                    />
                  </div>

                </div>
              </SwiperSlide>
            )
          })}

        </Swiper>
      </div>
    </div>
  )
}

// ✅ **STEP 12: COMPONENT EXPORT KAR RAHE HAIN**
export default ReviewSlider
