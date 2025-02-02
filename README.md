# FAQ Translation API  

This project provides an API to manage FAQs (Frequently Asked Questions) with translation capabilities. The backend is built with **Express.js, MongoDB, Redis, and AWS Translate**. The system automatically translates questions and answers into multiple languages: **English, Hindi, Bengali, Telugu, and Gujarati**. It also caches the translated content in Redis for efficient retrieval.  

### 🔗 Live Link: [FAQ Frontend](https://faq-frontend-jono.onrender.com/)  
### 📄 API Documentation: [Postman Docs](https://documenter.getpostman.com/view/21537931/2sAYX3r3r9)  
### 🎥 Demo Video: [Watch Demo](https://drive.google.com/file/d/1Ber08LBk9--9q5d7xzhhwV-6flN09xCV/view?usp=sharing)  
### 📂 Resume: [View Resume](https://drive.google.com/file/d/1cqR29yToNKvsrCEnKpR623r72Rk0-oAh/view?usp=sharing)  

---

## Features
- **FAQ Management**: Create and fetch FAQs.
- **Automatic Translation**: Questions and answers are translated into multiple languages (e.g., Hindi, Bengali, Telugu, Gujarati, and English).
- **Caching with Redis**: Translated questions and answers are cached in Redis for fast access.
- **AWS Translate**: Utilizes AWS Translate to perform translations.

## Technologies
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **Cloud Services**: AWS (for translation)
- **Containerization**: Docker

## API Endpoints
### `POST /api/v1/faqs?lang=en`
Create a new FAQ.

**Request body**:
```json
{
  "question": "What is Docker?",
  "answer": "Docker is a platform for developing, shipping, and running applications.",
}
```
### `GET /api/v1/faqs/translate?lang=en`
Fetch all FAQs with their translations.

###  `GET /api/v1/faqs/translate/:id?lang=en`
Fetch a specific FAQ with its translations by ID.

### Environment Variables
Ensure you have the following environment variables set in your .env file:

```
MONGO_URI=<your_mongodb_connection_string>
REDIS_URL=redis://redis:6379
ACCESS_KEY=<your_aws_access_key>
SECRET_KEY=<your_aws_secret_key>
```
### Docker Setup
This project uses Docker and Docker Compose to set up the environment with MongoDB, Redis, and the backend application.

### Prerequisites
Install Docker and Docker Compose.
Running the Application
Clone the repository:
```
git clone https://github.com/Ashif2409/FAQ_Backend.git
cd FAQ_Backend
```
# Create a .env file in the project root and populate it with the required environment variables (as mentioned above).

### Build and start the services using Docker Compose:

```
docker-compose up --build
```
