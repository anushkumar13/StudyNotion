

const mongoose = require("mongoose")





{/*   Ye courseProgress schema ek student ke course ke andar progress ko track karta hai. Samjho ki agar ek student ne course start kiya hai, to usne kaunse videos complete kiye hain, ye isme track hota hai.   */}

const courseProgress = new mongoose.Schema({                                             //  Ek naya schema banaya ja raha hai jiska naam hoga courseProgress.

  courseID: {                                                                            //  Ye batata hai ki progress kis course ke liye ho rahi hai (refer karta hai Course model se).
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  userId: {                                                                              //  Ye batata hai ki ye progress kaunse user (student) ki hai.
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  completedVideos: [                                                                     //  Ye ek array hai jisme har completed video (jo ek SubSection hota hai) ka ID store hota hai.
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
})





module.exports = mongoose.model("courseProgress", courseProgress)