

const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { uploadImageToCloudinary } = require("../utils/imageUploader")










{/*   Create a new sub-section for a given section   */}

exports.createSubSection = async (req, res) => {

  try {

    // Extract necessary information from the request body

    const { sectionId, title, description } = req.body
    const video = req.files.video

    // Check if all necessary fields are provided

    if (!sectionId || !title || !description || !video) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required" })
    }
    console.log(video)

    // Upload the video file to Cloudinary

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    )

    console.log(uploadDetails)

    // Create a new sub-section with the necessary information

    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    })

    // Update the corresponding section with the newly created sub-section

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection")

    // Return the updated section in the response

    return res.status(200).json({ success: true, data: updatedSection })
  } 
  
  catch (error) {

    // Handle any errors that may occur during the process

    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}










{/*   Yeh updateSubSection function ek sub-section ke details update karne ke liye hai.   */}

exports.updateSubSection = async (req, res) => {

  try {

    const { sectionId, subSectionId, title, description } = req.body                                    //  Request body se sectionId, subSectionId, title, aur description ko nikaal rahe hain jo update karni hai.
    const subSection = await SubSection.findById(subSectionId)                                          //  SubSection ko database se find kar rahe hain jise update karna hai.

    if (!subSection) {                                                                                  //  Agar sub-section nahi milta, toh error message "SubSection not found" bhej rahe hain.
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {                                                                          //  Agar title diya gaya hai, toh usko update kar rahe hain.
      subSection.title = title
    }

    if (description !== undefined) {                                                                    //  Agar description diya gaya hai, toh usse bhi update kar rahe hain.
      subSection.description = description
    }

    if (req.files && req.files.video !== undefined) {                                                   //  Agar request mein koi video file hai, toh usse Cloudinary pe upload kar rahe hain aur uska URL aur duration sub-section ke videoUrl aur timeDuration mein save kar rahe hain.
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()                                                                             //  SubSection ko save kar rahe hain, jisme updated details hain.

    // find updated section and return it

    const updatedSection = await Section.findById(sectionId).populate(                                  //  Section ko fetch kar rahe hain aur uske subSection ko populate kar rahe hain taaki sub-section ka updated data mile.
      "subSection"
    )

    console.log("updated section", updatedSection)                                                      //  Updated section ko console mein print kar rahe hain for debugging.

    return res.json({                                                                                   //  Success message ke saath updated section data client ko bhej rahe hain.
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })
  } 
  
  catch (error) {                                                                                       //  catch block agar koi error aata hai, toh uska message print karke "An error occurred while updating the section" response bhej rahe hain.

    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}










{/*   Yeh deleteSubSection function ek sub-section ko delete karne ke liye hai.   */}

exports.deleteSubSection = async (req, res) => {

  try {

    const { subSectionId, sectionId } = req.body                                                        //  Request body se subSectionId aur sectionId nikaal rahe hain.
    await Section.findByIdAndUpdate(                                                                    //   Section ke document se subSectionId ko $pull operator se remove kar rahe hain. Yeh section ke subSection array se sub-section ko hata raha hai.
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )

    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })                        //  SubSection ko find kar ke delete kar rahe hain.

    if (!subSection) {                                                                                  //  Agar sub-section nahi milta, toh "SubSection not found" error bhej rahe hain.
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    // find updated section and return it

    const updatedSection = await Section.findById(sectionId).populate(                                  //  Section ko dobara fetch kar rahe hain aur uske subSection ko populate (fill) kar rahe hain, taaki uske updated sub-sections milein.
      "subSection"
    )

    return res.json({                                                                                   //  Client ko success message ke saath updated section data bhej rahe hain.
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })
  } 
   
  catch (error) {                                                                                       //  catch block agar koi error aata hai, toh usko handle karte hue "An error occurred while deleting the SubSection" message return karte hain.
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}