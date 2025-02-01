require('dotenv').config();
const mongoose = require('mongoose');
const redis = require('redis');
const AWS = require('aws-sdk');

// Initialize AWS Translate
const translate = new AWS.Translate({
  region: 'ap-south-1', // Replace with your AWS region
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

// Initialize Redis client
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.connect();

// MongoDB schema
const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  srcLanguage: { type: String, default: 'en' }, 
  translations: {
    question: { type: Map, of: String, default: {} },
    answer: { type: Map, of: String, default: {} },
  },
});


// Method to get translated question
const translateText = async (text, srcLanguage, targetLanguage) => {
  if (srcLanguage === targetLanguage) return text; // No need to translate if the source and target languages are the same
  const params = {
    Text: text,
    SourceLanguageCode: srcLanguage,
    TargetLanguageCode: targetLanguage,
  };
  const { TranslatedText } = await translate.translateText(params).promise();
  return TranslatedText;
};

// Automate translations before saving
faqSchema.pre('save', async function (next) {
  const languages = ['hi', 'bn', 'te', 'gu', 'en']; // Target languages (all available languages)

  try {
    const { srcLanguage = 'en' } = this; // Default source language is 'en'
    console.log('srcLanguage:', srcLanguage);
    // Translate question into all target languages
    for (const lang of languages) {
      if (!this.translations.question.get(lang)) {
        const translatedText = await translateText(this.question, srcLanguage, lang);
        this.translations.question.set(lang, translatedText);
      }
    }

    // Translate answer into all target languages
    for (const lang of languages) {
      if (!this.translations.answer.get(lang)) {
        const translatedText = await translateText(this.answer, srcLanguage, lang);
        this.translations.answer.set(lang, translatedText);
      }
    }

    next();
  } catch (error) {
    console.error('Error during translation:', error);
    next(error);
  }
});

// Method to get translated question based on lang query parameter
faqSchema.methods.getTranslatedQuestion = async function (lang) {
  const cacheKey = `faq:${this._id}:question:${lang}`;
  const cachedTranslation = await redisClient.get(cacheKey);

  if (cachedTranslation) return cachedTranslation;

  if (this.translations.question.get(lang)) {
    await redisClient.set(cacheKey, this.translations.question.get(lang));
    return this.translations.question.get(lang);
  }

  return this.question; // Fallback to the original question if no translation is found
};

// Method to get translated answer based on lang query parameter
faqSchema.methods.getTranslatedAnswer = async function (lang) {
  const cacheKey = `faq:${this._id}:answer:${lang}`;
  const cachedTranslation = await redisClient.get(cacheKey);

  if (cachedTranslation) return cachedTranslation;

  if (this.translations.answer.get(lang)) {
    await redisClient.set(cacheKey, this.translations.answer.get(lang));
    return this.translations.answer.get(lang);
  }

  return this.answer; // Fallback to the original answer if no translation is found
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Export the FAQ model
const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;