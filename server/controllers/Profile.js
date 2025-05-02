

const Profile = require("../models/Profile")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const mongoose = require("mongoose")
const { convertSecondsToDuration } = require("../utils/secToDuration")










{/*   Method for updating a profile   */}

exports.updateProfile = async (req, res) => {

  try {

    const {                                                                                        //  Yeh line request body se user ke profile ke fields nikaal rahi hai. Agar koi field missing ho, toh uski default value "" (empty string) le raha hai.
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body

    const id = req.user.id                                                                         //  Login kiye huye user ka ID req.user.id se mil raha hai.

    // Find the profile by id

    const userDetails = await User.findById(id)                                                    //  User ke basic details database se fetch kar raha hai.
    const profile = await Profile.findById(userDetails.additionalDetails)                          //  User ke profile ka ID (additionalDetails field se) leke actual profile document la raha hai.

    const user = await User.findByIdAndUpdate(id, {                                                //  User ke firstName aur lastName ko update kar raha hai.
      firstName, 
      lastName,
    })  

    await user.save()                                                                              //  Updated user document ko database mein save kar raha hai.

    // Update the profile fields                                                                   //  Profile ke baaki fields ko update kar diya gaya hai request ke data se.
                              
    profile.dateOfBirth = dateOfBirth
    profile.about = about
    profile.contactNumber = contactNumber
    profile.gender = gender

    // Save the updated profile

    await profile.save()                                                                           //  Updated profile ko database mein save kar diya gaya hai.

    // Find the updated user details

    const updatedUserDetails = await User.findById(id)                                             //  Naya updated user object fetch kar raha hai aur additionalDetails (yaani profile) ko bhi populate (embed) kar raha hai.
      .populate("additionalDetails")
      .exec()
 
    return res.json({                                                                              //  Client ko response bhej raha hai success message aur updated data ke saath.
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } 
    
  catch (error) {                                                                                  //  catch block agar koi error aaye toh use handle karke status 500 aur error message return karta hai.
    console.log(error) 
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}










{/*   Yeh deleteAccount function ek user ka pura account delete karne ke liye use hota hai — including uska profile, course enrollments, aur progress.   */}

exports.deleteAccount = async (req, res) => {

  try {

    const id = req.user.id                                                                         //  Logged-in user ka ID nikaal raha hai.
    console.log(id)
    const user = await User.findById({ _id: id })                                                  //  User ka record database se fetch kar raha hai.
    
    if (!user) {                                                                                   //  Agar user nahi mila, toh "User not found" error bhej diya jaata hai.
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Delete Assosiated Profile with the User

    await Profile.findByIdAndDelete({                                                              //  User ke additionalDetails mein stored profile ID se uska profile document database se delete kar diya jaata hai.
      _id: new mongoose.Types.ObjectId(user.additionalDetails),
    })

    for (const courseId of user.courses) {                                                         //   User ne jitne courses join kiye hain, un sabhi ke studentsEnroled array se is user ka ID hata diya jaata hai ($pull use karke).
      await Course.findByIdAndUpdate( 
        courseId,
        { $pull: { studentsEnroled: id } },
        { new: true }
      )
    }

    // Now Delete User

    await User.findByIdAndDelete({ _id: id })                                                      //  Ab user ka main record database se hata diya jaata hai.
    res.status(200).json({                                                                         //  Response diya jaata hai client ko ki "User deleted successfully".
      success: true,
      message: "User deleted successfully", 
    })
    await CourseProgress.deleteMany({ userId: id })                                                //  Finally, user ke saare course progress records bhi hata diye jaate hain.                              
  } 
   
  catch (error) {                                                                                  //  catch block agar koi error aata hai toh usko console mein print karke client ko failure response bhejta hai.
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" })
  }
}










{/*   Yeh getAllUserDetails function logged-in user ke poore details fetch karne ke liye hai.   */}

exports.getAllUserDetails = async (req, res) => {

  try {
    const id = req.user.id                                                                         //  Logged-in user ka ID nikaal raha hai request se (usually JWT ke through milta hai).
    const userDetails = await User.findById(id)                                                    //  User ka record database se la raha hai aur uske additionalDetails (jo Profile collection mein hota hai) ko bhi saath mein fetch (populate) kar raha hai.
      .populate("additionalDetails") 
      .exec()
      
    console.log(userDetails)                                                                       //  Debugging ke liye terminal pe complete user details print karta hai.

    res.status(200).json({                                                                         //  Client ko success message ke saath pura user data bhej raha hai.
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } 
   
  catch (error) {                                                                                  //  catch block agar koi error aaye toh uska message ke saath error response return karta hai.
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}










{/*   Yeh updateDisplayPicture function user ki profile photo update karne ke liye hai.   */}

exports.updateDisplayPicture = async (req, res) => {

  try {

    const displayPicture = req.files.displayPicture                                                //  Request se user ki uploaded image (displayPicture) ko le raha hai.
    const userId = req.user.id                                                                     //  Logged-in user ka ID le raha hai JWT se.
    const image = await uploadImageToCloudinary(                                                   //  Image ko Cloudinary pe upload kar raha hai. Height aur width 1000x1000 set kiye gaye hain.
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)                                                                             //  Cloudinary se aayi image ki details terminal me print karta hai for debugging.
    const updatedProfile = await User.findByIdAndUpdate(                                           //  User ke image field me Cloudinary se mila image URL update kar raha hai. { new: true } ka matlab updated document return kare.
      { _id: userId }, 
      { image: image.secure_url },
      { new: true }
    )
    res.send({                                                                                     //  Client ko success message aur updated profile bhej raha hai.
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } 
  
  catch (error) {                                                                                  //  catch block agar koi error aaye toh error message ke saath response bhej raha hai.
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}










{/*   Yeh getEnrolledCourses function user ke saare enrolled courses ko fetch karta hai, har course ka total duration aur progress percentage calculate karke bhejta hai.   */}

exports.getEnrolledCourses = async (req, res) => {

  try { 
    const userId = req.user.id                                                                     //  Logged-in user ka ID le raha hai.
    let userDetails = await User.findOne({                                                         //  User ke details fetch karta hai aur uske enrolled courses ko populate karta hai. Har course ke andar courseContent, aur uske andar subSection bhi populate karta hai.
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()                                                           //  User document ko plain JavaScript object me convert karta hai, taki usme naye fields (jaise progressPercentage) add kar sakein.
    var SubsectionLength = 0                                                                       //  Har course ke total subsections ko count karne ke liye variable banaya gaya hai.

    for (var i = 0; i < userDetails.courses.length; i++) {                                         //  Ab loop chalu hota hai har course ke liye:
      let totalDurationInSeconds = 0                                                               //  → Course ka total video duration seconds me count karne ke liye.
      SubsectionLength = 0                                                                         //  → Is course ke total video subsections count karne ke liye.

      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {                      //  Phir inner loop chalu hota hai courseContent pe:
        totalDurationInSeconds += userDetails.courses[i].courseContent[                            //  Har subSection ka timeDuration number me convert karke totalDurationInSeconds me jod diya jaata hai.
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(                           //  convertSecondsToDuration() se course ka human-readable time calculate hota hai (jaise "3hr 25min").
          totalDurationInSeconds
        )
        SubsectionLength +=                                                                        //  har section ke andar kitne videos hain, wo count kar raha hai.
          userDetails.courses[i].courseContent[j].subSection.length
      }

      let courseProgressCount = await CourseProgress.findOne({                                     //  Phir progress calculate karta hai: → User ne is course me kitne videos complete kiye, wo le raha hai.     Agar SubsectionLength == 0 hai toh progress 100% maana jaata hai.
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {

    // To make it up to 2 decimal point

        const multiplier = Math.pow(10, 2)

        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {                                                                            //   → Nahi mila toh error return karta hai.
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
 
    return res.status(200).json({                                                                  //  → Client ko user ke saare updated courses (with duration + progress) bhej raha hai.
      success: true,
      data: userDetails.courses,
    })
  } 
  
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}










{/*   Yeh instructorDashboard function ek instructor ke liye dashboard data banata hai, jisme har course ka student count aur kamaya gaya paisa (revenue) hota hai   */}

exports.instructorDashboard = async (req, res) => {

  try {
     
    const courseDetails = await Course.find({ instructor: req.user.id })                           //  Jitne bhi courses instructor ne banaye hain (logged-in user ke ID se), un sabko fetch karta hai.

    const courseData = courseDetails.map((course) => {                                             //  Har course ke liye ek naya object bana raha hai with stats:
      const totalStudentsEnrolled = course.studentsEnroled.length                                  //  Course me enrolled total students gin raha hai.
      const totalAmountGenerated = totalStudentsEnrolled * course.price                            //  Us course se total paisa calculate kar raha hai (students × course ka price).

    // Create a new object with the additional fields

      const courseDataWithStats = {                                                                //  Fir ek object courseDataWithStats banata hai jisme:     course ka _id, courseName, courseDescription.     totalStudentsEnrolled aur totalAmountGenerated include karta haitotalStudentsEnrolled aur totalAmountGenerated include karta hai
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,

    // Include other course properties as needed

        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats                                                                   //  Har course ke liye aisa object bana kar ek array me return karta hai.
    })

    res.status(200).json({ courses: courseData })                                                  //  Client ko response me saare course ka summary stats deta hai.
  } 
   
  catch (error) {                                                                                  //  Agar koi error aaye toh catch block me console me print karta hai aur "Server Error" response bhejta hai.
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}