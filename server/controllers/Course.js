

const Course = require("../models/Course")
const Category = require("../models/Category")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")










{/*   Function to create a new course   */}

exports.createCourse = async (req, res) => {

  try {

    // Get user ID from request object

    const userId = req.user.id

    // Get all required fields from request body

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body

    // Get thumbnail image from request files

    const thumbnail = req.files.thumbnailImage

    // Convert the tag and instructions from stringified Array to Array

    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    console.log("tag", tag)
    console.log("instructions", instructions)

    // Check if any of the required fields are missing

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }

    if (!status || status === undefined) {
      status = "Draft"
    }

    // Check if the user is an instructor

    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    })

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }

    // Check if the tag given is valid

    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }

    // Upload the Thumbnail to Cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)

    // Create a new course with the given details

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })

    // Add the new course to the User Schema of the Instructor

    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )

    // Add the new course to the Categories

    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )

    console.log("HEREEEEEEEE", categoryDetails2)

    // Return the new course and a success message

    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } 
  
  catch (error) {

    // Handle any errors that occur during the creation of the course

    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}










{/*   Edit Course Details   */}

exports.editCourse = async (req, res) => {

  try {
    const { courseId } = req.body                                                             //  User ke request body se courseId nikal raha hai, jisse pata chale ki kaunsa course update karna hai.
    const updates = req.body                                                                  //  Pura request body ek variable updates mein store kar liya gaya hai, jisme baaki update hone wale fields honge.
    const course = await Course.findById(courseId)                                            //  Database mein se courseId ke basis par course ko dhoondh raha hai.

    if (!course) {                                                                            //  Agar course nahi mila, toh client ko error bhej diya gaya: "Course not found".
      return res.status(404).json({ error: "Course not found" }) 
    }

    // If Thumbnail Image is found, update it

    if (req.files) {                                                                          //  Agar thumbnail image bheji gayi hai request ke saath, toh us image ko uploadImageToCloudinary function se Cloudinary pe upload kar rahe hain. Phir uska URL course.thumbnail mein daal rahe hain.
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body

    for (const key in updates) {                                                              //  Yeh loop har field ko check karta hai. Agar key tag ya instructions hai toh usse JSON string samajh ke parse karta hai. Baaki keys ko direct assign kar deta hai course object mein.
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()                                                                       //  Saare updates ke baad course ko database mein save kar diya gaya.

    const updatedCourse = await Course.findOne({                                              //  Ab naya updated course database se nikal kar usko deeply populate kar rahe hain – jaise instructor ke details, category, rating, courseContent aur subSections bhi la rahe hain.
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({                                                                                //  Finally, response bhej rahe hain client ko success message ke saath updated course data ke form mein.
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } 
  
  catch (error) {                                                                             //   Agar kisi bhi step mein error aaya, toh usko console mein print kar rahe hain aur client ko "Internal server error" ke saath error message return kar rahe hain.
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}










{/*   Get Course List   */}

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(                                                     //  Yeh line Course collection se sirf woh courses nikaalti hai jinka status "Published" hai.
      { status: "Published" },
       
      {                                                                                       //  Yeh batata hai ki response mein sirf yeh fields chahiye — course ka naam, price, image, instructor, reviews aur enrolled students.
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")                                                                 //  Isse har course ke andar instructor ka detail bhi saath mein aa jaata hai (uski _id ke jagah pura data).
      .exec()                                                                                 //  Yeh query ko execute karta hai.

    return res.status(200).json({                                                             //  Agar sab kuch sahi hai, toh client ko success response bhejta hai saare courses ke data ke saath.
      success: true,
      data: allCourses,
    })
  } 
  
  catch (error) {                                                                             //  Agar koi dikkat aayi database fetch karte waqt, toh error console mein print hota hai aur client ko 404 ke saath failure response milta hai.
    console.log(error)

    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    })
  }
}










{/*   Company   */}

exports.getCourseDetails = async (req, res) => {

  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } 
  
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}










{/*   Yeh getCourseDetails function backend mein kisi ek course ka full detailed data laane ke liye banaya gaya hai.    */}

exports.getFullCourseDetails = async (req, res) => {

  try { 
    const { courseId } = req.body                                                             //  Request body se courseId nikala ja raha hai, jisse pata chale kaunsa course chahiye.
    const userId = req.user.id
    const courseDetails = await Course.findOne({                                              //  Yeh database se us course ko dhoondh raha hai jiska _id match karta ho courseId se.
      _id: courseId,
    })

      .populate({                                                                             //  instructor ke saath additionalDetails bhi populate ho raha hai
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
 
      .populate("category")                                                                   //  category bhi laa rahe hain

      .populate("ratingAndReviews")                                                           //  ratingAndReviews bhi fetch kar rahe hain
 
      .populate({                                                                             //  courseContent ke andar ke subSection bhi fetch ho rahe hain lekin unme videoUrl ko exclude kar diya gaya hai (privacy ya optimization ke liye)
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {                                                                     //  Agar course nahi mila toh 400 status ke saath error bhej diya ja raha hai.
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    let totalDurationInSeconds = 0                                                            //  Har subsection ke timeDuration ko seconds mein convert karke total seconds add kiye ja rahe hain.
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)                    //  Total seconds ko human-readable format (like "2h 15m") mein convert kiya ja raha hai.

    return res.status(200).json({                                                             //  Client ko success response milta hai jisme course ka full data aur uski total duration hoti hai.
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } 
  
  catch (error) {                                                                             //  catch block agar koi error aaya ho toh 500 status ke saath error message bhejta hai.
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}










{/*   Get a list of Course for a given Instructor   */}

exports.getInstructorCourses = async (req, res) => {
  try {

    // Get the instructor ID from the authenticated user or request body

    const instructorId = req.user.id

    // Find all courses belonging to the instructor

    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses

    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } 
  
  catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}










{/*   Delete the Course   */}

exports.deleteCourse = async (req, res) => {

  try {
    const { courseId } = req.body

    // Find the course

    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course

    const studentsEnrolled = course.studentsEnroled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections

    const courseSections = course.courseContent
    for (const sectionId of courseSections) {

      // Delete sub-sections of the section

      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

    // Delete the section

      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course

    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } 
  
  catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}