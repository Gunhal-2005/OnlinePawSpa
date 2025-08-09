import React from 'react';
import { Link } from 'react-router-dom';

// Footer Component
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.logoContainer}>
          <h3 style={styles.logo}>Online PawSpa</h3>
          <p style={styles.tagline}>Your pet deserves the best care!</p>
        </div>

        <div style={styles.linksContainer}>
          <h4 style={styles.sectionTitle}>Quick Links</h4>
          <ul style={styles.linkList}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/service" style={styles.link}>Available Services</Link></li>
            <li><Link to="/appointment" style={styles.link}>Book Appointment</Link></li>
            <li><Link to="/user-appointments" style={styles.link}>My Appointments</Link></li>
            {/* <li><Link to="/admin" style={styles.link}>Admin Dashboard</Link></li> */}
          </ul>
        </div>

        <div style={styles.contactContainer}>
          <h4 style={styles.sectionTitle}>Contact Us</h4>
          <p style={styles.contactInfo}>📍 123 Pet Street, Chennai, Tamilnadu</p>
          <p style={styles.contactInfo}>📞 +91 70922 96205</p>
          <p style={styles.contactInfo}>✉ onlinepawspa@.com</p>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <p style={styles.footerText}>© 2025 online PawSpa. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

// Styles for the Footer (can be customized)
const styles = {
  footer: {
    backgroundColor: '#333',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
    fontSize: '14px',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  logoContainer: {
    flex: 1,
    paddingRight: '20px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  tagline: {
    fontSize: '16px',
    fontStyle: 'italic',
  },
  linksContainer: {
    flex: 1,
    padding: '10px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  linkList: {
    listStyleType: 'none',
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    display: 'block',
    marginBottom: '10px',
  },
  contactContainer: {
    flex: 1,
    paddingLeft: '20px',
  },
  contactInfo: {
    margin: '5px 0',
    fontSize: '14px',
  },
  footerBottom: {
    marginTop: '20px',
    borderTop: '1px solid #444',
    paddingTop: '10px',
  },
  footerText: {
    fontSize: '12px',
    color: '#aaa',
  },
};

export default Footer;
