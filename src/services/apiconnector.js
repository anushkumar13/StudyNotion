// imports

import axios from "axios";




export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/v1",      // ✅ Correct base URL
    withCredentials: true,                        // ✅ Allow sending cookies for authentication
});




export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,                           // ✅ No need for template string `${method}`
        url: url,                                 // ✅ URL directly
        data: bodyData || null,                   // ✅ Simplified conditional assignment
        headers: headers || null,
        params: params || null,
    });
};




// iss file ka use karke hum log api calls kar sakte hain