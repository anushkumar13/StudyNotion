// imports

import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"










    {/*   Chart.js library ko setup   */}

Chart.register(...registerables)                                          //  Ye line Chart.js library ko setup kar rahi hai taaki tum charts bana sako (jaise bar chart, line chart, pie chart, etc.) By default, Chart.js ke naye versions (v3+ onwards) mein koi bhi chart elements, plugins, scales ya controllers automatically enabled nahi hote. Unhe manually register karna padta hai. Toh ye line Chart.js ko bolti hai: "Bhai, jitne bhi tools aur parts chahiye charts banane ke liye — sab activate kar lo!"










export default function InstructorChart({ courses }) {
  









  const [currChart, setCurrChart] = useState("students")                  //  Ye React mein ek state variable bana rahi hai jiska naam hai currChart, aur uska initial value hai "students".










    {/*   ye function chart ke liye random colors generate kar raha hai   */}

  const generateRandomColors = (numColors) => {
    const colors = []

    for (let i = 0; i < numColors; i++) {
      
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  








    {/*   Ye ek object bana raha hai jiska naam hai chartDataStudents, aur isme wo data store ho raha hai jo chart banane ke liye chahiye.   */}
  
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

 








    {/*   Ye ek object bana raha hai jiska naam hai chartIncomeData. Ye object tum Chart.js ko doge — taaki wo ek chart bana sake jo har course ne kitna paisa kamaya (income) ye dikhata hai.   */}

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  








    {/*   Ye options object Chart.js ko de rahe ho, jisme maintainAspectRatio: false set kiya gaya hai. Iska matlab: Chart apne parent container ke dimensions ke according resize hoga, fixed aspect ratio maintain nahi karega.   */}

  const options = {
    maintainAspectRatio: false,
  }










  return (
   
   <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
   



    {/*   Visualize   */}

      <p className="text-lg font-bold text-richblack-5"> Visualize </p>
   
      <div className="space-x-4 font-semibold">




    {/*   "Students" wala button   */}    

        <button

          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students

        </button>




    {/*   "Income" chart pe switch karne ka button   */}
   
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>

      </div>




    {/*   Render the Pie chart based on the selected chart   */}

      <div className="relative mx-auto aspect-square h-full w-full">
        
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />

      </div>

    </div>
  )
}