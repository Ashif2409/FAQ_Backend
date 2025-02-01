import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateFAQ from './components/CreateFAQ';
import FAQList from './components/FAQList';

const App = () => {
  return (
    <Router>
    <div style={{ fontFamily: "Arial, sans-serif",marginTop: "20px" }}>
      {/* Navigation Bar */}
      <nav style={{ 
        // backgroundColor: "#007BFF", 
        padding: "10px", 
        display: "flex", 
        justifyContent: "center" 
      }}>
        <ul style={{ 
          listStyle: "none", 
          display: "flex", 
          gap: "20px", 
          padding: "0", 
          margin: "0" 
        }}>
          <li>
            <Link 
              to="/" 
              style={{ color: "black", textDecoration: "none", fontSize: "18px",border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}
            >
              Admin
            </Link>
          </li>
          <li>
            <Link 
              to="/create" 
              style={{ color: "black", textDecoration: "none", fontSize: "18px",border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}
            >
              Create FAQ
            </Link>
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<FAQList />} />
          <Route path="/create" element={<CreateFAQ />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
};

export default App;