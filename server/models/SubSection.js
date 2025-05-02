

const mongoose = require("mongoose");





{/*   Yeh SubSectionSchema ek Mongoose schema hai jo ek "SubSection" ko define karta hai.   */}

const SubSectionSchema = new mongoose.Schema({
 
	title: { type: String },                                                             //  Yeh sub-section ka title store karega, jo ki ek string hoga.
	
	timeDuration: { type: String },                                                      //  Yeh sub-section ka time duration store karega, jo ek string hoga (for example, "5 minutes").
	
	description: { type: String },                                                       //  Yeh sub-section ki description ko store karega, jo ek string type hoga.
	
	videoUrl: { type: String },                                                          //  Yeh sub-section ka video URL store karega, jo ek string type hoga (jisme Cloudinary ya kisi aur storage service ka URL ho sakta hai).
});





module.exports = mongoose.model("SubSection", SubSectionSchema);