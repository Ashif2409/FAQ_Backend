const express=require('express');
const  createFaq = require('../controller/createFaq.controller');
const { getAllFaqs, getFaqById } = require('../controller/getFaqs.controller');
const router=express.Router();


router.post('/faqs',createFaq);
router.get('/faqs/translate',getAllFaqs);
router.get('/faqs/translate/:id',getFaqById);


module.exports=router;