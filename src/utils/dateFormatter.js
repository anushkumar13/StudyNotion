



    {/*   Yeh formattedDate function ek date ko input ke roop mein leta hai, phir us date ko ek aise format mein convert karta hai jismein month ka full name, day aur year hota hai. toLocaleDateString method ka use karke date ko "en-US" format mein convert kiya jaata hai. Jaise agar input 2025-05-01 ho, toh output May 1, 2025 hoga.   */}

export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }