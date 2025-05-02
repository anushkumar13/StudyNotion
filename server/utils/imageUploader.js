

const cloudinary = require('cloudinary').v2





{/*   Iss function ka kaam image ko Cloudinary mein upload karna hai with optional resizing aur quality adjustments.   */}

exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {              

    const options = {folder};                                                                                //  Yeh options object bana raha hai jisme folder specify kiya ja raha hai, jahan image ko Cloudinary mein upload karna hai.
    
    if(height) {                                                                                             //  Agar height diya gaya hai, toh options mein height property ko set kar rahe hain.
        options.height = height; 
    }
    
    if(quality) {                                                                                            //  Agar quality diya gaya hai, toh options mein quality property ko set kar rahe hain.
        options.quality = quality;
    }
    
    options.resource_type = "auto";                                                                          //  Yeh resource type ko auto set kar raha hai, jo image aur video dono types ko handle kar sake (Cloudinary ko batata hai ki automatic resource type detect kare).

    return await cloudinary.uploader.upload(file.tempFilePath, options);                                     //  Cloudinary ke uploader.upload function ko call kar raha hai, jisme image ka tempFilePath aur options pass kiye ja rahe hain. Yeh image ko Cloudinary pe upload karne ke baad, uska response return karega.
}