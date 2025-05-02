

const { Mongoose } = require("mongoose");
const Category = require("../models/Category");





{/*   getRandomInt function ek random integer (poora number) return karta hai jo 0 se lekar (max - 1) ke beech hota hai. Function ke andar Math.random() se ek random floating-point number milta hai jo 0 aur 1 ke beech hota hai. Usko max se multiply karte hain taaki wo number 0 se lekar max ke beech chala jaye. Fir Math.floor() use karke us number ko neeche ki taraf round off kar dete hain taaki decimal hata diya jaye aur ek poora number mile. Isliye agar max 10 hai to yeh function 0 se 9 ke beech koi bhi random integer return karega.   */}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }










  {/*   Is createCategory function ka kaam hai ek new category banana aur usko database me save karna jab user ek HTTP POST request bhejta hai. Sabse pehle yeh function name aur description ko req.body se extract karta hai, jo ki client ke taraf se aayi hoti hai. Fir yeh check karta hai ki name diya gaya hai ya nahi — agar nahi diya gaya to turant 400 status ke saath error response bhej deta hai ki “All fields are required”. Agar sab kuch sahi ho to Category.create() ke through ek nayi category MongoDB me insert ki jaati hai, jisme name aur description dono field save kiye jaate hain. Successfully category create hone ke baad response me success message bhejta hai. Agar kisi bhi step me koi error aata hai to usse catch block me pakad liya jata hai aur 500 status ke saath error message client ko bheja jata hai.   */}

exports.createCategory = async (req, res) => {

	try {
		const { name, description } = req.body;

		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});

		console.log(CategorysDetails);

		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} 
  
  catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};










{/*   Is showAllCategories function ka kaam hai ki database ke andar jitni bhi categories save hain un sab ko fetch karke client ko bhejna. Sabse pehle function ke andar ek console log print hota hai jisse pata chalta hai ki function ke andar entry ho gayi hai. Uske baad Category.find({}) likha hai jo MongoDB me Category collection se saari documents ko le aata hai bina kisi condition ke. Fir un categories ko allCategorys variable me store kiya jata hai. Agar ye operation successfully ho jata hai to response me status 200 ke saath success: true aur saari categories data key ke andar bheji jaati hain. Agar koi error aata hai to usse catch block me pakad kar response me status 500 ke saath error message bhej diya jata hai.   */}

exports.showAllCategories = async (req, res) => {

	try {
        console.log("INSIDE SHOW ALL CATEGORIES");

		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} 
  
  catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};










{/*   Yeh function ek user ke frontend request ke basis par backend se teen main data cheezein deta hai:     1). Jo category user ne select ki hai uske andar ke published courses.     2). Ek doosri random category ke published courses.     3). Platform par overall sabse zyada bikne wale top 10 courses.     Function ka naam hai categoryPageDetails. Jab yeh function chalta hai to sabse pehle req.body se categoryId nikaala jaata hai, jo frontend se aata hai. Yeh ID use ki jaati hai pata lagane ke liye ki kaunsi category ka detail chahiye. Uske baad console.log kiya jaata hai taaki backend developer ko terminal mein dikhe ki kaunsi category ID aayi hai.  Phir Category.findById(categoryId) lagaya jaata hai, jiska matlab hai ki database se wo category dhundo jiska _id match kare categoryId se. Saath hi, us category ke courses field ko bhi populate kiya jaata hai, yaani course ki poori detail bhi fetch karo, lekin ek condition ke saath – sirf wahi courses fetch karo jinka status “Published” hai. Iska matlab yeh hai ki agar koi course draft ya unpublished hai to wo nahi laaya jaayega. Saath hi har course ke andar agar ratingAndReviews hai to unko bhi populate kiya jaata hai taki course ke review bhi frontend ko mil sake.  Agar koi category milti hi nahi database mein to response bhej diya jaata hai status 404 ke saath aur message ki “Category not found”. Iska matlab frontend ko yeh pata chal jata hai ki invalid category ID bheji gayi thi.  Agar category mil bhi jaati hai lekin uske andar koi published course nahi hai to phir bhi 404 bhej diya jaata hai, lekin message hota hai “No courses found for the selected category”.  Ab jab selected category aur uske courses mil jaate hain to next step mein Category.find() lagaya jaata hai jismein condition hoti hai _id: { $ne: categoryId }. Iska matlab hai ki sari categories fetch karo jo selected wali category nahi hain. Ab in categories me se ek random category uthaani hoti hai.  Iske liye ek function use kiya gaya hai getRandomInt(), jo 0 se lekar kisi max value tak random integer deta hai. Usse ek random category select ki jaati hai. Fir us random category ke andar ke courses ko bhi populate kiya jaata hai, lekin published hone chahiye.  Ab teesra kaam hota hai: sabhi categories ko fetch karna, unke andar ke sare courses populate karna, aur un courses ke andar ke instructor detail ko bhi populate karna. Ye sab kuch hota hai ek hi find().populate() call ke through.  Jab sabhi categories ke published courses mil jaate hain to flatMap() use karke in sabhi courses ko ek single array allCourses me convert kiya jaata hai. Iske baad inn courses ko sold property ke basis pe descending order me sort kiya jaata hai – jiska matlab hai ki sabse zyada bikne wale courses pehle honge.  Sorted list me se top 10 courses select kar liye jaate hain using .slice(0, 10) aur unko mostSellingCourses variable me store kiya jaata hai.  Finally, server ek response return karta hai jisme teen cheezein hoti hain:  1). selectedCategory – user ne jo category select ki thi uske published courses     2). differentCategory – ek random doosri category aur uske published courses     3). mostSellingCourses – overall platform ke top 10 selling courses.     Agar poore process me kahin bhi koi error aata hai to catch block us error ko pakadta hai aur 500 status code ke saath response bhejta hai – "Internal server error" ke message ke saath aur saath hi error ka exact message bhi frontend ko bheja jaata hai debugging ke liye.  To ye function backend ke liye bahut important hota hai jab frontend kisi ek category ka detail page open karta hai jisme uss category ke courses, kuch aur category ka course, aur trending courses sab dikhane hote hain ek sath.   */} 

exports.categoryPageDetails = async (req, res) => {

    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);

      // Get courses for the specified category

      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()

      // Handle the case when the category is not found

      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }

      // Handle the case when there are no courses

      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories

      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()

      // Get top-selling courses across all categories

      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()

      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } 
    
    catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }