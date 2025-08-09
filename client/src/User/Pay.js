// import React from 'react';
// import { FaEnvelope, FaArrowRight } from 'react-icons/fa'; // Importing the icons

// const Pay = () => {
//   const cardStyle = {
//     width: 'fit-content',
//     margin: '50px auto', // Centers the card horizontally
//     padding: '20px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow effect
//     backgroundColor: '#fff',
//     textAlign: 'center', // Centers the content inside the card
//   };

//   const imageStyle = {
//     height: '400px', // Fixed height
//     display: 'block',
//     margin: '0 auto', // Centers the image
//     borderRadius: '5px',
//   };

//   const noteStyle = {
//     marginTop: '20px',
//     padding: '15px',
//     borderRadius: '8px',
//     backgroundColor: '#f8f9fa', // Light grey background
//     borderLeft: '5px solid #007bff', // Blue left border
//     textAlign: 'center',
//     width: '50%',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Soft shadow
//   };

//   const emailContainerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '10px', // Spacing between arrow icon and email
//     marginTop: '10px',
//   };

//   const linkStyle = {
//     color: '#007bff',
//     textDecoration: 'none',
//     fontWeight: 'bold',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '6px', // Spacing between email icon and text
//   };

//   return (
//     <div>
//       <div style={cardStyle}>
//         <h1>QR Code</h1>
//         <img src="/images/QR.jpg" alt="QR Code" style={imageStyle} />
//       </div>

//       {/* Note Section */}
//       <div style={noteStyle}>
//         <h3>Note:</h3>
//         <h5>After payment, send the proof with appointment details via email:</h5>
//         <div style={emailContainerStyle}>
//           <FaArrowRight size={16} color="#007bff" />
//           {/* <a
//   href="mailto:onlinepawspa@gmail.com"
//   style={linkStyle}
// >
//   <FaEnvelope size={18} /> onlinepawspa@gmail.com
// </a> */}
// <a href="mailto:onlinepawspa@example.com">Contact Us</a>



//         </div>
//       </div>
//     </div>
//   );
// }

// export default Pay;

import React from 'react';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Pay = () => {
  const cardStyle = {
    width: 'fit-content',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    textAlign: 'center',
  };

  const imageStyle = {
    height: '400px',
    display: 'block',
    margin: '0 auto',
    borderRadius: '5px',
  };

  const noteStyle = {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    borderLeft: '5px solid #007bff',
    textAlign: 'center',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const emailContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  return (
    <div>
      <div style={cardStyle}>
        <h1>QR Code</h1>
        <img src="/images/QR.jpg" alt="QR Code" style={imageStyle} />
      </div>

      <div style={noteStyle}>
        <h3>Note:</h3>
        <h5>After payment, send the proof with appointment details via email:</h5>
        <div style={emailContainerStyle}>
          <FaArrowRight size={16} color="#007bff" />
          <a
            href="mailto:onlinepawspa@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            <FaEnvelope size={18} /> onlinepawspa@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pay;
