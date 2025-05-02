

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();










{/*   This function is used as middleware to authenticate user requests   */}

exports.auth = async (req, res, next) => {
	try {

	// Extracting JWT from request cookies, body or header

		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

	// If JWT is missing, return 401 Unauthorized response

		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {

	// Verifying the JWT using the secret key stored in environment variables

			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);

	// Storing the decoded JWT payload in the request object for further use

			req.user = decode;
		} 
		
		catch (error) {

	// If JWT verification fails, return 401 Unauthorized response

			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

	// If JWT is valid, move on to the next middleware or request handler

		next();
	} 
	
	catch (error) {

	// If there is an error during the authentication process, return 401 Unauthorized response

		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};










{/*   Yeh isStudent function ek middleware hai jo check karta hai ki logged-in user student hai ya nah   */}

exports.isStudent = async (req, res, next) => {

	try {

		const userDetails = await User.findOne({ email: req.user.email });                                   //  User ke email se database mein user ko dhundh rahe hain.

		if (userDetails.accountType !== "Student") {                                                         //  Agar user ka accountType "Student" nahi hai, toh 401 error bhej rahe hain aur message de rahe hain ki yeh route sirf students ke liye hai.
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}

		next();                                       	                                                     //  Agar user student hai, toh next() call kar rahe hain jo request ko aage process hone deta hai.
	} 
	
	catch (error) {                                                                                          //  catch block agar koi error hota hai, toh "User Role Can't be Verified" message ke saath error return karte hain.
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};







 


{/*   Yeh isAdmin middleware function ensure karta hai ki sirf Admin users hi ek specific route ko access kar saken.   */}

exports.isAdmin = async (req, res, next) => {

	try {
		
		const userDetails = await User.findOne({ email: req.user.email });                                   //  Logged-in user ka email req.user.email se nikal ke User collection mein uska record dhoond rahe hain.

		if (userDetails.accountType !== "Admin") {                                                           //  Agar user ka accountType "Admin" nahi hai, toh 401 Unauthorized error bhej rahe hain aur bol rahe hain ki yeh route sirf Admin ke liye reserved hai.
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}

		next();                                                                                              //  Agar user Admin hai, toh next() call karke request ko aage allow kar dete hain.
	} 
	
	catch (error) {                                                                                          //  catch block mein agar koi error aata hai (jaise database error), toh "User Role Can't be Verified" message ke saath 500 Internal Server Error bhejte hain.
		return res 
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};










{/*   Yeh isInstructor middleware function check karta hai ki jo user request bhej raha hai wo Instructor hai ya nahi.   */}

exports.isInstructor = async (req, res, next) => {

	try {

		const userDetails = await User.findOne({ email: req.user.email });                                   //  User ka email req.user.email se nikalke database se uska pura record fetch kar rahe hain.
		console.log(userDetails);                                                                            //  Debugging ke liye user ka full record aur uska account type console mein print kar rahe hain.

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {                                                      //  Agar user ka accountType "Instructor" nahi hai, toh 401 Unauthorized error bhej diya jaata hai.
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}

		next();                                                                                              //  Agar user Instructor hai, toh next() call karke request ko allow kar dete hain aage process hone ke liye.
	} 
	 
	catch (error) {                                                                                          //  catch block agar koi error aaye (jaise database se data na mile), toh 500 Internal Server Error ke saath "User Role Can't be Verified" message return hota hai.
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};