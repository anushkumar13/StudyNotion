
const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")










{/*   Yeh code ek contactUsController naam ka function export kar raha hai jo kisi user ke "Contact Us" form se aaye data ko handle karta hai. Yeh async function hai, iska matlab hai ki yeh asynchronous operations karega jaise ki email bhejna.   */}

exports.contactUsController = async (req, res) => {

  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body                        //  Yeh line req.body se sabhi fields (email, firstname, etc.) ko extract kar rahi hai jo user ne form mein fill kiye hain.
   
  console.log(req.body)                                                                                 //  Yeh line terminal mein form ka pura data print kar rahi hai debugging ke liye.

  try {

    const emailRes = await mailSender(                                                                  //  Yeh line mailSender function ko call karke email bhej raha hai user ke email par. Usme subject diya hai "Your Data send successfully", aur email ka content banaya gaya hai contactUsEmail(...) function se.
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )

    console.log("Email Res ", emailRes)                                                                 //  Email bhejne ke response ko console mein print karta hai debugging ke liye.
      
    return res.json({                                                                                   //  Agar sab kuch sahi ho gaya toh yeh client ko response deta hai ki "Email send successfully".
      success: true,
      message: "Email send successfully",
    })
  } 
  
  catch (error) {                                                                                       //   block tab chalega jab upar koi error aaye. Usme error ko console mein print karte hain aur client ko response bhejte hain:

    console.log("Error", error)
    console.log("Error message :", error.message)
    
    return res.json({                                                                                   //  Yani agar email send karte waqt koi dikkat aayi ho, toh yeh error message return karta hai.
      success: false,
      message: "Something went wrong...",
    })
  }
}