

const mongoose = require("mongoose");





{/*   Define the Section schema   */}

const sectionSchema = new mongoose.Schema({                                              //  Yeh sectionSchema ek Mongoose schema hai jo ek "Section" ko represent karta hai.

	sectionName: {                                                                       //  Yeh section ka naam store karega, jo ki string type hoga.
		type: String,
	},
  
	subSection: [                                                                        //  Yeh ek array hai jisme sub-sections ke ObjectIds honge.
		{
			type: mongoose.Schema.Types.ObjectId,                                        //  matlab hai ki yeh references hote hain kisi doosre document (yahan SubSection document) ke.
			required: true,                                                              //  matlab hai ki har section ko kam se kam ek sub-section hona chahiye.
			ref: "SubSection",                                                           //  matlab hai ki yeh IDs SubSection collection ke documents ko refer kar rahi hain, yeh populate karne mein madad karta hai.
		},
	],
});





module.exports = mongoose.model("Section", sectionSchema);