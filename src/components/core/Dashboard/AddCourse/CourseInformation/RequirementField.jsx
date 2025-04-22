// imports

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"




export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
})

{
  const { editCourse, course } = useSelector((state) => state.course)       //  Yeh code line useSelector hook ka use kar ke Redux store se editCourse aur course ko fetch kar raha hai.
  const [requirement, setRequirement] = useState("")                        //  Yeh line ek state variable requirement define karti hai, jiska initial value empty string ("") hai. useState hook ka use karke yeh value track ki jaati hai. Is state ko update karne ke liye setRequirement function ka use hota hai.
  const [requirementsList, setRequirementsList] = useState([])              //  Yeh line ek state variable requirementsList define karti hai, jiska initial value ek empty array ([]) hai. useState hook ka use karke yeh array ki value ko track kiya jaata hai. setRequirementsList function ke through is array ko update kiya jaata hai.




    {/*   Jab course edit mode me hota hai, toh hum course ke instructions ko requirementsList state me set karte hain. Saath hi form ke liye validation bhi set karte hain ki requirementsList empty na ho.   */}

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })

  }, [])




    {/*   Jab requirementsList ki value change hoti hai, tab setValue function ko use karke us updated value ko form field mein set kar diya jaata hai. Yeh automatically form ke state ko update karta hai.   */}

  useEffect(() => {
    setValue(name, requirementsList)
    
  }, [requirementsList])




    {/*   Jab user koi new requirement dalta hai, toh wo requirement requirementsList mein add ho jaati hai aur input field ko reset kar diya jaata hai taaki user easily next requirement dal sake.   */}

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }




    {/*   Jab user kisi requirement ko remove karta hai, toh wo requirement requirementsList se index ke according delete ho jaati hai aur list update ho jaati hai   */}

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)                            //  Yeh line updatedRequirements array me se diye gaye index par jo element hai usko hata deti hai. Simplified explanation: ➡️ splice(index, 1) ka matlab hai — index number par jao aur 1 item delete kar do. Ye generally kisi list se ek item delete karne ke liye use hota hai.
    setRequirementsList(updatedRequirements)
  }




  return (
    <div className="flex flex-col space-y-2">
      
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200"> * </sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
       
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />




    {/*   'Add' wala Button   */}

        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>

      </div>
      



    {/*   Yeh code ek list display kar raha hai sirf tab jab requirementsList empty nahi ho. Simplified explanation: Agar requirementsList me items hain (length > 0), toh ul ke andar map se har item (requirement) ek <li> me dikhaya jaata hai. Har item ko index ke saath uniquely identify kiya gaya hai using key={index}.   */}

      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              
              <span>{requirement}</span>




    {/*   'clear' wala Button   */}

              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>

            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
        
      )}
    </div>
  )
}