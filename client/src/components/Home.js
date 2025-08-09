import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCarousel from '../components/MyCarsouel';
import './Home.css';
import Card from '../components/Card';
import AboutCarousel from '../components/AboutCarsouel';
import BeforeAfter from '../components/BeforeAfter';
import TimeSlotsTable from '../components/TimeSlotsTable';

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch feedback from the backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/home');
        console.log('Fetched Feedbacks:', response.data); // Debugging
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setError('Failed to load feedbacks');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Carousel components */}
      <MyCarousel />
      <AboutCarousel />

      {/* Services Section */}
      <div style={{ margin: '30px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '20px' }}>
        <h1 style={{
          fontSize: '2em',
          color: 'transparent',
          WebkitTextStroke: '1px black',
          textStroke: '1px black'
        }}>
          Our Services:
        </h1>
        <Card />
      </div>
      <div>
        <BeforeAfter/>
      </div>
      <div style={{marginLeft:'85px',marginBottom:'80px'}}>
        
        <TimeSlotsTable />
      </div>

      {/* Feedback Section */}
      <div className="feedback">
        <h2 className="fixed-feedback-heading">Customer Feedback</h2>

        <div className="feedback-section">
          {loading ? (
            <p>Loading feedbacks...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : feedbacks.length === 0 ? (
            <p>No feedbacks yet.</p>
          ) : (
            <div className="feedback-list">
              {feedbacks.map((feedback) => (
                <div key={feedback._id} className="feedback-item">
                  <p><strong>{feedback.email}:</strong></p>
                  <p>{feedback.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Home;

