# Sangillence Backend

A role-based backend system built using **Node.js**, **Express**, **Prisma**, and **PostgreSQL**, implementing secure authentication and authorization using **JWT**.

The backend supports three roles:
- **Admin**
- **Organizer**
- **Attender**

Each role has specific permissions and access control.

---

## 🚀 Deployed Backend

**Base URL:**
```
https://sangillence-backend.onrender.com/
```

> ⚠️ Note: This backend is deployed on **Render Free Tier**.  
> The first API request may take **30–60 seconds** due to cold start.

---

## 🛠️ Tech Stack

- Backend: Node.js, Express.js  
- Database: PostgreSQL (Neon)  
- ORM: Prisma  
- Authentication: JWT (JSON Web Token)  
- Password Hashing: bcrypt  
- Deployment: Render  
- API Testing: Postman  

---

## 👥 User Roles & Permissions

### 🔑 Admin
- Login
- Register organizers
- View all organizers
- View all attenders
- Delete organizers
- Delete attenders

### 📋 Organizer
- Login
- Register attenders
- View their own attenders
- Create events

### 🎫 Attender
- Login
- View events created by their organizer only

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-Based Access Control (RBAC)
- Protected routes using middleware
- JWT token must be sent in headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📂 Project Structure

```
src/
├── controllers/
│   ├── admin.controller.js
│   ├── organizer.controller.js
│   └── attender.controller.js
├── routes/
│   ├── admin.routes.js
│   ├── organizer.routes.js
│   └── attender.routes.js
├── middlewares/
│   ├── auth.middleware.js
│   └── role.middleware.js
├── prisma/
│   ├── schema.prisma
│   └── client.js
├── utils/
│   └── jwt.js
├── app.js
└── server.js
```

---

## 📌 API Endpoints

### 🔹 Admin APIs

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/admin/login` | Admin login |
| POST | `/admin/register-organizer` | Create organizer |
| GET | `/admin/organizers` | Get all organizers |
| GET | `/admin/attenders` | Get all attenders |
| DELETE | `/admin/organizer/:id` | Delete organizer |
| DELETE | `/admin/attender/:id` | Delete attender |

---

### 🔹 Organizer APIs

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/organizer/login` | Organizer login |
| POST | `/organizer/register-attender` | Register attender |
| GET | `/organizer/attenders` | View own attenders |
| POST | `/organizer/event` | Create event |

---

### 🔹 Attender APIs

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/attender/login` | Attender login |
| GET | `/attender/events` | View events |

---

## 🧪 API Testing (Postman)

A complete **Postman collection** is provided.

### Steps to Test:
1. Import the Postman collection
2. Create a Postman environment
3. Set:
   ```
   base_url = https://sangillence-backend.onrender.com/
   ```
4. Run APIs in this order:
   1. Admin Login
   2. Admin Register Organizer
   3. Organizer Login
   4. Organizer Register Attender
   5. Organizer Create Event
   6. Attender Login
   7. Attender View Events

---

## ⚙️ Environment Variables

```
DATABASE_URL=postgresql://neondb_owner:npg_f6jxy7RAitdb@ep-green-glade-addlck08-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=supersecretkey
PORT=5000
```

---

## ▶️ Run Locally

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

## 🧠 Key Highlights

- Secure authentication using JWT
- Role-based access control (Admin / Organizer / Attender)
- Clean separation of concerns
- Prisma ORM with PostgreSQL
- Production-ready deployment
- Fully tested APIs using Postman

---

## 🏁 Status

✅ All task requirements implemented  
✅ Backend deployed  
✅ APIs tested and working  

---

## 👤 Author

**Dev Agarwal**  
B.Tech – Information Technology  
Backend Developer
