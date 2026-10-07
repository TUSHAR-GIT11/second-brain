# Second Brain – AI-Augmented Knowledge Base

Second Brain is a full-stack AI-powered knowledge base built with the MERN stack and a Retrieval-Augmented Generation (RAG) pipeline.

Users can save technical notes or public document URLs. The application processes the content, generates embeddings, stores them in MongoDB Atlas, and uses MongoDB Atlas Vector Search to retrieve relevant knowledge for AI-generated answers.

The AI assistant is designed to answer questions only from the user's saved knowledge base.

---

## Features

- User registration and JWT authentication
- Create, read, update, and delete knowledge items
- Save plain text notes
- Ingest content from public URLs
- Automatic webpage text extraction and cleaning
- Text chunking with overlap
- Gemini embeddings
- MongoDB Atlas Vector Search
- User-specific semantic retrieval
- RAG-based AI chat
- Grounded AI responses
- Loading and error states
- Responsive React dashboard

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### AI / RAG

- Google Gemini
- Gemini Embeddings
- MongoDB Atlas Vector Search

---

## Architecture

```text
React + Vite
     │
     │ REST API
     ▼
Node.js + Express
     │
     ├──────────────► Google Gemini
     │                ├─ Embeddings
     │                └─ Generation
     │
     ▼
MongoDB Atlas
     │
     ├─ Users
     ├─ Notes
     └─ Chunks
          │
          ▼
   Atlas Vector Search


RAG Pipeline
Knowledge Ingestion
For text notes:
Text Note
   ↓
Text Chunking
   ↓
Embedding Generation
   ↓
MongoDB Atlas


For public URLs:
Public URL
   ↓
Fetch Webpage
   ↓
Clean Webpage Content
   ↓
Text Chunking
   ↓
Embedding Generation
   ↓
MongoDB Atlas


Question Answering
User Question
      ↓
Question Embedding
      ↓
MongoDB Atlas Vector Search
      ↓
Relevant Chunks
      ↓
Retrieved Context
      ↓
Gemini
      ↓
Grounded Answer



Text Chunking
Knowledge content is divided into smaller overlapping chunks before embeddings are generated.
Current configuration:
Chunk size: 500 words
Overlap: 50 words



Embeddings
Each knowledge chunk is converted into a vector embedding using Gemini Embeddings.
Current configuration:
Model: gemini-embedding-2
Dimensions: 768

Embeddings are stored with their corresponding chunks in MongoDB Atlas.
MongoDB Atlas Vector Search
MongoDB Atlas Vector Search is used for semantic retrieval instead of a separate vector database.
The vector search index uses:
Path: embedding
Dimensions: 768
Similarity: cosine
Filter: userId

The userId filter ensures that users can retrieve only their own knowledge.
Grounded Generation
The AI generation prompt instructs the model to:
- Answer only using the retrieved context.
- Avoid outside knowledge.
- Avoid making up information.
- Return a fallback response when the answer is not available.
Fallback response:
I don't know based on your knowledge base.

URL Ingestion
The application supports public HTTP and HTTPS URLs.
The ingestion process:
1. Validates the URL protocol.
2. Fetches the webpage.
3. Removes scripts and styles.
4. Removes navigation, header, footer, and aside elements.
5. Removes remaining HTML tags.
6. Decodes common HTML entities.
7. Normalizes whitespace.
8. Chunks the extracted content.
9. Generates embeddings.
10. Stores chunks and embeddings in MongoDB Atlas.
Only HTTP and HTTPS URLs are accepted.
API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login

Knowledge
GET    /api/notes
GET    /api/notes/:id
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id

AI Chat
POST /api/chat

Example request:
{
  "query": "What methods can be used on the Express response object?"
}

Project Structure
second-brain/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md

Local Setup
1. Clone the repository
git clone https://github.com/TUSHAR-GIT11/second-brain.git
cd second-brain

2. Backend
cd backend
npm install

Create backend/.env:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173

Start the backend:
npm run dev

Backend:
http://localhost:5000

3. Frontend
Open another terminal:
cd frontend
npm install

Create frontend/.env:
VITE_API_URL=http://localhost:5000/api

Start the frontend:
npm run dev

Frontend:
http://localhost:5173