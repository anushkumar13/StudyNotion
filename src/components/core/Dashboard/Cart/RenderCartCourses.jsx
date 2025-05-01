// imports

import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../../../../slices/cartSlice"





export default function RenderCartCourses() {

  const { cart } = useSelector((state) => state.cart)                                    // Yeh line Redux store ke andar cart naam ke state se cart array (ya object) ko useSelector hook ke through access kar rahi hai, jisme sari cart items ki detail hoti hai.
  
  const dispatch = useDispatch()




  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >

          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            
            <img

  



            /*   Course ke thumbnail ka image   */

              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />

            <div className="flex flex-col space-y-1">





            {/*   Course ka naam   */}
              
              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>





            {/*   Course ka category   */}

              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>





            {/*   Rating   */}

              <div className="flex items-center gap-2">

                <span className="text-yellow-5">4.5</span>
                
                <ReactStars
                  count={5}                                                              // 5 stars chahiye
                  value={course?.ratingAndReviews?.length}
                  size={20}                                                              // size 20 rakh do
                  edit={false}                                                           // UI se rating ko change nahi kar sakte bas dekh sakte ho kyuki yahan average ratings dikha raha hai
                  activeColor="#ffd700"                                
                  emptyIcon={<FaStar />}                               
                  fullIcon={<FaStar />}                                
                />

                <span className="text-richblack-400">
                   {course?.ratingAndReviews?.length} Ratings                            {/*   kitne logo ne review kiya hai   */}
                </span>

              </div>
            </div>
          </div>
          
          
          <div className="flex flex-col items-end space-y-2">
            




          {/*   Remove button   */}

            <button
              onClick={() => dispatch(removeFromCart(course._id))}                       /*   Yeh line button pe click karne par Redux store se specific course ko (jo course._id ke through identify hota hai) cart se hataane ke liye removeFromCart action ko dispatch karti hai   */
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
            >

              <RiDeleteBin6Line />                                                       {/*   ye remove ka icon hai   */}
              <span>Remove</span>                                                        {/*   'Remove' likha hoga button pe   */}
            </button>





          {/*   Price   */}

            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {course?.price}                                                          {/*   ye line 'course' object se price ki value ko leke aayega   */}
            </p>

          </div>
        </div>
      ))}
    </div>
  )
}





// cart me jitne courses hain uska code iss file mein hai