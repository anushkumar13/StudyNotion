// imports

import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"




const Catalog = () => {

  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()                                    //  Ye line React Router ka useParams hook use kar rahi hai. catalogName URL ke path se extract ho raha hai (jaise /catalog/web-development). Iska use dynamic routing me hota hai taaki component ko URL ka part mile.
  const [active, setActive] = useState(1)                                //  Ye line React useState hook se ek state variable bana rahi hai: active ek state variable hai jo abhi 1 pe set hai. setActive ek function hai jisse hum active ka value update kar sakte hain.
  const [catalogPageData, setCatalogPageData] = useState(null);          //  Ye line React me ek state variable banati hai: catalogPageData ek state variable hai jo initially null set hai — iska matlab hai ki shuru me koi data nahi hai.setCatalogPageData ek function hai jisse hum catalogPageData ko update kar sakte hain. Iska use usually API se data fetch karke usse store karne ke liye hota hai.
  const [categoryId, setCategoryId] = useState("");                      //  Ye line ek state variable banati hai React me: categoryId ka initial value "" (empty string) hai — matlab abhi koi category select nahi hui hai. setCategoryId se hum category ID ko update kar sakte hain — jab user koi category choose kare, to uski ID isme store hoti hai. Iska use mostly filtering ya data fetch karne ke liye hota hai based on selected category.




  {/*   Jab bhi catalogName change ho, hum API call karke category_id laate hain jo catalogName ke according hoti hai, aur usse setCategoryId se store karte hain.   */}

    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);                                                                   //  apiConnector se GET request bhej rahe hain category list API pe. Ye API ek array of categories return karegi, jisme har category ka naam aur _id hoga.
            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;             //  Ye line har category ke naam ko process kar rahi hai: Spaces ko - se replace kiya jaa raha hai. Naam ko lowercase mein convert kiya jaa raha hai. Phir match ho raha hai catalogName ke saath. Taaki Web Development jaise naam web-development ke form mein ho jaaye, jaisa ki URL slug hota hai.   [0]._id ---> Filtered result se pehli matching category ka _id le rahe ho. filter() ek array return karta hai, isliye [0] likha.
            setCategoryId(category_id);                                                                                                         //  Finally, us matched category ka ID state mein save kar lete ho.
        }
        getCategories();
    },[catalogName]);




  {/*   Jab categoryId change hota hai, tab hum category ke details ko fetch karte hain aur setCatalogPageData ke through state mein store karte hain.   */}

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);       //  API call kar raha hai category details ko fetch karne ke liye.
                console.log("PRinting res: ", res);                      //  Data ko console pe print kar rahe ho taaki dekh sakein ki API se kya result aa raha hai. Debugging purpose ke liye likha gaya hai.
                setCatalogPageData(res);                                 //  Jab API se data mil jaata hai, tab usko setCatalogPageData function ke through state mein set kar rahe ho. setCatalogPageData ek React hook hai jo state ko update karega aur UI ko re-render karne ke liye trigger karega.
            }
            catch(error) {                                               //  Agar kuch galat hota hai (jaise network error ya API ka response nahi aata), toh error catch kiya jaata hai aur console mein error print hota hai.
                console.log(error)
            }
        }
        if(categoryId) {                                                 //  Yeh condition check kar rahi hai ki categoryId exist karta hai.
            getCategoryDetails();                                        //  Agar categoryId valid hai, tabhi getCategoryDetails function call hota hai, warna nahi.
        }
    },[categoryId]);




    {/*   Yeh code loading aur catalogPageData ke basis pe conditional rendering kar raha hai. Iska kaam hai, agar data abhi tak fetch nahi hua hai ya koi error aayi ho, toh proper loading screen ya error message show karna.   */}

    if (loading || !catalogPageData) {                                                   //  Condition check kar raha hai ki: Agar loading true hai, matlab data abhi load ho raha hai, ya Agar catalogPageData null ya undefined hai, matlab data abhi tak fetch nahi hua hai. Agar yeh condition true hoti hai, tab loading state show hota hai.
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>                                              {/*  Yeh ek centered loading spinner dikha raha hai jab data load ho raha hota hai.  */} 
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {                                        //  Yeh condition check kar raha hai: Agar loading false hai, matlab loading complete ho gaya. Agar catalogPageData.success false hai, matlab data fetch karte waqt koi problem aayi hai, ya successful response nahi mila. Agar dono conditions true hoti hai, tab error page dikhana hai.
        return <Error />
      }
    



      return (
        <>
          
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">




    {/*   `Home / Catalog / `   */}

              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>

              </p>


              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>


              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>

            </div>
          </div>
    



    {/*   Section 1   */}

          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">




    {/*   Courses to get you started   */}

            <div className="section_heading"> Courses to get you started </div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">




    {/*   Most Populer   */}

              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>




    {/*   New   */}

              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>

            </div>
            
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>

          </div>




    {/*   Section 2   */}

          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            



    {/*   Top courses in   */}

            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>

            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>

          </div>
    



    {/*   Section 3   */}

          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">




    {/*   Frequently Bought   */}

            <div className="section_heading"> Frequently Bought </div>
            
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>

          </div>
     



    {/*   Footer   */}

          <Footer />

        </>
      )
    }
    


    
    export default Catalog