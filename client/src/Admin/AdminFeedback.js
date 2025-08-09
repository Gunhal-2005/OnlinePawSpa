// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminFeedback = () => {
//   const [feedbacks, setFeedbacks] = useState([]);

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/command/feedbacks', { withCredentials: true });
//         setFeedbacks(res.data);
//       } catch (err) {
//         console.error('Error fetching feedbacks:', err);
//       }
//     };

//     fetchFeedbacks();
//   }, []);

//   return (
//     <div className="p-6" style={{backgroundColor:"rgb(222, 241, 249)"}}>
//       <h2 className="text-2xl font-semibold mb-4">Customers Feedbacks</h2>
//       <div className="space-y-4">
//         {feedbacks.length === 0 ? (
//           <p>No feedbacks found.</p>
//         ) : (
//           feedbacks.map((fb) => (
//             <div key={fb._id} className="border p-4 rounded-lg shadow-md">
//               <p><strong>User:</strong> {fb.email}</p>
//               <p><strong>Feedback:</strong> {fb.content}</p>
//               <p className="text-sm text-gray-500">{new Date(fb.createdAt).toLocaleString()}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminFeedback;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/command/feedbacks', { withCredentials: true });
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
      }
    };

    fetchFeedbacks();
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '40px',
      background: 'linear-gradient(to right, #f0f4f8, #e8f0ff)',
      fontFamily: 'Georgia, serif',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '40px',
      color: '#8B6A33',
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    },
    feedbackCard: {
      background: 'rgba(255, 255, 255, 0.85)',
      border: '1px solid #d4af37',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s',
    },
    feedbackCardHover: {
      transform: 'scale(1.03)',
    },
    label: {
      fontWeight: 'bold',
      color: '#8B6A33',
    },
    dateText: {
      fontSize: '14px',
      color: '#777',
      fontStyle: 'italic',
      marginTop: '10px',
    },
    noFeedback: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#999',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Feedbacks</h2>
      <div>
        {feedbacks.length === 0 ? (
          <p style={styles.noFeedback}>No feedbacks found.</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb._id}
              style={styles.feedbackCard}
              onMouseOver={e => e.currentTarget.style.transform = styles.feedbackCardHover.transform}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              <p><span style={styles.label}>User:</span> {fb.email}</p>
              <p><span style={styles.label}>Feedback:</span> {fb.content}</p>
              <p style={styles.dateText}>{new Date(fb.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;
