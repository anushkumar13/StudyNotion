// ✅ **STEP 1: FUNCTION EXPORT KAR RAHE HAIN**
// - Yeh ek functional component hai jo `Tab` ka UI return karega.
// - `export default` ka matlab yeh hai ki isko **direct import kar sakte hain** bina `{}` ke.
export default function Tab({ tabData, field, setField }) {

    // ✅ **STEP 2: UI RENDER KAR RAHE HAIN**
    return (
      <div
        style={{
          // 🔹 **Inline CSS laga rahe hain**
          // - `boxShadow` ka use kiya gaya hai taki **button ka ek subtle shadow effect aaye**.
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
        // 🔹 **Tailwind CSS classes ka use ho raha hai**
        // - `flex` ➝ Tabs ko **row me display** karega.
        // - `bg-richblack-800` ➝ Background color set karega.
        // - `p-1` ➝ Padding set karega taki andar ka content thoda breathable ho.
        // - `gap-x-1` ➝ Tabs ke beech horizontal gap.
        // - `my-6` ➝ Vertical margin taki spacing acchi dikhe.
        // - `rounded-full` ➝ Tabs ke edges **completely rounded** ho jaye.
        // - `max-w-max` ➝ Container sirf jitna zaroori ho utna hi space le.
      >
        
        {/* ✅ **STEP 3: LOOP LAGA KE TABS GENERATE KAR RAHE HAIN** */}
        {tabData.map((tab) => (
          <button
            key={tab.id}  // 🔹 **Unique key dena zaroori hai React ke optimization ke liye.**
            onClick={() => setField(tab.type)}  // 🔹 **Tab pe click hone par `setField` function call hoga**.
            className={`${
              field === tab.type
                ? "bg-richblack-900 text-richblack-5"  // ✅ **Active tab ka color (Blackish Gray)**
                : "bg-transparent text-richblack-200"  // ✅ **Inactive tab ka color (Light Gray)**
            } py-2 px-5 rounded-full transition-all duration-200`}
            // 🔹 **Tailwind Classes for Styling**
            // - `py-2` ➝ **Vertical padding** taki button bada lage.
            // - `px-5` ➝ **Horizontal padding** taki text andar se chipka na ho.
            // - `rounded-full` ➝ **Fully rounded edges** tab ka.
            // - `transition-all duration-200` ➝ **Smooth hover effect** dega.
          >
            {tab?.tabName}  {/* ✅ **Tab ka naam show karega jo API se aayega.** */}
          </button>
        ))}
        
      </div>
    );
  }
  