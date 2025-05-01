// imports

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"





export default function RenderTotalAmount() {

  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()





    {/*   jab 'Buy Now' button pe click karoge to ye functon chalega   */}
 
  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)                                       // ye line vo saare courses ki id nikalta hai jisko user buy karna chahta hai
    
    buyCourse(token, courses, user, navigate, dispatch)
  }





  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>              {/*   'Total:' likha hoga   */}
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>             {/*   Total ki value likha hoga   */}
      




    {/*   Buy Now wala button   */}

      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />

    </div>
  )
}





// cart mein total kitna amount hua uss chiz ka code iss file mein hai  