// imports

import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";





    {/*   Is code ka main purpose ek array of tab names create karna hai. Yeh array five tab options ko store karta hai: In tab names ka use interface me kiya ja sakta hai, jaha user tabs ke through alag-alag categories ya sections ko explore kar sake. Yeh tabs generally kisi UI me content ko alag-alag categories me display karne ke liye use hote hain.   */}

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];





    {/*   Is code ka main purpose hai ek Explore More section create karna jisme:     1). currentTab: Ek state hai jo currently active tab ko store karta hai. Default tab set kiya gaya hai tabsName[0] (jo pehla tab hai "Free").     2). courses: Ek state hai jo selected tab ke hisaab se relevant courses ko store karta hai. Initially, pehle tab ("Free") ke courses ko set kiya gaya hai, jo HomePageExplore[0].courses se aa rahe hain.     3). currentCard: Ek state hai jo currently selected course card ko track karta hai. Default me, pehla course card select kiya gaya hai (HomePageExplore[0].courses[0].heading).     Is code ka purpose yeh hai ki jab user tabs ke through explore kare, to relevant courses display ho aur unme se ek specific course card selected ho.   */}

const ExploreMore = () => {

  const [currentTab, setCurrentTab] = useState(tabsName[0]);

  const [courses, setCourses] = useState(HomePageExplore[0].courses);

  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );





    {/*   Is code ka main purpose hai:     1). setMyCards function: Jab user tab select karta hai (value), tab setMyCards function call hota hai.     2). setCurrentTab(value): Ye line currentTab state ko update karti hai, jo currently selected tab ko store karta hai.     3). HomePageExplore.filter((course) => course.tag === value): Ye line HomePageExplore array se wo courses filter karti hai jo selected tab ke tag se match karte hain. Isse hum specific tab ke liye relevant courses ko filter kar lete hain.     4). setCourses(result[0].courses): Ye line filtered courses ko setCourses state me set karti hai, jo tab ke courses ko display karne ka kaam karta hai.     5).setCurrentCard(result[0].courses[0].heading): Ye line pehle course card ko default select karti hai jab tab change hota hai, taki user ko ek default selected course card dikhai de.        */}

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };




  
  return (
    <div>





    {/*   "Unlock the Power of Code Learn to Build Anything You Can Imagine"   */}

      <div>

        <div className="text-4xl font-semibold text-center my-10">

          Unlock the
          <HighlightText text={"Power of Code"} />
         
          <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>

        </div>

      </div>





    {/*   Free, New to coding, Most popular, Skills paths, and Career paths Button   */}

      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabsName.map((ele, index) => {
          return (

            <div
              className={` text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>

          );
        })}
      </div>

      <div className="hidden lg:block lg:h-[200px]"></div>





    {/*   Cards Group   */}

      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>

    </div>
     
  );
};





export default ExploreMore;