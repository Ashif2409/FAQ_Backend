import React, { useState, useEffect } from "react";
import axios from "axios";

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [translations, setTranslations] = useState({});

  // Fetch the FAQs from the backend
  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://faq-backend-c1fy.onrender.com/api/v1/faqs/translate", {
        params: { lang: "en" }, 
      });
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  // Handle translating FAQ to the selected language
  const handleTranslate = async (faqId, lang) => {
    try {
      const response = await axios.get(`https://faq-backend-c1fy.onrender.com/api/v1/faqs/translate/${faqId}`, {
        params: { lang },
      });

      setTranslations((prev) => ({
        ...prev,
        [faqId]: response.data, 
      }));
    } catch (error) {
      console.error("Error translating FAQ:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>FAQs</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {faqs.map((faq) => (
            <li
              key={faq.id}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ margin: "0 0 5px", color: "#222" }}>
                {translations[faq.id]?.question || faq.question}
              </h3>
              <p style={{ margin: 0, color: "#555", lineHeight: "1.5" }}>
                {translations[faq.id]?.answer || faq.answer}
              </p>

              {/* Dropdown for each FAQ to select language */}
              <div style={{ marginTop: "10px" }}>
                <label style={{ marginRight: "10px" }}>Select Language: </label>
                <select
                  onChange={(e) => handleTranslate(faq.id, e.target.value)}
                  style={{
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="bn">Bengali</option>
                  <option value="te">Telugu</option>
                  <option value="gu">Gujarati</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FAQList;
