// imports

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";





    {/*   Yeh configureStore ka use karke ek Redux store create kiya gaya hai. reducer: rootReducer se store ko bataya gaya hai ki kaunsa root reducer use karna hai. rootReducer mein multiple reducers ko combine karke ek single reducer banaaya jaata hai, jo store ke state ko manage karta hai.   */}

const store = configureStore({           // store create kar rahe hain
  reducer:rootReducer,
});





    {/*   Yeh code basically React app ko initialize karta hai, Redux store ko connect karta hai, aur routing ke liye BrowserRouter use karta hai.   */}

const root = ReactDOM.createRoot(document.getElementById("root"));                                 {/*   Yeh line React 18 mein ek naya root element banata hai jisme React app ko render kiya jaata hai. document.getElementById("root") se wo div select hoti hai jisme app ko display karna hai.   */}

root.render(                                                                                       /*  Yeh method React app ko DOM mein render karta hai. Iske andar jo JSX diya gaya hai, woh app ko render karne ka kaam karta hai.   */
  
  <React.StrictMode>                                                                               {/*  Yeh ek development tool hai jo app ko render karte waqt potential issues ko identify karta hai (jaise deprecated lifecycle methods, unsafe actions, etc.).   */}
  
  <Provider store = {store}>                                                                       {/*  Yeh line Redux store ko React app ke liye available banaati hai. Iska matlab hai ki app ka har component Redux state ko access kar sakega. store={store} ke andar wo store diya gaya hai jo pehle create kiya tha.   */}
   
    <BrowserRouter>                                                                                {/*  Yeh React Router ka part hai, jo application mein routing enable karta hai. Isse page ko navigate karne ka system milta hai, bina page ko reload kiye.   */}
        <App />                                                                                    {/*  Yeh aapka main React component hai jisme application ka logic aur UI hota hai.   */}
        <Toaster/>                                                                                 {/*  Yeh ek toast notification component hai jo user ko feedback dene ke liye use hota hai (e.g., success, error messages).   */}
    </BrowserRouter>
  
  </Provider>
    
    
  </React.StrictMode>
);
