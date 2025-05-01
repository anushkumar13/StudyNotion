// imports

import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"





{/*   Is function ChipInput ka use ek input field ko create karne ke liye hota hai jisme multiple values (ya tags) ko "chips" ki tarah add kiya ja sakta hai. Isme kuch props pass kiye ja rahe hain jo form handling aur validation ke liye use kiye jaate hain.   */}

export default function ChipInput({

  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {


  const { editCourse, course } = useSelector((state) => state.course)                    //  Is line mein useSelector hook ka use ho raha hai jo Redux store se data ko fetch karta hai. Yahaan pe state.course ke andar jo bhi data hai, usme se editCourse aur course ko directly extract (destructure) kar liya gaya hai.

  const [chips, setChips] = useState([])                                                 // Is line mein useState hook ka use ho raha hai jo ek state variable (chips) banata hai. Initially iski value empty array ([]) hai, jo ki baad mein kisi bhi chips ya values ko store karne ke liye use kiya ja sakta hai.





  useEffect(() => {
    if (editCourse) {
      
      setChips(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    
  }, [])





  useEffect(() => {
    setValue(name, chips)
    
  }, [chips])



  

  const handleKeyDown = (event) => {

    if (event.key === "Enter" || event.key === ",") {                                    {/*   Check if user presses "Enter" or ","   */}

      event.preventDefault()                                                             /*   Prevent the default behavior of the event   */

      const chipValue = event.target.value.trim()                                        /*   Get the input value and remove any leading/trailing spaces   */

      if (chipValue && !chips.includes(chipValue)) {                                     {/*   Check if the input value exists and is not already in the chips array   */}

        const newChips = [...chips, chipValue]                                           /*   Add the chip to the array and clear the input   */
        setChips(newChips)
        event.target.value = ""
      }
    }
  }





    {/*   Function to handle deletion of a chip   */}

  const handleDeleteChip = (chipIndex) => {





    {/*   Filter the chips array to remove the chip with the given index   */}

    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }




  
    {/*   Render the component   */}

  return (
    <div className="flex flex-col space-y-2">





    {/*   Render the label for the input   */}

      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>





    {/*   Render the chips and input   */}

      <div className="flex w-full flex-wrap gap-y-2">





    {/*   Map over the chips array and render each chip   */}

        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >





    {/*   Render the chip value   */}

            {chip}





    {/*   Render the button to delete the chip   */}

            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>

          </div>
        ))}





    {/*   Render the input for adding new chips   */}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>





    {/*   Render an error message if the input is required and not filled   */}

      {errors[name] && (
        
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
        
      )}
    </div>
  )
}