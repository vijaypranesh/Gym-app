# 🏋️‍♂️ Gym Tracker App

A full-stack, 3-tier Gym Tracker web application for logging and tracking workouts. This can be used for Devops Projects Demo.

---

## Features
- User registration and login (JWT authentication)
- Secure password hashing (bcryptjs)
- Log workout activities (activity type, start/end time)
- View workout history in a modern, tabular dashboard
- Personalized dashboard with username greeting
- Responsive, gym-themed UI

---

## Tech Stack
- **Frontend:** React (Vite), CSS
- **Backend:** Node.js, Express, JWT, bcryptjs
- **Database:** MongoDB (Mongoose)
- **Containerization:** Docker, Docker Compose

---

## Folder Structure
```
gym-tracker-app/
├── backend/      # Express server, routes, models, middleware
│   ├── src/
│   │   ├── models/      # Mongoose schemas (User, Workout)
│   │   ├── routes/      # API routes (auth, workouts)
│   │   ├── middleware/  # JWT auth middleware
│   │   └── server.js    # Main server entry
│   ├── Dockerfile       # Backend Dockerfile
│   └── .env             # Environment variables (MONGO_URI, JWT_SECRET, PORT)
├── frontend/     # React app (Vite)
│   ├── src/
│   │   ├── pages/       # Login, Register, Dashboard
│   │   ├── assets/      # Images (logo, background)
│   │   ├── App.jsx      # Main app logic
│   │   └── App.css      # Styles
│   ├── Dockerfile       # Frontend Dockerfile
│   └── ...              # Vite config, package.json, etc.
├── docker-compose.yml   # Orchestrates all services
```

---

## Setup & Usage

### 1. **Start MongoDB (Standalone/Dev Only)**
```bash
sudo systemctl start mongod      # Start MongoDB
sudo systemctl stop mongod       # Stop MongoDB
systemctl status mongod          # Check MongoDB status
```

### 2. **Backend (Standalone/Dev Only)**
```bash
cd backend
npm install         # Install dependencies (first time only)
npm run dev         # Start Express server (http://localhost:5000)
```

### 3. **Frontend (Standalone/Dev Only)**
```bash
cd frontend
npm install         # Install dependencies (first time only)
npm run dev         # Start Vite dev server (http://localhost:5173)
```

### 4. **.env Example (backend/.env)**
```
MONGO_URI=mongodb://localhost:27017/gymtracker
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

---

## Docker & Docker Compose (Recommended for Production or Easy Local Setup)

### **Containerized Architecture**
- **mongo:** MongoDB database (data persisted in a Docker volume)
- **backend:** Node.js/Express API (connects to MongoDB via Docker network)
- **frontend:** React app (built and served by nginx)

### **How to Run Everything with Docker Compose**

1. **Build and start all containers:**
   ```bash
   docker-compose up --build
   ```
   - Frontend: http://localhost:3000
   - Backend:  http://localhost:5000
   - MongoDB:  localhost:27017 (for dev tools)

2. **Stop all containers:**
   ```bash
   docker-compose down
   ```

3. **(Optional) Remove all data:**
   ```bash
   docker-compose down -v
   ```

---

## API Endpoints
- `POST   /api/auth/register` — Register a new user
- `POST   /api/auth/login`    — Login and receive JWT
- `GET    /api/auth/me`       — Get current user info (requires JWT)
- `POST   /api/workouts`      — Log a new workout (requires JWT)
- `GET    /api/workouts`      — Get workout history (requires JWT)

---

## Demo Flow
1. Register a new user
2. Login with your credentials
3. Log workouts (activity, start/end time)
4. View workout history in a stylish table
5. Logout when done

---

## Presentation Tips
- Show the login/register flow and the themed UI
- Demonstrate logging a workout and seeing it in the table
- Point out the username greeting and secure, modern stack
- Mention the clean separation of backend/frontend and RESTful API
- Highlight Docker Compose for easy deployment and scaling

---

## License
MIT 
