// imports

import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";




const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;            //  studentEndpoints ek object hai, jisme 3 API URLs stored hain.





{/*   Yeh function JavaScript ka ek external file (jaise Razorpay ka SDK) dynamically load karta hai. Agar script successfully load ho jaye, toh resolve(true) return karta hai, warna agar load fail ho jaye toh resolve(false) deta hai.   */}

function loadScript(src) {                                                                                   //  Ye ek function hai jiska naam hai loadScript. Isme hum ek src parameter pass karte hain (jo hota hai external JavaScript file ka URL, jaise Razorpay ka SDK URL).
    
    return new Promise((resolve) => {                                                                        //  Ye function ek Promise return karta hai. Matlab: Ye asynchonous kaam karega, aur baad me true ya false dega based on result.
        
        const script = document.createElement("script");                                                     //  Ye line ek script tag bana rahi hai, jaisa HTML me hota hai: <script src="..."></script>
        script.src = src;                                                                                    //  Is script tag ke andar src URL set kar rahe hain, jahan se JS file load hogi.

        script.onload = () => {                                                                              //  Jab script successfully load ho jaye, tab resolve(true) chalega. Matlab: "Haan bhai script load ho gayi, ab kaam aage badha sakte hain."        
            resolve(true);
        }

        script.onerror= () =>{                                                                               //  Agar load karne me error aata hai, toh resolve(false) chalega. Matlab: "Bhai script load nahi hui, kuch dikkat hai."
            resolve(false);
        }

        document.body.appendChild(script);                                                                   //  Finally, is script tag ko HTML page ke body tag ke andar add kar diya jata hai, taaki browser us file ko actually load kare.
    })
}





{/*   Ye function tab chalta hai jab koi user course purchase karne ke liye "Buy Now" pe click karta hai.   */}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    
    const toastId = toast.loading("Loading...");                                                             //  Ek loading notification dikha raha hai user ko.
    
    try{

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");                        //  Razorpay ka checkout system (jo payment ka popup deta hai) load kar raha hai. 

        if(!res) {                                                                                           //  Agar script load nahi hoti, toh error toast show karta hai aur function return ho jaata hai — process ruk jaati hai.
            toast.error("RazorPay SDK failed to load");
            return;
        }

        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,                                 //  Ye backend ko bol raha hai: “Bhai user ye courses kharidna chahta hai, Razorpay ke liye ek order create kar do. Backend kya karta hoga? Razorpay ka orders.create() call karta hoga. Aur uspe Razorpay se order_id, amount, currency milta hoga.
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`,
                                })

        if(!orderResponse.data.success) {                                                                    //  Agar backend se success nahi aaya, toh ye error throw karta hai — matlab Razorpay order create hi nahi hua.
            throw new Error(orderResponse.data.message);
        }

        console.log("PRINTING orderResponse", orderResponse);                                                //  Ye sirf debugging / testing purpose ke liye hai. Iska kaam hai: Backend se jo Razorpay order generate hua hai uska pura response console mein print karna.

        const options = {                                                                                    //  Isme Razorpay ko bataya jaa raha hai: Konsa order hai (order_id), Kitna paisa lena hai (amount), Kaun de raha hai (prefill), Payment hone ke baad kya karna hai (handler)
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },

            handler: function(response) {                                                                    //  Jab payment successful ho jata hai, Razorpay is function ko call karta hai. Ye 2 kaam karta hai: pehla --> sendPaymentSuccessEmail() → Email bhejta hai user ko: “Thanks for the payment.”  dusra --> verifyPayment() → Backend ko bolta hai: “Ye Razorpay se jo payment aaya hai, check karo sahi hai ya nahi.”

                sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
                
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        //miss hogya tha 

        const paymentObject = new window.Razorpay(options);                                                  //  Razorpay ke popup ko create kar raha hai.
        
        paymentObject.open();                                                                                //  Payment popup open karta hai.        
        
        paymentObject.on("payment.failed", function(response) {                                              //  Agar Razorpay ke end se payment fail ho jaye, toh user ko error toast dikhaata hai.
            toast.error("oops, payment failed");
           
            console.log(response.error);                                                                     //  Jab user payment karta hai lekin wo fail ho jaata hai, toh Razorpay payment.failed event fire karta hai.
        })

    }

    catch(error) {                                                                                           //  Agar kahin bhi koi error aata hai (API, script load, etc), toh catch block chalega aur toast dikhega: "Could not make Payment"

        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }

    toast.dismiss(toastId);                                                                                  //  Jo loading toast dikhaya gaya tha start me, usko hata diya jaata hai.
}






{/*   Jab student ka payment successfully ho jaata hai Razorpay ke through, tab usko ek confirmation email bhejna   */}

async function sendPaymentSuccessEmail(response, amount, token) {                                            //  response: Isme Razorpay ka payment response hota hai (razorpay_order_id, razorpay_payment_id),  amount: Kitne paise pay kiye gaye (ye backend ko dikhane ke liye hai),  token: User ka auth token jo verify karta hai ki request authorized user se aa rahi hai
    
    try{

        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {                                         //  Ye ek POST request hai backend endpoint pe (SEND_PAYMENT_SUCCESS_EMAIL_API) Ye backend ko 3 cheezein bhejta hai: 1. orderId: Razorpay se mila hua order ID.   2). paymentId: Razorpay se mila hua payment ID.  3). amount: (usually in paisa, i.e., ₹100 = 10000) 
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            
            Authorization: `Bearer ${token}`                                                                 //  Ye line JWT token bhejti hai as Authorization header — taaki backend jaan sake ki request valid user se hi aayi hai
        
        })
    }

    catch(error) {                                                                                           //  Agar backend se email bhejte waqt kuch gadbad ho jaaye (e.g., server down, email server fail, etc.) to ye error console mein print karega.
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}





{/*   Yeh function Razorpay se payment hone ke baad payment ko backend ke through verify karta hai, aur agar sab kuch sahi hai toh user ko course mein enroll kar deta hai.   */}

async function verifyPayment(bodyData, token, navigate, dispatch) {                                          //  Jab Razorpay se payment successful hoti hai, tab ye function call hota hai. Ye backend ko verify karta hai ki payment genuine hai ya nahi.
    
    const toastId = toast.loading("Verifying Payment....");                                                  //  UI pe ek loader dikh raha hoga — "Verifying Payment..." message ke saath 
    
    dispatch(setPaymentLoading(true));                                                                       //  Redux state mein payment process ho raha hai, isko dikhane ke liye true set kar rahe ho.
    
    try{
        
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {                          //  apiConnector se backend ke COURSE_VERIFY_API ko request jaa rahi hai. bodyData mein Razorpay ka response + courses info hota hai. Authorization header mein JWT token bhej rahe ho for security/authentication.
            Authorization:`Bearer ${token}`,
        
        })

        if(!response.data.success) {                                                                         //  Agar backend bolta hai "payment verify nahi hui", toh error throw kar ke catch block mein chala jaata hai.
            throw new Error(response.data.message);
        }
        
        toast.success("payment Successful, ypou are addded to the course");                                  //  Ye steps tab chalte hain jab payment verify ho jaata hai: UI pe success message aata hai. User ko "Enrolled Courses" page pe le jaaya jaata hai. Cart reset ho jaata hai (kyunki purchase ho chuka)
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   

    catch(error) {                                                                                           //  Agar verification fail ho jaaye ya backend down ho — toh user ko error message dikhta hai.
        
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }

    toast.dismiss(toastId);                                                                                  //  Loader hata diya jata hai aur payment loading false ho jata hai — process complete ho gaya.
    dispatch(setPaymentLoading(false));
}





//  Ye code user ke Razorpay se course ka payment karne, usko verify karne, confirmation mail bhejne, aur uske baad user ko enrolled courses page pe le jaane ka complete process handle karta hai.