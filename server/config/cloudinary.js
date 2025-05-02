




{   /*   Yeh line Node.js mein cloudinary module ko import kar rahi hai. Cloudinary ek cloud service hai jisme aap images, videos, aur other media files store aur manage kar sakte ho. Isko use karne se aap apne media files ko cloud par upload kar sakte ho aur unki URLs ko apne applications mein use kar sakte ho. require("cloudinary").v2: Yeh line Cloudinary ke SDK ko import kar rahi hai. .v2 version ka matlab hai ki aap Cloudinary ka version 2 use kar rahe ho, jo current stable version hai. Iske baad, aap cloudinary object ka use kar sakte ho apne cloud storage ko access karne ke liye. Jaise images upload karna, unhe delete karna, etc.   */}

const cloudinary = require("cloudinary").v2; 





    {/*   Is code mein aap Cloudinary ko connect kar rahe ho apne Node.js app ke through. Yeh function cloudinaryConnect Cloudinary ke API keys aur environment variables ko configure karta hai taaki aap apne media files ko Cloudinary ke cloud server pe store kar sakein.   */}

exports.cloudinaryConnect = () => {

	try {

		cloudinary.config({                                                         //  cloudinary.config: Yeh function Cloudinary ke configuration ko set karta hai jisme cloud_name, api_key, aur api_secret diye jate hain. Yeh credentials aapko Cloudinary ke dashboard se milte hain.
			 
			cloud_name: process.env.CLOUD_NAME,                                     //  Aapka Cloudinary account ka unique name.
			api_key: process.env.API_KEY,                                           //  Aapka API key jo Cloudinary se mila hai.
			api_secret: process.env.API_SECRET,                                     //  Aapka API secret key jo Cloudinary se mila hai.
		});
	}                                                                               //  process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET: Yeh values environment variables se li ja rahi hain, jise aap .env file mein store karte ho. Yeh best practice hai kyunki sensitive information ko hard-code na karke, aap environment variables ka use karte ho jo secure rehti hai.
	
	catch (error) {                                                                 //  Agar configuration set karne mein koi error hota hai (jaise agar environment variables galat hain ya configuration failed ho jata hai), toh error ko catch karke console mein log kiya jata hai.
		console.log(error);
	}
};