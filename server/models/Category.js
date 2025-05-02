

const mongoose = require("mongoose");





{/*   Define the Tags schema   */}
 
const categorySchema = new mongoose.Schema({                                             //  Ek naya schema banaya ja raha hai using mongoose.Schema (ye schema MongoDB collection ka structure decide karta hai).
	
	name: {                                                                              //  name ek field hai jo string type ka hoga, aur required hai (isko dena zaroori hai jab bhi category banegi).
		type: String,
		required: true,
	},
	
	description: { type: String },                                                       //  description ek optional field hai jisme string mein category ka description store hoga.
	 
	courses: [                                                                           //  courses ek array hai jisme multiple course IDs store hongi.
		{
			type: mongoose.Schema.Types.ObjectId,                                        //  Har course ID ka type ObjectId hoga, aur ye Course model se linked (referenced) hoga. Matlab: ek category ke andar kai courses ho sakte hain, aur ye field un sab ka reference store karta hai.
			ref: "Course",
		},
	],
});






module.exports = mongoose.model("Category", categorySchema);