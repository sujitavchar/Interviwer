# 🎯 Interviwer

> **A community-driven platform where developers can share and explore real interview experiences.**

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)

---

## 📖 About

**Interviwer** is a full-stack MERN application that empowers developers to share their interview experiences from top companies. Whether you aced the round or learned a hard lesson, your experience can help someone else prepare better. Browse experiences by company, role, or difficulty — and contribute your own to give back to the community.

---

## ✨ Features

- 📝 **Post Interview Experiences** — Share detailed accounts of your technical and HR interview rounds
- 🔍 **Browse & Discover** — Explore experiences filtered by company, role, or difficulty level
- 👤 **User Authentication** — Secure sign-up and login to manage your posts
- 🖼️ **Media Uploads** — Attach relevant images or documents to your interview post
- 💬 **Community-Driven** — Read and learn from real experiences shared by real people
- 📱 **Responsive Design** — Fully functional across desktop and mobile devices

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JWT (JSON Web Tokens) |
| **File Uploads** | Multer / Cloudinary |
| **Environment** | dotenv |
| **Code Quality** | Prettier |

---

## 📁 Project Structure

```
Interviwer/
├── frontend/          # React frontend application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── src/               # Node.js backend application
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── ...
├── public/
│   └── temp/          # Temporary file uploads
├── .env               # Environment variables (not committed)
├── .prettierrc        # Prettier configuration
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud instance)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/sujitavchar/Interviwer.git
cd Interviwer
```

**2. Install backend dependencies**

```bash
npm install
```

**3. Install frontend dependencies**

```bash
cd frontend
npm install
cd ..
```

**4. Set up environment variables**

Create a `.env` file in the root directory and add the following:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**5. Run the application**

Start the backend server:

```bash
node -r dotenv/config src/index.js --experimental-json-modules
```

Start the frontend (in a new terminal):

```bash
cd frontend
npm start
```

The backend will run on `http://localhost:8000` and the frontend on `http://localhost:3000`.

---
