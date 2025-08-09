// import React, { useState } from "react";

// const BeforeAfter = () => {
//   const [sliderPosition, setSliderPosition] = useState(50);

//   const handleSliderChange = (e) => {
//     setSliderPosition(e.target.value);
//   };

//   const pets = [
//     { before: "/images/before.jpeg", after: "/images/after.jpeg" },
//     { before: "/images/dirt.webp", after: "/images/after1.webp" },
//     { before: "/images/before2.png", after: "/images/after2.jpeg" },
//     { before: "/images/dirtypom.webp", after: "/images/after3.jpg" },

    
    
//   ];

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "20px" }}>
//       {pets.map((pet, index) => (
//         <div key={index} style={{ position: "relative", width: "300px", textAlign: "center" }}>
//           <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "10px" }}>
//             {/* Before Label */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 left: "10px",
//                 backgroundColor: "rgba(0, 0, 0, 0.5)",
//                 color: "white",
//                 padding: "5px 10px",
//                 borderRadius: "5px",
//                 fontSize: "14px",
//                 fontWeight: "bold",
//               }}
//             >
//               Before
//             </div>
//             <img src={pet.before} alt={`Before ${index + 1}`} style={{ width: "100%", display: "block" }} />
//             <div
//               style={{
//                 position: "absolute",
//                 top: "0",
//                 left: "0",
//                 height: "100%",
//                 width: `${sliderPosition}%`,
//                 overflow: "hidden",
//               }}
//             >
//               {/* After Label */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   left: "10px",
//                   backgroundColor: "rgba(0, 0, 0, 0.5)",
//                   color: "white",
//                   padding: "5px 10px",
//                   borderRadius: "5px",
//                   fontSize: "14px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 After
//               </div>
//               <img src={pet.after} alt={`After ${index + 1}`} style={{ width: "100%", display: "block" }} />
//             </div>
//           </div>
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={sliderPosition}
//             onChange={handleSliderChange}
//             style={{ width: "100%", marginTop: "10px" }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BeforeAfter;
import React, { useState } from "react";

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  const pets = [
    { before: "/images/before.jpeg", after: "/images/after.jpeg" },
    { before: "/images/dirtypom.webp", after: "/images/after3.jpg" },
    { before: "/images/before2.png", after: "/images/after2.jpeg" },
  ];

  return (
   <div>
    <h1
  style={{
    fontFamily: "'Playfair Display', serif",
    fontSize: "48px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "30px",
    color: "transparent",
    backgroundImage: "linear-gradient(90deg, #d4af37, #fff3b0)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
    letterSpacing: "2px",
  }}
>
  Before and After
</h1>

     <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", padding: "30px" }}>
      {pets.map((pet, index) => (
        <div key={index} style={{ position: "relative", width: "400px", textAlign: "center" }}>
          <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "12px" }}>
            {/* Before Label */}
            {sliderPosition < 100 && (
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  zIndex: 2,
                }}
              >
                Before
              </div>
            )}
            <img src={pet.before} alt={`Before ${index + 1}`} style={{ width: "100%", display: "block" }} />
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                height: "100%",
                width: `${sliderPosition}%`,
                overflow: "hidden",
              }}
            >
              {/* After Label */}
              {sliderPosition > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    zIndex: 2,
                  }}
                >
                  After
                </div>
              )}
              <img src={pet.after} alt={`After ${index + 1}`} style={{ width: "100%", display: "block" }} />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            style={{ width: "100%", marginTop: "15px" }}
          />
        </div>
      ))}
    </div>
   </div>
  );
};

export default BeforeAfter;

