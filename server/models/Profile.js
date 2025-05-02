

const mongoose = require("mongoose");





{/*   Define the Profile schema   */}
 
const profileSchema = new mongoose.Schema({                                         //  Yeh line ek new mongoose schema define kar rahi hai jise profileSchema naam diya gaya hai. Mongoose schema database mein store hone wale data ka structure define karta hai.

	gender: {                                                                       //  eh gender field ko define karta hai, jisme String type ka data store hoga. Maan lo, yeh field user ka gender store karega jaise ki "Male", "Female", etc.
		type: String,
	},
	
	dateOfBirth: {                                                                  //  Yeh dateOfBirth field ko define karta hai, jisme user ka date of birth store hoga. Yeh bhi String type hai, jo date ko string format mein store karega (jaise "YYYY-MM-DD").
		type: String,
	},
	 
	about: {                                                                        //  Yeh about field ko define karta hai, jisme user apne baare mein description ya bio likh sakta hai. 
		type: String,                                                               //  type: String ka matlab hai ki yeh field ek string type ki value store karega.
		trim: true,                                                                 //  trim: true ka matlab hai ki agar user ne input ke aage ya peeche extra spaces diye hain, toh unhe remove kar diya jayega.
	},

	contactNumber: {                                                                //  Yeh contactNumber field ko define karta hai, jisme user ka contact number store hoga.
		type: Number,                                                               //  type: Number ka matlab hai ki yeh field ek numeric value store karega.
		trim: true,                                                                 //  trim: true ka matlab hai ki agar input ke aas-paas koi extra spaces hain, toh woh remove kar diye jayenge.
	},
});





module.exports = mongoose.model("Profile", profileSchema);
