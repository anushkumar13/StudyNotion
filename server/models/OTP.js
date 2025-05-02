

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");










{/*   Ye OTPSchema basically ek temporary OTP store karne ke liye banaya gaya schema hai — mostly jab user signup, login, ya password reset karta hai.   */}

const OTPSchema = new mongoose.Schema({

	email: {                                                                             //  OTP kis email ke liye generate hua hai, wo yahan store hota hai.
		type: String,
		required: true,
	},

	otp: {                                                                               //  Jo OTP send kiya gaya user ko, wo string form me yahan save hota hai.
		type: String,
		required: true,
	},
 
	createdAt: {                                                                         //  OTP kab banaya gaya hai ye batata hai. Aur expires: 60 * 5 ka matlab hai OTP sirf 5 minutes tak valid rahega. Iske baad MongoDB automatically ye document delete kar dega (thanks to TTL index).
		type: Date,
		default: Date.now,
		expires: 60 * 5, 
	},
});










{/*   Define a function to send emails   */}

async function sendVerificationEmail(email, otp) {                                                 //  Yeh function asynchronous hai (i.e. async), iska matlab hai ki iske andar koi process time le sakta hai (e.g., email bhejna). Function email aur otp parameters accept karta hai, jo verification ke liye email address aur OTP (One-Time Password) hain.

	try {

		const mailResponse = await mailSender(                                                     //  mailSender ek function hai jo email bhejne ka kaam karta hai. await ka matlab hai ki code tab tak wait karega jab tak email successfully send nahi ho jaata.
			email,                                                                                 //  Yeh mailSender function email, subject ("Verification Email"), aur email ka content jo emailTemplate(otp) se generate hota hai, ko bhejta hai.
			"Verification Email",
			emailTemplate(otp)                                                                     //  OTP ko email ke template mein insert karta hai (yeh function assume karte hain ki OTP ko ek acchi tarah se format kar ke email body banata hai).
		);

		console.log("Email sent successfully: ", mailResponse.response);                           //  Agar email successfully bhej diya gaya ho, toh console mein success message aur response print hota hai. mailResponse.response mein email ke bheje jaane ka response hota hai.
	} 
	 
	catch (error) {                                                                                //  Agar try block mein koi error hoti hai (e.g., agar email bhejte waqt koi issue aata hai), toh catch block execute hota hai.
		console.log("Error occurred while sending email: ", error);                                //  Agar koi error hoti hai, toh usko console mein log karte hain taaki debugging mein madad mile.
		throw error;                                                                               //  Is line se error ko dobara throw karte hain, taaki jo bhi function call kar raha ho usse error handle karne ka mauka mile.
	}
}










{/*   Define a post-save hook to send email after the document has been saved   */}

OTPSchema.pre("save", async function (next) {                                                      //  Yeh line mongoose pre-save hook ko define karti hai. Jab bhi OTP model ka koi new document save hoga, toh yeh function automatically execute hoga. pre("save") ka matlab hai ki yeh function save operation ke pehle chalega. async function(next) ek asynchronous function hai jo next parameter ko accept karta hai. next ek callback hai jo function ke execution ko aage badhata hai (save operation ke baad).
 
	console.log("New document saved to database");                                                 //  Jab yeh function execute hota hai, toh console mein "New document saved to database" print hota hai. Yeh log us waqt trigger hota hai jab koi document save ho raha hota hai.

	if (this.isNew) {                                                                              //  this.isNew mongoose ka ek property hai, jo yeh batata hai ki current document naya (new) hai ya nahi. Agar document naya hai, toh this.isNew true hoga aur uske andar ka code execute hoga.
		await sendVerificationEmail(this.email, this.otp);                                         //  Agar document naya hai, toh is line mein sendVerificationEmail function ko call kiya jata hai. this.email se current document ka email (jo OTP bhejna hai) liya jaata hai aur this.otp se OTP (jo user ko verify karne ke liye bhejna hai) ko pass kiya jata hai.
	}

	next();                                                                                        //  Yeh next() function call karta hai, jo mongoose ko batata hai ki save operation ko aage badhne do. Agar next() nahi call hota, toh save operation ruk jaata. Matlab jab email bhej diya gaya, tab yeh save operation ko aage badhne deta hai.
}); 
 
const OTP = mongoose.model("OTP", OTPSchema);                                                      //  Yeh line OTP model ko define karti hai mongoose ke OTPSchema ke saath. Ab OTP model ka use karke hum documents create, read, update, aur delete kar sakte hain.










module.exports = OTP;