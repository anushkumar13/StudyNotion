

const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");










{/*   CREATE a new section   */}

exports.createSection = async (req, res) => {

	try {

	// Extract the required properties from the request body

		const { sectionName, courseId } = req.body;

	// Validate the input

		if (!sectionName || !courseId) {

			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

	// Create a new section with the given name

		const newSection = await Section.create({ sectionName });

	// Add the new section to the course's content array

		const updatedCourse = await Course.findByIdAndUpdate(
			
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)

			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})

			.exec();

	// Return the updated course object in the response

		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} 
	
	catch (error) {

	// Handle errors

		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};










{/*   UPDATE a section   */}
 
exports.updateSection = async (req, res) => {

	try {

		const { sectionName, sectionId,courseId } = req.body;                                      //  Request body se section ka naam, section ID aur course ID le raha hai.
		
		const section = await Section.findByIdAndUpdate(                                           //  sectionId ke through Section ko update karta hai: Yeh section ke naam ko update karega aur new: true ka matlab hai ki updated section object return hoga.
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)                                             //  Phir courseId ke through Course ko dhoondta hai, aur usme courseContent aur subSection ko populate karta hai: Yeh course ka detailed data laayega, jisme course content aur subsections bhi honge.
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})

		.exec();

		res.status(200).json({                                                                     //  Agar sab kuch sahi hai, toh success message ke saath course data return karta hai:
			success: true,
			message: section,
			data:course,
		});
	} 
	
	catch (error) {                                                                                //  Agar koi error hota hai, toh error message return karta hai:
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};










{/*   DELETE a section   */}

exports.deleteSection = async (req, res) => {

	try {

		const { sectionId, courseId }  = req.body;                                                 //  Request body se sectionId aur courseId nikaal rahe hain jo section ko identify karne ke liye chahiye.
		await Course.findByIdAndUpdate(courseId, {                                                 //  Course ke document se sectionId ko hata rahe hain, jo courseContent array mein tha (i.e., section ko course se remove kar rahe hain).
			$pull: {
				courseContent: sectionId,
			}
		})
 
		const section = await Section.findById(sectionId);                                         //  Section ko database se fetch kar rahe hain, taki usse delete kar sakein.
		console.log(sectionId, courseId);

		if(!section) {                                                                             //  Agar section nahi milta, toh "Section not Found" error message return karte hain.
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

	//delete sub section

		await SubSection.deleteMany({_id: {$in: section.subSection}});                             //  Section ke under jitne bhi subSection hain, unhe delete kar rahe hain (jo section ke sub-sections the).
 
		await Section.findByIdAndDelete(sectionId);                                                //  Section ko delete kar rahe hain.
  
	//find the updated course and return 

		const course = await Course.findById(courseId).populate({                                  //  Updated course document fetch kar rahe hain, ab usme courseContent aur uske subSection bhi populate (fill) ho jaayenge.
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
                        
		.exec();
  
		res.status(200).json({                                                                     //  Client ko success message ke saath updated course data bhej rahe hain.
			success:true,
			message:"Section deleted",
			data:course
		});
	} 
	 
	catch (error) {                                                                                //  catch block agar koi error aata hai toh usse handle kar raha hai aur "Internal server error" return kar raha hai.
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   