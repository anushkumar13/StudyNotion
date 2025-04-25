

const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")













  {/*   ye capturePayment function tab chalta hai jab frontend se user payment start karta hai — matlab jab banda "Enroll Now" ya "Buy Now" jaise button pe click karta hai.   */}

exports.capturePayment = async (req, res) => {                                              //  Yeh ek Express.js async route handler function hai jo payment process karega.
  const { courses } = req.body                                                              //  Frontend se aayi request body mein courses array extract kiya gaya hai — yeh wo courses ke IDs hain jinhe user kharidna chahta hai
  const userId = req.user.id                                                                //  req.user.id se current logged-in user ka ID mil raha hai (probably middleware se authenticated user ka data attach hua hai).
  if (courses.length === 0) {                                                               //  Agar courses array empty hai, toh error response bhej diya jaata hai — "Please Provide Course ID".
    return res.json({ success: false, message: "Please Provide Course ID" })
  }
 
  let total_amount = 0                                                                      //  Payment calculate karne ke liye ek total_amount variable banaya gaya hai.

  for (const course_id of courses) {                                                        //  Sabhi course IDs ke liye ek ek karke processing hogi.
    let course
   
    try {

      course = await Course.findById(course_id)                                             //  Yeh line database mein se course fetch karne ki koshish karti hai.

      if (!course) {                                                                        //  Agar course nahi mila toh turant error response bhej diya jaata hai — "Could not find the Course".
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }




  {/*    Check kar raha hai ki user already enrolled hai ya nahi   */}

      const uid = new mongoose.Types.ObjectId(userId)                                       //  userId ko ek valid MongoDB ObjectId mein convert kar rahi hai, taaki usse database ke ObjectId fields ke saath compare kiya ja sake (jaise studentsEnroled array mein jo ids hoti hain).
      if (course.studentsEnroled.includes(uid)) {                                           //  Check kar raha hai --> Kya ye user (uid) is course ke studentsEnroled list mein already hai? Agar haan, toh response bhej deta hai: "Student is already Enrolled" — Yaani usko dobara enroll nahi hone dena.
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }




  {/*    add the price of the course to the total amount   */}

      total_amount += course.price                                                          //  Jo pehle se total_amount mein value hai, usme abhi waale course ka price add kar do. Yeh line baar-baar chalegi har course ke liye loop ke andar.
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }




  {/*    total amount ko paise me convert karo aur ek unique receipt banao   */}

  const options = {
    amount: total_amount * 100,                                                             //  Yeh line amount ko paise mein convert kar rahi hai. Payment gateways (jaise Razorpay) mein amount ko paise mein dena padta hai, isliye total_amount ko 100 se multiply kiya gaya hai.
    currency: "INR",                                                                        //  Yeh line currency ko set kar rahi hai. Yahan pe currency INR (Indian Rupee) hai.
    receipt: Math.random(Date.now()).toString(),                                            //  Yeh line ek unique receipt ID generate kar rahi hai. Math.random(Date.now()) ka use karke ek random number generate ho raha hai based on the current time (Date.now()), jo receipt ko unique banata hai. toString() us random number ko string mein convert karta hai taaki woh ek valid receipt ID ho.
  }




  {/*    Yeh code Razorpay payment gateway ke through payment order create kar raha hai aur agar successful hota hai, toh client ko response send karta hai. Agar koi error aata hai, toh error handling karke "Could not initiate order." message bhejta hai.   */}

  try {

    const paymentResponse = await instance.orders.create(options)                           // Yeh line payment ko initiate karne ke liye Razorpay ke API ko call kar rahi hai. instance.orders.create(options) Razorpay ke instance (Razorpay ki library) ka method hai, jisme options (jo pehle set kiye the: amount, currency, receipt ID) pass kiya gaya hai. await ka use kiya gaya hai, jiska matlab hai ki asynchronous request hai aur program ko wait karna padega jab tak response nahi milta. Agar payment create ho jati hai toh Razorpay se response milega, jo paymentResponse mein store ho jayega.
    console.log(paymentResponse)                                                            //  Yeh line paymentResponse ko console par print karne ke liye hai. Isme payment initiation ka response aayega, jaise payment order ka status, ID, aur details.
    res.json({                                                                              //  res.json({ success: true, data: paymentResponse }): --> Agar payment successful hoti hai, toh server client ko response bhejta hai. Yeh success: true ke saath paymentResponse ko response mein bhej raha hai, jo client ko dikhega.
      success: true,
      data: paymentResponse,
    })
  } 
  
  catch (error) {                                                                           //  Agar koi error hota hai (jaise network issue, API error, etc.), toh catch block execute hota hai.
    console.log(error)                                                                      //  Error ko console par print karta hai.
    res                                                                                     //  Agar payment initiate nahi ho pati, toh 500 status code ke saath "Could not initiate order." error message client ko bheja jata hai, jo yeh batata hai ki order initiate nahi ho paya.
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}













  {/*    Verify Payment   */}

exports.verifyPayment = async (req, res) => {                                               //  Request body se Razorpay se related information (order_id, payment_id, signature) aur courses aur userId ko extract kiya ja raha hai.
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses
  const userId = req.user.id

  if (                                                                                      //  Agar koi bhi necessary field missing hai (jaise order ID, payment ID, signature, courses ya user ID), toh payment failed ki message ke saath response return karte hain
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }


  let body = razorpay_order_id + "|" + razorpay_payment_id                                  //  body variable me Razorpay order ID aur payment ID ko pipe (|) ke through concatenate kiya gaya hai. Yeh string Razorpay signature verification ke liye use hoti hai.




  const expectedSignature = crypto                                                          //  Yahaan hum Node.js ka crypto module use kar rahe hain. Yeh module cryptographic operations ke liye use hota hai — jaise hashing, encryption, etc.                                           
    .createHmac("sha256", process.env.RAZORPAY_SECRET)                                      //  Razorpay ke server ke dwara send ki gayi signature ko verify karne ke liye, HMAC (Hash-based Message Authentication Code) algorithm ka use kiya ja raha hai. Yeh expectedSignature Razorpay ke secret key (RAZORPAY_SECRET) aur payment details ke basis pe generate hoti hai. crypto module ko use karke, SHA256 hashing algorithm apply kiya ja raha hai, jisse ek encrypted signature generate hoti hai.
    .update(body.toString())                                                                //  Yeh line bolti hai: “Jo bhi data (ya string) main hash karna chahta hoon, usko yahaan daalo.”     body kya hai? --> const body = razorpay_order_id + "|" + razorpay_payment_id     Matlab Razorpay ne order_id aur payment_id ko ek saath jod ke string banayi hai, jaise: "order_Hz3...|pay_Kl1..."      body.toString() kyun?  Yeh safety ke liye hota hai — ensure karta hai ki body ek string hi ho. Agar galti se body kisi aur format mein ho (like number ya object), toh toString() usko convert kar dega string mein.     .update(...) kya karega?  Ye method basically crypto ke engine ko bolta hai: “Bhai, yeh hai woh input string jisko tune hash karna hai!”   So yeh body.toString() Razorpay ke format mein input ready karta hai hashing ke liye.
    .digest("hex")                                                                          //  Iska matlab: Jo hash banta hai, usko hexadecimal format mein convert karo (jaise Razorpay ne bheja tha). Jaise: "9f38ac9f3bfa093a8f..."




  if (expectedSignature === razorpay_signature) {                                           //  Agar expectedSignature (generated signature) aur razorpay_signature (received signature) match karte hain, toh payment ko verify kiya gaya maan kar students ko enroll karte hain.
    await enrollStudents(courses, userId, res)                                              //  enrollStudents(courses, userId, res) function ko call kiya jata hai jo user ko respective courses me enroll karega.
    return res.status(200).json({ success: true, message: "Payment Verified" })             //  Agar verification successful hoti hai, toh success response send kiya jata hai with message "Payment Verified".
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })                //  Agar signatures match nahi karte hain, toh payment ko fail consider kiya jata hai aur "Payment Failed" ka message aur failure response return hota hai. 
}













  {/*    Send Confirmation Email   */}

exports.sendPaymentSuccessEmail = async (req, res) => {
  
  const { orderId, paymentId, amount } = req.body                                           //  Ye teen cheezein frontend se aati hain: orderId: Razorpay ka order ID, paymentId: Razorpay ka payment ID, amount: Kitne paise diye
  const userId = req.user.id                                                                //  Ye middleware (jaise auth) se milta hai — batata hai kaun user payment kar raha hai.

  if (!orderId || !paymentId || !amount || !userId) {                                       //  Agar koi bhi required detail missing hai, toh function yahin pe rok deta hai aur error message "Please provide all the details" bhejta hai.
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)                                     //  Ye database se User model se us student ko dhoondta hai jisne payment kiya.

    await mailSender(                                                                       //  mailSender(...): Ye function actual email bhejta hai.
      enrolledStudent.email,                                                                //  Pehla argument: Student ka email.
      `Payment Received`,                                                                   //  Doosra argument: Subject line — "Payment Received"
      paymentSuccessEmail(                                                                  //  yeh paymentSuccessEmail(...) ek function hai jo email ka HTML ya content generate karta hai.
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,                         //  Student ka full naam
        amount / 100,                                                                       //  Amount paise mein hota hai Razorpay se, isliye rupees mein convert kar rahe hain
        orderId,                                                                            //  Yeh Razorpay se aaye details hain, email mein dikhane ke liye use ho rahe
        paymentId                                                                           //  Yeh Razorpay se aaye details hain, email mein dikhane ke liye use ho rahe
      )
    )
  } 
  
  catch (error) {                                                                           //  Agar upar wale kisi bhi step mein error aata hai, toh ye catch block chalega.
    console.log("error in sending mail", error)                                             //  Console mein error --> "error in sending mail" print ho jaayega debugging ke liye.
    return res                                                                              //  Client ko response diya jaata hai: --> "Could not send email"
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}












 
  {/*    Enroll the student in the course   */}

const enrollStudents = async (courses, userId, res) => {                                    //  ye ek asynchronous function hai --> Parameters: courses: Ye array hai course IDs ka jinmein student enroll hoga. userId: Kis student ko enroll karna hai. res: Response object — agar kuch error hua toh response bhejne ke kaam aayega.
  
  if (!courses || !userId) {                                                                //  Agar course list ya userId missing hai, toh turant error message "Please Provide Course ID and User ID" bhej do client ko.
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {                                                         //  Har course ke liye ek ek baar enroll karne ki koshish karenge — agar 3 courses hain toh 3 baar chalega.
    try {




  {/*    Find the course and enroll the stundent in it   */}

      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {                                                                //  Agar course mila hi nahi (invalid courseId), toh error bhej do client ko.
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }

      console.log("Updated course: ", enrolledCourse)                                       //  jab koi course successfully update ho jaata hai (matlab student enroll ho jaata hai), toh us updated course ka pura data terminal pe print ho jaata hai

      const courseProgress = await CourseProgress.create({                                  //  Iska kaam hai "CourseProgress" naam ki nayi entry banana database ke andar, taaki har student ka ek personal progress record ban jaaye. Jab student ek course mein enroll ho jaata hai, tab ye record bhi automatically ban jaata hai.
        courseID: courseId,                                                                 //  Kaunsa course hai ye progress record kis course ke liye ban raha hai
        userId: userId,                                                                     //  Yeh record kis student ke liye ban raha hai
        completedVideos: [],                                                                //  Pehle din toh student ne koi video complete nahi kiya hota, isiliye khaali list
      })




  {/*    User ko dhoondo uski ID se, uski enrolled courses ki list mein ye naya course bhi daal do, aur us course ke progress ka record bhi daal do.   */} 

      const enrolledStudent = await User.findByIdAndUpdate(                                 //  User model mein database se ek user dhoondta hai uski ID (yaani userId) ke basis pe. Saath hi, us user ka data update bhi kar deta hai.
        userId,                                                                             //  Yeh ID hai us student ki jo abhi logged in hai, aur jisne course kharida hai. Server ne authentication ke baad ye ID diya hota hai (via req.user.id).
        {
          $push: {                                                                          //  Mongoose ka keyword hai jo kisi array mein naya item add karta hai. Yahan 2 cheezein arrays mein push ho rahi hain: courses: courseId and courseProgress: courseProgress._id
            courses: courseId,                                                              //  Course ID ko user ke "courses" list mein daal rahe ho.
            courseProgress: courseProgress._id,                                             //  Abhi abhi jo course progress object banaya tha, uska ID bhi daal rahe ho.
          },
        },
        { new: true }                                                                       //  Yeh ensure karta hai ki updated student object return ho backend ko. Agar na likho to purana (update se pehle wala) object milta.
      )

      console.log("Enrolled student: ", enrolledStudent)                                    //  Console mein print karta hai updated student object ko. Backend developer check kar sakta hai ki update sahi hua ya nahi.



      
  {/*    Send a confirmation email to the enrolled students   */}

      const emailResponse = await mailSender(                                               //  mailSender ek custom helper function hai jo actually email bhejne ka kaam karta hai. Uske andar hum teen cheezein bhej rahe hain:--> enrolledStudent.email, Successfully Enrolled into ${enrolledCourse.courseName}, courseEnrollmentEmail(...)
        enrolledStudent.email,                                                              //  Kis email pe bhejna hai? Us student ka email ID jo course mein enroll hua hai.
        `Successfully Enrolled into ${enrolledCourse.courseName}`,                          //  Email ka subject line kya hoga? "Successfully Enrolled into JavaScript for Beginners" jaisa kuch. Yaani student ko ye pata chale ki kis course mein enroll hua hai.
        courseEnrollmentEmail(                                                              //  Email ka body kya hoga? ➤ Ye function hai jo email ke content ko format karta hai nicely. ➤ Usme 2 cheezein ja rahi hain:--> enrolledCourse.courseName aur ${enrolledStudent.firstName} ${enrolledStudent.lastName}
          enrolledCourse.courseName,                                                        //  Jis course mein enrollment hua hai (jaise: ML)
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`                        //  Student ka full name (jaise: Anush Kumar)
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)                      //  Ye sirf backend developer ke liye hai — Agar email bhejna successful hua to uska confirmation print ho jata hai.
    } 
     
    catch (error) {                                                                         //  Yeh block tab chalta hai jab try block mein koi error aata hai. aise: mailSender fail ho gaya, internet issue aaya, database se kuch galti ho gayi, etc.
      console.log(error)                                                                    //  Yeh sirf developer ke liye hota hai. Error ko terminal pe print kar deta hai, taaki developer ko dikhe ki problem kya hui.
      
      return res.status(400).json({ success: false, error: error.message })                 //  status(400) ---> Iska matlab hai: frontend ko turant response bhejna, jisme bataya jaaye ki kuch galat ho gaya. HTTP status code 400 ka matlab hota hai — Bad Request (yaani request thik se process nahi ho paayi).      .json({ success: false, error: error.message }) --->  Frontend ko ek JSON object bheja ja raha hai, jisme: "success": false → batata hai ki kaam successful nahi tha. "error": error.message → jo bhi error message aaya tha, wo frontend ko bhej diya.
    }
  }
}