import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('Connecting to ScholarX Server...')

  useEffect(() => {
    // Making the call to your Node.js server
    fetch('http://localhost:5000/')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text(); // This converts the raw data to readable text
      })
      .then((data) => setMessage(data))
      .catch((err) => {
        console.error(err);
        setMessage('Backend is not running!');
      });
  }, []);

  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '100px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f9',
      padding: '50px',
      borderRadius: '15px'
    }}>
      <h1 style={{ color: '#2c3e50' }}>Judit's Task Management Dashboard</h1>
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        display: 'inline-block',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px'
      }}>
        <p style={{ fontSize: '1.1rem', color: '#7f8c8d' }}>Server Status:</p>
        <h2 style={{ color: '#3498db' }}>{message}</h2>
      </div>
    </div>
  )
}

export default App