




{/*      */}

const mongoose = require("mongoose");

require("dotenv").config();





    {/*   Yeh code process.env.MONGODB_URL ko check karta hai jo ek environment variable hai. Environment variables wo variables hote hain jo system ke environment mein set kiye jaate hain, jaise ki aapke server ya local machine par. Yeh sensitive information ko securely handle karte hain, jaise database URLs, API keys, etc. Code mein pehle process.env.MONGODB_URL ko access kiya gaya hai, jo ki aapke MongoDB database ka URL hona chahiye. Agar yeh variable set hai, toh uska value print hoga. Agar yeh variable set nahi hai, toh "❌ MONGODB_URL NOT FOUND" message print hoga, jo indicate karta hai ki MongoDB URL environment variable ko properly set nahi kiya gaya hai. Is tarah se, agar kisi application ko database ke saath connect karne ki zarurat hai, toh yeh URL environment variable ke through secure tareeke se provide kiya jaata hai. Agar yeh URL available nahi hai, toh code uss situation ko handle karta hai aur error message print karta hai.   */}

console.log("MongoDB URL:", process.env.MONGODB_URL || "❌ MONGODB_URL NOT FOUND");





    {/*   Yeh code MongoDB se connection banane ka kaam karta hai. Pehle, mongoose.connect() function call hota hai jisme tumhara MongoDB URL process.env.MONGODB_URL se liya jaata hai. Agar yeh URL environment variables mein set nahi hota, toh tumhe "❌ MONGODB_URL NOT FOUND" ka error message console pe dikhai dega. Fir, agar connection successful hota hai, tab "✅ DB Connected Successfully" message console pe show hota hai jo confirm karta hai ki database se connection sahi tarah se ban gaya hai. Agar connection mein koi error aati hai, toh woh error catch block mein handle hoti hai aur error message ko console.error(error) se print kiya jaata hai, jisse tumhe pata chal jaata hai ki kya problem hai. End mein, process.exit(1) call hota hai jo process ko terminate kar deta hai, iska matlab hai ki agar connection fail hota hai, toh server band kar diya jaata hai. Is tareeke se tumhara database connection safe aur error-free banane ki koshish ki jaati hai.   */}

exports.connect = () => {

    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    .then(() => console.log("✅ DB Connected Successfully"))

    .catch((error) => {
         
        console.log("❌ DB Connection Failed");
        console.error(error);
        process.exit(1);
    });
};
