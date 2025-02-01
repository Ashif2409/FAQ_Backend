const FAQ = require('../models/FAQ');
 const createFaq = async (req, res) => {
    try {
        let srcLanguage = req.query.lang?.trim() || 'en';
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ error: 'Question and answer are required.' });
        }

        const faq = new FAQ({ question, answer, srcLanguage });
        await faq.save();

        res.status(201).json(faq);
    } catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ error: 'Failed to create FAQ' });
    }
}

module.exports = createFaq;