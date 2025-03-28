<div align="center">
  <br />
  <img src="https://github.com/AdamNgazzou/startups/assets/project-banner.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=white&logo=node.js&color=339933" alt="Node.js" />
    <img src="https://img.shields.io/badge/-Express.js-black?style=for-the-badge&logoColor=white&logo=express&color=000000" alt="Express.js" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="MongoDB" />
    <img src="https://img.shields.io/badge/-Mongoose-black?style=for-the-badge&logoColor=white&logo=mongodb&color=880000" alt="Mongoose" />
    <img src="https://img.shields.io/badge/-JWT-black?style=for-the-badge&logoColor=white&logo=jsonwebtokens&color=FFCC00" alt="JWT" />
  </div>

  <h3 align="center">Startups MERN Backend</h3>

  <div align="center">
     A powerful backend API built with Node.js, Express.js, and MongoDB for managing startup listings, user authentication, and dynamic data retrieval.
  </div>
</div>

## 📋 Table of Contents

1. 🚀 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. ⚡ [Quick Start](#quick-start)
5. 🛠️ [API Endpoints](#api-endpoints)
6. 🔗 [Environment Variables](#environment-variables)

## 🚀 Introduction

The **Startups MERN Backend** is designed to handle startup-related data efficiently. It provides API endpoints for CRUD operations, authentication, and authorization. This backend seamlessly integrates with a frontend for startup listings.

## ⚙️ Tech Stack

- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Fast and lightweight web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling for Node.js
- **JWT** - Secure authentication mechanism
- **dotenv** - Environment variable management

## 🔋 Features

✅ **User Authentication** - Secure login and registration with JWT

✅ **Startup Management** - Create, read, update, and delete startup listings

✅ **API Security** - Middleware for route protection

✅ **Database Integration** - MongoDB with Mongoose for schema validation

✅ **Efficient Routing** - RESTful API structure for easy integration

## ⚡ Quick Start

**Prerequisites:**
- [Node.js](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/AdamNgazzou/startups-mern-backend.git
cd startups-mern-backend
```

### Install Dependencies
```bash
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
Replace the placeholder values with your actual credentials.

### Run the Server
```bash
npm start
```
The backend will be available at `http://localhost:5000`.

## 🛠️ API Endpoints

| Method | Endpoint          | Description                   |
|--------|------------------|-------------------------------|
| GET    | `/api/startups`  | Fetch all startups           |
| POST   | `/api/startups`  | Create a new startup         |
| GET    | `/api/startups/:id` | Get a specific startup by ID |
| PUT    | `/api/startups/:id` | Update a startup            |
| DELETE | `/api/startups/:id` | Delete a startup            |
| POST   | `/api/auth/register` | Register a new user        |
| POST   | `/api/auth/login` | Login and get a token       |

## 🔗 Environment Variables
Ensure the following environment variables are configured in your `.env` file:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT authentication
- `PORT` - Port number for the server

---

💡 **Future Enhancements:** Add role-based access control, API rate limiting, and deployment configurations!

Made with ❤️ by [Adam Ngazzou](https://github.com/AdamNgazzou) 🚀
