# 💬 Web Chat App

A real-time chat application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Socket.IO** for instant messaging capabilities. This project is based on the tutorial by [Codesistency](https://www.youtube.com/watch?v=ntKkVrQqBYY).

---

## 🚀 Features

- **Real-Time Messaging:** Instant chat functionality powered by Socket.IO  
- **User Authentication:** Secure login and registration system  
- **Chat Rooms:** Create and join multiple chat rooms  
- **Responsive Design:** Optimized for both desktop and mobile devices  

---

## 🛠️ Technologies Used

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Real-Time Communication:** Socket.IO  
- **Authentication:** JSON Web Tokens (JWT), bcrypt  

---

## 🔐 Environment Setup

Create a `.env` file inside the `backend` directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NODE_ENV=development
