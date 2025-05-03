// imports

import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper"
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"





function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15





  {/*   Jab page load ho, toh ek baar API call karo, reviews lao, aur state me set karo taaki UI me dikh sake.   */}
 
  useEffect(() => {                                                                                     //  Jab component screen pe first time load hota hai (yaani render hota hai), tab React is useEffect ke andar ka code chalata hai. Ye ek side effect hook hai jo mostly data fetch karne ke liye use hota hai.
    ;(async () => {                                                                                     //  Yahan ek anonymous async function banaya gaya hai jo turant start bhi ho raha hai (();) Ye syntax thoda ajeeb lagta hai par iska matlab hai: "ek async function banao aur turant chala do". Aur pehle ; isliye lagaya gaya hai taaki agar upar koi JS statement ho toh syntax error na aaye.
      
      const { data } = await apiConnector(                                                              //  apiConnector() naam ka function ek custom wrapper ho sakta hai (shayad Axios ka). Ye ek GET request bhej raha hai REVIEWS_DETAILS_API endpoint par. Aur await ka matlab hai: ruk jao jab tak response na mil jaye. Fir jo bhi data response me aata hai, use destructure karke data me store kiya gaya hai.
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      
      if (data?.success) {                                                                              //  Agar data aaya aur usme success true hai (safe optional chaining ke saath), toh iska matlab API call successful thi.
        setReviews(data?.data)                                                                          //  Ab data?.data ke andar actual reviews honge. Toh unko setReviews() function se tumhari React state me daal diya gaya hai. Jisse tumhara component rerender karega aur naye reviews dikhane lagega.
      }

    })()
  }, [])

  



  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews.map((review, i) => {
            
            return (
             
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center gap-4">
                    
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                     
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>

                    </div>
                  </div>
                 
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>

                  <div className="flex items-center gap-2 ">
                   
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>

                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}


          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
          
        </Swiper>
      </div>
    </div>
  )
}





export default ReviewSlider