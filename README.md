# CampusNotes – Notes Sharing Platform

CampusNotes is a full-stack web application that enables university students to upload, manage, and share academic notes. The platform features secure authentication, advanced search filters, an admin dashboard, and user interaction tools.

---

## Features

* **Google OAuth Login**
  Secure authentication using Google accounts.

* **Notes Upload & Management**
  Users can upload, update, delete, and download notes in PDF format.

* **Advanced Filtering**
  Easily filter notes by college, course, semester, and subject.

* **Like, Comment, and Save**
  Interactive features to like, save, and comment on notes.

* **Admin Panel**
  Admin dashboard for verifying notes and managing users.

* **Download Tracking**
  Tracks how often notes are downloaded for usage analytics.

---
Live : https://campusnotes-amh9.onrender.com/
---

## Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** Google OAuth
* **File Storage:** Cloudinary

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/CampusNotes.git
   cd CampusNotes
   ```

2. **Install frontend dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd ../api
   npm install
   ```

4. **Create `.env` files** in the root of the client and server with your environment variables:

   * MongoDB URI
   * Google OAuth Client ID and Secret
   * Cloudinary API Key and Secret

5. **Run the backend**

   ```bash
   npm start
   ```

6. **In a separate terminal, run the frontend**

   ```bash
   cd ../client
   npm start
   ```

---

## Folder Structure

```
CampusNotes/
├── client/          # React frontend
├── api/          # Express backend
├── .env             # Environment variables (not committed)
└── README.md
```

---

## Author



---
Bhavishya Parmar
Email : parmarbhavishya@gmail.com

