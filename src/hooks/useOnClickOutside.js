// imports

import { useEffect } from "react";





{/*   Jab user kisi specific element ke bahar click karta hai (jaise koi modal, dropdown, etc.), ye hook uss click ko detect karta hai aur koi function call karta hai (jaise modal close karna).   */}

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {

    const listener = (event) => {
    
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
     
      handler(event);
    };



    
    
    {/*   Mouse click aur mobile touch — dono situation mein detect karo ki user ne kisi element ke bahar click/touch kiya hai ya nahi.   */}

    document.addEventListener("mousedown", listener);                                    //  Jab user mouse se click karega (mouse press) — toh listener function chalega.
    document.addEventListener("touchstart", listener);                                   //  Jab user mobile ya tablet pe screen ko touch karega — tab bhi listener function chalega.




    
    {/*   Ye ek cleanup function hai jo useEffect ke andar likha gaya hai. Iska kaam hai: jab component unmount ho jaye ya ref / handler change ho jaye, toh ye listener ko document se remove kar de.   */}

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); 
}