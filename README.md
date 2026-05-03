🧑‍💻 devConnect

Backend-focused developer networking platform with real-time communication, secure authentication, and scalable API design.


🚀 Overview

devConnect is a production-style backend project demonstrating real-world backend engineering patterns including authentication, real-time systems, database design, security, and API architecture.

Built using Node.js and Express, with MongoDB for persistence and Socket.io for real-time communication. Deployed on AWS EC2 with Nginx as a reverse proxy.


🏗️ Architecture

Client → Nginx → Express (Node.js) → MongoDB Atlas
                  ↓
                Amazon SES



 ✨ Key Features

 🔐 Authentication & Security

* Stateless JWT authentication using HttpOnly cookies
* bcrypt password hashing with salting
* Protection against XSS, CSRF, and user enumeration
* Field-level update restrictions to prevent mass assignment
* Defense-in-depth validation (API-level + schema-level)

---

 ⚙️ API Design & Middleware

* Modular route architecture using `express.Router`
* Middleware-driven request lifecycle (auth, validation, error handling)
* Role-based authorization and protected routes
* Clean separation of concerns between routes, controllers, and middleware

---

 📡 Real-Time Communication

* WebSocket-based chat using Socket.io
* Persistent bidirectional communication
* Fallback to HTTP long-polling

---

 🤝 Connection System

* Send / accept / reject connection requests
* Duplicate request prevention using compound indexing
* Edge case handling (self-request, invalid IDs, duplicate requests)
* Relational querying using `ref` and `populate`

---

 📊 Smart Feed Algorithm

* Filters out:

  * Self
  * Existing connections
  * Pending/rejected users
* Pagination support (default: 10, max: 50)
* Returns only safe user fields (prevents sensitive data exposure)

---

 🗄️ Database Design

* MongoDB Atlas with Mongoose ODM
* Compound indexing for optimized queries
* Schema validation with custom validators
* Pre-save middleware for enforcing business rules
* Automatic timestamps (`createdAt`, `updatedAt`)
* `runValidators: true` to prevent invalid updates

---

 🛡️ Error Handling & Reliability

* Centralized error handling using try-catch in async routes
* Structured error responses with proper HTTP status codes
* Graceful handling of:

  * Validation errors
  * Duplicate key conflicts
  * Authentication failures

---

 📡 API Structure

### Auth

* POST `/signup`
* POST `/login`
* POST `/logout`

### Profile

* GET `/profile`
* PATCH `/profile`

### Connections

* POST `/request/send/:status/:userId`
* POST `/request/review/:status/:requestId`

### User

* GET `/user/feed`
* GET `/user/connections`
* GET `/user/requests/received`

---

 ⚙️ Deployment

* AWS EC2 (Ubuntu)
* Nginx reverse proxy (port forwarding to Node.js)
* MongoDB Atlas (cloud database)
* Amazon SES for transactional emails
* node-cron for background job scheduling

---

 🛠️ Tech Stack

* Node.js, Express.js
* MongoDB, Mongoose
* Socket.io
* JWT, bcrypt
* AWS EC2, Nginx, SES

---

 🎯 Summary

This project demonstrates:

* Scalable backend API design
* Secure authentication & authorization
* Real-time system implementation
* Efficient database querying & indexing
* Production-ready deployment practices
