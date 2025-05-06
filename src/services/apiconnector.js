// imports

import axios from "axios";





    {/*   Yeh axiosInstance ek custom Axios instance hai, jisme base URL define kiya gaya hai, jo local server ka URL hai (http://localhost:4000/api/v1). Isse har request mein ye URL automatically prepend ho jaata hai, toh har API call ko manually base URL nahi likhna padta. withCredentials: true ka matlab hai ki jab request bheji jaayegi, tab cookies (jo user ke session ke liye hoti hain) bhi send ki jaayengi. Yeh authentication ke liye zaroori hota hai, agar backend ko user ke cookies verify karni hain.   */}

export const axiosInstance = axios.create({
    baseURL: "https://studynotion2-3iy3.onrender.com",          //  Correct base URL
    withCredentials: true,                                      //  Allow sending cookies for authentication
});





    {/*   Yeh function ek API call banata hai using Axios. Pehle method, URL, body data (agar koi ho), headers (agar diye gaye ho), aur params (agar diye gaye ho) pass kiye jaate hain. Phir yeh function axiosInstance ko call karta hai, jo ek configured Axios instance hai, aur jo response milta hai, usse return kar deta hai. Agar body data ya headers ya params na diye jaayein toh woh null set kar deta hai.   */}

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,                           //  No need for template string `${method}`
        url: url,                                 //  URL directly
        data: bodyData || null,                   //  Simplified conditional assignment
        headers: headers || null,
        params: params || null,
    });
};





// iss file ka use karke hum log api calls kar sakte hain