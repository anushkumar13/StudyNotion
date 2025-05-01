// imports

import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';




    {/*   Yeh ek customizable course card hai jismein course ki details aur height pass kar ke dikhaya jaa sakta hai.   */}

  const Course_Card = ({course, Height}) => {
  



    {/*   yeh line ek state variable create kar rahi hai jo average review count ko store karega aur jab bhi update hoga, component re-render hoga.   */}

  const [avgReviewCount, setAvgReviewCount] = useState(0);




    {/*   ab bhi course update hota hai, toh uske sabhi reviews se average rating calculate karke avgReviewCount mein set kiya jaata hai — taki screen pe updated rating dikh sake. Yeh kaam useEffect karta hai, aur GetAvgRating function sirf average nikalne ke liye hota hai.   */}

  useEffect(()=> {

      const count = GetAvgRating(course.ratingAndReviews);
      setAvgReviewCount(count);
    
    },[course])


    

  return (
    <>
      <Link to={`/courses/${course._id}`}>                    {/*   jab user is Link par click karega, toh woh uss course ke detail page par le jaana jiska ID course._id hai.   */}
        
        <div className="">
          <div className="rounded-lg">
            



    {/*   Course ka thumbnail   */}

            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />

          </div>

          <div className="flex flex-col gap-2 px-1 py-3">
            



    {/*   Course ka naam   */}

            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            


            
    {/*   uss particular Course ka Instructor   */}

            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            <div className="flex items-center gap-2">
              
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              
              <RatingStars Review_Count={avgReviewCount} />




    {/*   kitne log rating diye hain   */}

              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>

            </div>




    {/*   Course ka Price   */}

            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          
          </div>

        </div>
      </Link>
    </>
  )
}





export default Course_Card
