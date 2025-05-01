



    {/*   Yeh function GetAvgRating average rating ko calculate karta hai jo ratingArr (ratings ka array) ko pass karne par return hota hai. Sabse pehle check hota hai agar array empty hai, toh 0 return hota hai. Phir, reduce method se total rating count calculate hota hai. Uske baad, average rating ko calculate karke ek decimal place tak round kiya jata hai using Math.round. Final average rating return hota hai.   */}

export default function GetAvgRating(ratingArr) {
    if (ratingArr?.length === 0) return 0
    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
      acc += curr.rating
      return acc
    }, 0)
  
    const multiplier = Math.pow(10, 1)
    const avgReviewCount =
      Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
  
    return avgReviewCount
  }