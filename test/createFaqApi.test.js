const request = require('supertest');
const app = require('../app'); 

describe('FAQ API Routes', () => {

  it('should create a new FAQ', async () => {
    const newFaq = {
      question: 'What is Jest?',
      answer: 'Jest is a JavaScript testing framework.',
    };

    const response = await request(app)
      .post('http://localhost:3000/api/v1/faqs')  
      .send(newFaq)
      .expect(201);  

    expect(response.body).toHaveProperty('question', newFaq.question);
    expect(response.body).toHaveProperty('answer', newFaq.answer);
  });


  it('should get all FAQs', async () => {
    await request(app)
      .post('http://localhost:3000/api/v1/faqs')
      .send({ question: 'What is Node.js?', answer: 'Node.js is a runtime environment for JavaScript.' })
      .expect(201);

    const response = await request(app)
      .get('http://localhost:3000/api/v1/faqs/translate')  

    expect(Array.isArray(response.body)).toBe(true); 
    expect(response.body.length).toBeGreaterThan(0);  
  });

  it('should get FAQ by ID', async () => {
    const newFaq = {
      question: 'What is MongoDB?',
      answer: 'MongoDB is a NoSQL database.',
    };

    const createdResponse = await request(app)
      .post('/api/v1/faqs')  
      .send(newFaq)
      .expect(201);
  });

});
