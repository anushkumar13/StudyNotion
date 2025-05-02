




{/*   Yeh function seconds ko time duration (hours, minutes, seconds) mein convert karta hai aur usse readable format mein return karta hai.   */}

function convertSecondsToDuration(totalSeconds) { 

    const hours = Math.floor(totalSeconds / 3600)                                                  //  Total seconds ko 3600 se divide karke hours calculate kar rahe hain, aur Math.floor se decimal points ko remove kar rahe hain.

    const minutes = Math.floor((totalSeconds % 3600) / 60)                                         //  totalSeconds % 3600 se remaining seconds nikaal rahe hain (jise hours mein convert kar liya). Fir, usko 60 se divide karke minutes nikaal rahe hain. 

    const seconds = Math.floor((totalSeconds % 3600) % 60)                                         //  Remaining seconds ko directly calculate kar rahe hain, jise minutes ke baad bacha hua seconds batata hai.
  
    if (hours > 0) {                                                                               //  Agar hours greater than 0 hai, toh result ko hours aur minutes ke format mein return kar rahe hain (for example, "2h 30m").
      return `${hours}h ${minutes}m`
    } 
    
    else if (minutes > 0) {                                                                        //  Agar minutes greater than 0 hai, toh result ko minutes aur seconds ke format mein return kar rahe hain (for example, "30m 45s").
      return `${minutes}m ${seconds}s`
    }
    
    else {                                                                                         //  Agar sirf seconds hi bache hain, toh result ko sirf seconds ke format mein return kar rahe hain (for example, "45s").
      return `${seconds}s`
    }
  }
  




  module.exports = {
    convertSecondsToDuration,
  }