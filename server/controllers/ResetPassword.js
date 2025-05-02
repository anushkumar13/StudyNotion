

const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");










{/*   Yeh resetPasswordToken function ek password reset request handle karta hai. Jab user apna password reset karna chahta hai, toh yeh function ek unique token generate karke email pe bhejta hai, taki user password reset kar sake.   */}

exports.resetPasswordToken = async (req, res) => {

	try {
		
		const email = req.body.email;                                                                             //  Request body se email address le raha hai.
		const user = await User.findOne({ email: email });                                                        //  Yeh check karta hai ki user is email ke saath registered hai ya nahi.
  
		if (!user) {                                                                                              //  Agar user nahi milta, toh return karta hai ek message:
			return res.json({ 
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}

		const token = crypto.randomBytes(20).toString("hex");                                                     //  Agar user mil jaata hai, toh ek random token generate karta hai: Yeh token 20 random bytes ka hoga aur hex format me convert kiya jayega.  Phir user ke record ko update karta hai, jisme:  token ko store kiya jaata hai.  resetPasswordExpires ko set kiya jaata hai, jo ek ghante ke baad expire ho jayega:

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);

		console.log("DETAILS", updatedDetails);

		const url = `http://localhost:3000/update-password/${token}`;                                             //  Password reset link banata hai jisme token ko URL me embed karta hai.

		await mailSender(                                                                                         //  Uske baad mailSender ko use karke password reset link email pe bhejta hai.
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({                                                                                                //  Agar sab kuch sahi ho, toh success message bhejta hai:
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} 
	
	catch (error) {                                                                                               //  Agar koi error hota hai, toh catch block me error message ko JSON response ke saath return karta hai:

		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};










{/*   Yeh resetPassword function ek password reset ko handle karta hai, jisme user ko diya gaya token validate hota hai, aur agar sab kuch theek ho toh password ko update kiya jaata hai.   */}

exports.resetPassword = async (req, res) => {

	try {

		const { password, confirmPassword, token } = req.body;                                                    //  Request body se password, confirmPassword, aur token le raha hai.

		if (confirmPassword !== password) {                                                                       //  Agar password aur confirmPassword match nahi karte, toh error return karta hai:
			return res.json({ 
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}

		const userDetails = await User.findOne({ token: token });                                                 //  Phir, token ko verify karne ke liye: Jo token diya gaya hai, usse user ko dhoondta hai.

		if (!userDetails) {                                                                                       //  Agar token valid nahi hota, toh error message bhejta hai:
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}

		if (!(userDetails.resetPasswordExpires > Date.now())) {                                                   //  Agar token expire ho gaya ho, toh response deta hai ki token expired hai:
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

		const encryptedPassword = await bcrypt.hash(password, 10);                                                //  Agar sab kuch theek hai, toh password ko hash karke store karta hai:
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
 
		res.json({                                                                                                //  Finally, success message return karta hai:                          
			success: true,
			message: `Password Reset Successful`,
		});
	}
	
	catch (error) {                                                                                               //  Agar koi error hota hai, toh uska message return karta hai:

		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};