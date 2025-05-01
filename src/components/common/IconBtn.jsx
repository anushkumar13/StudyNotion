



    {/*   Ye IconBtn component ek custom button banata hai jo text, icons, disabled state, outline styles, aur custom classes ke saath render ho sakta hai.   */}

export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {


    return (
      



    /*   Ye code ek flexible button create karta hai jo outline style ya filled style me ho sakta hai, aur text aur children ko display kar sakta hai. Iska appearance aur behavior customizable hai depending on the props passed.   */

      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
      
    )
  }




// Ye ek custom button component hai jo text ke saath icon bhi show kar sakta hai, aur outline style ya normal style dono support karta hai.