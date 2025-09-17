# 🧠 NeuraNote - Your Second Brain, Amplified

NeuraNote is a full-stack web application designed to be a user's personal knowledge base. It allows users to capture, organize, and retrieve information from various sources like articles, notes, and links, and then intelligently converse with them using a powerful AI assistant.

---

## 🧐 The Problem

In the age of information overload, we consume vast amounts of content daily—articles, tutorials, fleeting thoughts, and project ideas. This knowledge is often scattered across bookmarks, note-taking apps, and social media likes, making it difficult to find and connect related ideas when they are needed most. Key insights are forgotten, and valuable resources get lost in the digital clutter.

---

## ✨ The Solution

NeuraNote solves this by providing a single, centralized platform to store and organize your digital world. It's more than just a bookmarking tool; it's an intelligent system that understands your content.

Users can save anything from a web link to a raw text note and organize it into **predefined sections** like "Blogs," "Ideas," or "Notes." The core feature is the **conversational AI assistant**, which allows users to have back-and-forth conversations and get concise answers based _only_ on the content they have saved. Instead of just asking one-off questions, you can ask follow-up questions and dive deeper into your knowledge.

For example, you can have a conversation like this:

> **You:** _"What were my notes on that project idea involving vector databases?"_ > **NeuraNote:** _"You noted an idea for an app called 'NeuraNote' that uses a vector database for semantic search."_ > **You:** _"What technologies did I mention for its backend?"_ > **NeuraNote:** _"You mentioned using a Node.js backend for the project."_

---

## 🚀 Key Features

- **Secure Authentication**: JWT-based authentication with email verification(will add soon) to ensure user data is secure.
- **Capture Everything**: Save web links (articles, videos) or create simple text notes.
- **Simple Organization**: Categorize your knowledge with **predefined sections** and powerful tags.
- **Conversational AI**: Engage in back-and-forth conversations with your knowledge base. The AI remembers the context of your chat to answer follow-up questions accurately.
- **Credit System**: Users receive a set number of AI credits to ensure fair usage of the powerful (but costly) Gemini API.
- **API Rate Limiting**: The backend is protected against spam and abuse with a request rate limiter.
- **Dashboard**: Get a quick overview of your knowledge base with stats on total memories and tag usage.
- **Full CRUD Functionality**: Create, read, update, and delete memories with ease.

---

## 🛠️ Tech Stack & Architecture

This project is built with a separate backend and frontend, communicating via a RESTful API.

### Backend

- **Framework**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose for object modeling)
- **AI**:
  - **LLM**: Google Gemini (`gemini-2.5-flash`) for conversational chat.
- **Authentication**: JSON Web Tokens (JWT) stored in cookies.
- **Validation**: Zod for robust schema validation.
- **API Management**:
  - `express-rate-limit` for request throttling.
  - Custom middleware for managing user AI credits (`apiLimit`).

### Frontend

- **Framework**: React (using Vite for tooling)
- **Language**: TypeScript
- **State Management**: Zustand (a simple, fast state management library)
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **API Communication**: Axios

### Architecture

The application follows a classic client-server architecture:

1.  **Client (React SPA)**: The frontend is a Single-Page Application responsible for all UI rendering and user interaction. It communicates with the backend via HTTP requests and manages its state using Zustand.
2.  **API Server (Node.js/Express)**: The backend serves a RESTful API. It handles business logic, user authentication, database operations, and communicates with external services like Google Gemini API. It is completely stateless, relying on JWT for session management.
3.  **Database (MongoDB)**: Stores core data like users, memories, and API credit counts.

---

## ⚙️ Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js
- npm
- MongoDB (local instance or a free MongoDB Atlas cluster)
- A Google AI (Gemini) API key

### Backend Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/shadan1212/neuranote.git
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory and add the following variables:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRE_IN=30d

    GEMINI_API_KEY=your_google_gemini_api_key

    ```

4.  **Start the server:**
    ```bash
    npm run dev
    ```
    The backend server will be running on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or another port specified by Vite).

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

---

## 🔐 API Endpoints

A brief overview of the core API endpoints. All protected routes require a valid JWT.

| Method   | Endpoint             | Description                                  | Access  |
| :------- | :------------------- | :------------------------------------------- | :------ |
| `POST`   | `/api/auth/register` | Register a new user                          | Public  |
| `POST`   | `/api/auth/login`    | Log in a user                                | Public  |
| `GET`    | `/api/memory`        | Get memories                                 | Private |
| `POST`   | `/api/memory`        | Create a new memory                          | Private |
| `PUT`    | `/api/memory/:id`    | Update a memory                              | Private |
| `DELETE` | `/api/memory/:id`    | Delete a memory                              | Private |
| `POST`   | `/api/ai/query`      | Start or continue a conversation with the AI | Private |
