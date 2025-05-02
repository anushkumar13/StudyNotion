

const nodemailer = require("nodemailer");





{/*   Yeh function email bhejne ka basic kaam karta hai using nodemailer, aur agar mail fail hota hai toh error bhi log karta hai.   */}

const mailSender = async (email, title, body) => {

    try{
            let transporter = nodemailer.createTransport({                                              //  Yeh nodemailer.createTransport se ek email transporter object create kar raha hai, jisme mail server ke host, user aur password ko environment variables se load kar raha hai (taaki sensitive information ko direct code mein na rakhein).
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            let info = await transporter.sendMail({                                                     //  transporter.sendMail se email bhej rahe hain, jisme sender ka naam "StudyNotion || CodeHelp - by Babbar", receiver ka email (email), subject (title) aur body content (body) diya ja raha hai. Yeh email bhejne ke baad info object return hota hai jo mail ke send hone ki details ko hold karta hai.
                from: 'StudyNotion || CodeHelp - by Babbar',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })

            console.log(info);                                                                          //  Yeh info ko console pe print kar raha hai jisse mail send hone ka status check kiya ja sake.
            return info;                                                                                //  Function ke end mein, bheje gaye email ke details ko return kar raha hai.
    }

    catch(error) {                                                                                      //  Agar koi error hoti hai, toh error message ko console pe print kar raha hai.
        console.log(error.message);
    }
}





module.exports = mailSender;