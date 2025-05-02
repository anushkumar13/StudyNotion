

const mongoose = require("mongoose");





{/*   Define the Courses schema   */}
 
const coursesSchema = new mongoose.Schema({                                              //  Ek naya course schema banaya ja raha hai.
 
	courseName: { type: String },                                                        //  Course ka naam (jaise "Full Stack Web Dev") — ye ek string hoga.

	courseDescription: { type: String },                                                 //  Course ka detailed description (jaise syllabus ya overview).

	instructor: {                                                                        //  Ye field batata hai ki course kis instructor (user) ne banaya hai. Ye user collection ka reference hai.
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	}, 
 
	whatYouWillLearn: {                                                                  //  Student is course se kya seekhega — wo yahan likha hoga.
		type: String, 
	},
 
	courseContent: [                                                                     //  Course ke different sections (like modules ya chapters) ka reference.
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],

	ratingAndReviews: [                                                                  //  Is course ke sabhi reviews aur ratings ke ObjectIDs yahan store hote hain.
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],

	price: {                                                                             //  Course ka price (₹ ya $ amount).
		type: Number,
	},
 
	thumbnail: {                                                                         //  Course ka thumbnail image URL.
		type: String,
	},
 
	tag: {                                                                               //  Course ke tags jaise ["JavaScript", "Frontend"] — searchable banane ke liye.
		type: [String],
		required: true,
	}, 

	category: {                                                                          //  Ye course kis category ka part hai (jaise "Web Dev") — uska reference.
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},

	studentsEnrolled: [                                                                  //   Ye course kis-kis students ne join kiya hai — sabke user IDs store karta hai.
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
 
	instructions: {                                                                      //  Special instructions for students (jaise prerequisites).
		type: [String],
	},

	status: {                                                                            //  Course ka current status — ya to draft hoga ya publish.
		type: String,
		enum: ["Draft", "Published"],
	},

	createdAt: {                                                                         //  Course kab banaya gaya tha — by default current time.
		type:Date,
		default:Date.now
	},
});





module.exports = mongoose.model("Course", coursesSchema);