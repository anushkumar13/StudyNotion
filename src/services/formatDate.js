



    {/*   Yeh function ek date string ko format karta hai. Pehle options object mein date ko "year: numeric", "month: long", aur "day: numeric" ke format mein set kiya jaata hai. Phir new Date(dateString) se date ko Date object mein convert kiya jaata hai. Uske baad toLocaleDateString function se date ko formatted formattedDate mein convert karte hain. Phir, getHours aur getMinutes se hour aur minutes nikaale jaate hain. Agar hour 12 se zyada ho toh "PM" aur agar 12 se kam ho toh "AM" set hota hai. Final mein time ko proper format mein formattedTime mein store karte hain. Last mein date aur time ko combine karke return karte hain, jaise "March 1, 2025 | 5:30 PM".   */}

export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-US", options)
  
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const period = hour >= 12 ? "PM" : "AM"
    const formattedTime = `${hour % 12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`
  

      
    return `${formattedDate} | ${formattedTime}`
  }