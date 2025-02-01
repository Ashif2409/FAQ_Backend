const FAQ = require("../models/FAQ");

const getAllFaqs = async (req, res) => {
    try {
        const lang = req.query.lang || 'en'; 

        const faqs = await FAQ.find();

        const translatedFaqs = faqs.map((faq) => {
            const translatedQuestion = faq.translations.question.get(lang);
            const translatedAnswer = faq.translations.answer.get(lang);

            return {
                id: faq._id,
                question: translatedQuestion || `No translation available for ${lang}`,
                answer: translatedAnswer || `No translation available for ${lang}`,
            };
        });

        res.status(200).json(translatedFaqs);
    } catch (error) {
        console.error('Error fetching translated FAQs:', error);
        res.status(500).json({ error: 'Failed to fetch translated FAQs' });
    }
}

const getFaqById = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
          return res.status(404).json({ error: 'FAQ not found' });
        }
    
        const lang = req.query.lang || 'en'; // Default to 'en' if lang is missing or empty
        const translatedQuestion = faq.translations.question.get(lang) || faq.question;
        const translatedAnswer = faq.translations.answer.get(lang) || faq.answer;
    
        res.status(200).json({
          question: translatedQuestion,
          answer: translatedAnswer,
        });
      } catch (error) {
        console.error('Error fetching translated FAQ:', error);
        res.status(500).json({ error: 'Failed to fetch translated FAQ' });
      }
}

module.exports = {getAllFaqs, getFaqById};
