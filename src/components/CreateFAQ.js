import React, { useState } from 'react';
import axios from 'axios';

const CreateFAQ = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [language, setLanguage] = useState('en');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when the form is submitted
    try {
      const response = await axios.post('/api/v1/faqs', {
        question,
        answer,
      }, {
        params: { lang: language },
      });
      setMessage('FAQ created successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Failed to create FAQ');
      console.error(error);
    } finally {
      setLoading(false);  // Set loading to false after the request completes
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Create a New FAQ</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Answer:</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              resize: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="te">Telugu</option>
            <option value="gu">Gujarati</option>
          </select>
        </div>

        <button 
          type="submit"
          style={{
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '10px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
        >
          Submit
        </button>
      </form>

      {loading && <p style={{ textAlign: 'center', color: '#007BFF', marginTop: '15px', fontSize: '16px' }}>Loading...</p>}

      {message && <p style={{ textAlign: 'center', color: 'green', marginTop: '15px', fontSize: '16px' }}>{message}</p>}
    </div>
  );
};

export default CreateFAQ;
