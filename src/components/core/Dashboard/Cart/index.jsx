// imports

import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"




export default function Cart() {

  const { total, totalItems } = useSelector((state) => state.cart)          // Yeh line Redux store ke cart state se total amount aur totalItems (cart me total items ka count) ko access kar rahi hai using useSelector hook.




  return (
    <>



    {/*   Cart   */}

      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>




    {/*   Courses in Cart   */}

      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>

      {total > 0 ? (           // agar cart mein number of courses, 0 se zada hain to --->

        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>

      ) : (                   // aur agar 0 se kam hai to ---> 




    /*   Your cart is empty   */

        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>

      )}
    </>
  )
}




