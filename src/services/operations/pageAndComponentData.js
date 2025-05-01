// imports

import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';





{/*   Ye function server se ek particular category ka course data laata hai — jaise tu kisi course category pe click kare: "Web Development", "DSA", "AI" etc.   */}

export const getCatalogaPageData = async(categoryId) => {                                               //  Ye ek async function hai aur categoryId input mein leta hai, jiska data fetch karna hai.

  const toastId = toast.loading("Loading...");                                                          //  Screen pe ek loading toast dikh jaata hai – user ko lagta hai data aa raha hai.
  
  let result = [];                                                                                      //  Result variable banaya gaya – taaki finally isme data store karke return kiya jaa sake.

  try{

        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,                    //  hum ek custom apiConnector use kar rahe hain, jisme "POST" method se ek API pe request bhej rahe hain. Hum server ko categoryId bhej rahe hain, taaki wo bata sake ki us category mein kaunse courses hain. Jab tak server ka response nahi milta, code wait karta hai.
        {categoryId: categoryId,});

        if(!response?.data?.success)                                                                    //  Agar success false hai ya undefined, toh manually error throw kar do — iska matlab kuch gadbad hai response mein.
            throw new Error("Could not Fetch Category page data");                                   

         result = response?.data;                                                                       //  Agar sab kuch sahi chala, toh API ka data result mein daal diya gaya.

  }

  catch(error) {                                                                                        //  Agar koi bhi error aaya (network fail, API down, etc): Console mein error log kar diya, Toast pe error message dikha diya, result mein error ka response daal diya (agar mila)
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }

  toast.dismiss(toastId);                                                                               //  Toast hata diya (success ya fail dono mein) 
  return result;                                                                                        //  Final result return kiya (ya toh data, ya error)
}



// getCategoriespages wala jo page hai uske api ko call karne ka kaam yaha pe ho raha hai 