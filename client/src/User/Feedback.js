

import React, { useState, useEffect } from "react";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:5000/api/feedbacks";

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        credentials: "include", // ✅ Ensures JWT cookies are sent
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch feedback");
      }

      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Ensures JWT cookies are sent
        body: JSON.stringify({ content: newFeedback }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit feedback");
      }

      setNewFeedback("");
      fetchFeedbacks(); // Refresh the feedback list
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Feedback</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmitFeedback} style={styles.form}>
        <textarea
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Write your feedback..."
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      <h3 style={styles.subheading}>Your Previous Feedback:</h3>
      <ul style={styles.list}>
        {feedbacks.map((feedback) => (
          <li key={feedback._id} style={styles.listItem}>
            <strong>{feedback.email}:</strong> {feedback.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  subheading: {
    marginTop: "20px",
    color: "#555",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};

export default Feedback;
