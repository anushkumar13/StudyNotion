

const mongoose = require("mongoose");





{/*   Define the RatingAndReview schema   */}

const ratingAndReviewSchema = new mongoose.Schema({                                      //  Yeh line ek new mongoose schema define kar rahi hai jise ratingAndReviewSchema naam diya gaya hai. Mongoose schema database mein data ka structure define karta hai, aur yeh schema ratings aur reviews ke liye hoga.

	user: {                                                                              //  Yeh user field ko define karta hai, jisme user ka ObjectId store hoga.
		type: mongoose.Schema.Types.ObjectId,                                            //  matlab hai ki yeh field ek ObjectId type ka reference rakhega.
		required: true,                                                                  //  matlab hai ki yeh field mandatory hai, bina iske data save nahi ho sakta.
		ref: "user",                                                                     //  matlab hai ki yeh ObjectId user collection ka reference hoga. Iska matlab hai ki yeh field kisi user document ko refer karega.
	},

	rating: {                                                                            //  Yeh rating field ko define karta hai, jisme user ka rating store hoga.
		type: Number,                                                                    //  matlab hai ki yeh field numeric value store karega, jaise 1 se 5 ke beech koi rating.
		required: true,                                                                  //  matlab hai ki yeh field mandatory hai, bina rating ke data save nahi hoga.
	}, 

	review: {                                                                            //  Yeh review field ko define karta hai, jisme user ka written review store hoga.
		type: String,                                                                    //  matlab hai ki yeh field ek string type ki value store karega, jaise review ka text.
		required: true,                                                                  //  matlab hai ki yeh field mandatory hai, bina review ke data save nahi hoga.
	},

	course: {                                                                            //  Yeh course field ko define karta hai, jisme course ka ObjectId store hoga.
		type: mongoose.Schema.Types.ObjectId,                                            //  matlab hai ki yeh field bhi ek ObjectId reference hoga.
		required: true,                                                                  //  matlab hai ki yeh field bhi mandatory hai.
		ref: "Course",                                                                   //  matlab hai ki yeh field kisi Course collection ka reference hoga.
		index: true,                                                                     //  matlab hai ki course field par index create hoga, jo query performance ko improve karta hai.
	},
});





module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);