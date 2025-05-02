




    {/*   Is line mein, const Razorpay = require("razorpay"); ka matlab hai ki hum Razorpay ke Node.js SDK ko apne project mein import kar rahe hain. Razorpay ek payment gateway hai jise hum apne web applications mein online payments ko handle karne ke liye use karte hain. Jab hum require("razorpay") likhte hain, toh hum us SDK ko apne code mein use karne ke liye load kar rahe hote hain, taaki hum payment gateway ke saare features ko apne application mein integrate kar sakein. Iska fayda yeh hota hai ki hum easily Razorpay ki APIs ko call kar sakte hain, jaise ki payment creation, capturing payments, subscription management, aur bahut kuch.   */}

const Razorpay = require("razorpay");





    {/*   Yeh line exports.instance = new Razorpay({...}) ek naya instance create karti hai Razorpay ke SDK ka, jisse payment gateway se interact kiya ja sakta hai. Ismein key_id aur key_secret diye gaye hain, jo Razorpay ke API keys hain, aur yeh keys aapke Razorpay account ko identify karti hain. Agar environment variables process.env.RAZORPAY_KEY aur process.env.RAZORPAY_SECRET nahi milte, toh default values "default_key" aur "default_secret" set ki gayi hain, jo development aur testing ke liye use ki ja sakti hain. Yeh instance Razorpay API ke saath payments create karne, capture karne aur refunds process karne ke liye use kiya jaata hai.   */}

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY || "default_key",      // Default value
    key_secret: process.env.RAZORPAY_SECRET || "default_secret", // Default value
});
