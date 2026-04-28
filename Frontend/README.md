# Apointix-AI 🏥
### AI-Powered Doctor Appointment & Clinical Decision System

![Tech Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20MySQL-blue)
![ML](https://img.shields.io/badge/ML-Scikit--learn-orange)
![Mobile](https://img.shields.io/badge/Mobile-React%20Native-61DAFB)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

> A full-stack, AI-integrated healthcare platform that streamlines doctor-patient interactions through intelligent appointment scheduling, clinical prediction, insurance connectivity, and real-time video consultations.

---

## � Screenshots

| Home Page | Dashboard | Appointment Booking |
|---|---|---|
| ![Home](screenshots/home.png) | ![Dashboard](screenshots/dashboard.png) | ![Booking](screenshots/booking.png) |

| Admin Panel | Doctor Profile | ML Prediction |
|---|---|---|
| ![Admin](screenshots/admin.png) | ![Doctor](screenshots/doctor.png) | ![Prediction](screenshots/prediction.png) |

---

## �🚀 Features

| Feature | Description |
|---|---|
| 🤖 AI Clinical Prediction | ML-based breast cancer detection using Logistic Regression on the Wisconsin dataset |
| 📅 Smart Scheduling | Conflict-free appointment booking, rescheduling & cancellation with optimized MySQL queries |
| 🔐 Role-Based Access Control | Separate secure dashboards for Patients, Doctors, and Admins |
| 📱 Native Mobile App | Built with React Native for seamless cross-platform experience |
| 🌍 Multilingual Support | Multi-language interface for wider accessibility |
| 🏥 Live Insurance API | Real-time insurance connectivity for eligibility checks |
| 🎥 Video Consultation | Integrated video consultation infrastructure for remote care |
| 🔒 Secure Auth | Session-based authentication with data privacy across all roles |

---

## 🧠 AI & ML Components

- **Clinical Prediction Module** — Logistic Regression model trained on the Wisconsin Breast Cancer benchmark dataset with Scikit-learn pipelines, minimizing false negatives for safer predictions
- **Intelligent Slot Management** — Backend scheduling logic that detects and prevents booking conflicts in real time
- **Data Pipelines** — Structured for AI-assisted availability prediction and scheduling pattern analysis
- **Extensible Architecture** — Modular backend hooks designed for future NLP-based symptom triage and AI-powered doctor-patient matching

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Web)
- React Native (Mobile)
- HTML5, CSS3, JavaScript

**Backend**
- Node.js + Express.js
- RESTful API Architecture
- Role-Based Access Control (RBAC)

**Database**
- MySQL — appointment scheduling, conflict resolution, patient & doctor records
- Optimized queries for high-performance data retrieval

**AI / ML**
- Python, Scikit-learn, Pandas, NumPy
- Logistic Regression (Wisconsin Breast Cancer Dataset)

**Integrations**
- Live Insurance API
- Video Consultation Infrastructure
- Multilingual Support Layer

---

## 📁 Project Structure


```
Apointix/
├── Backend/                    # Node.js + Express.js server
│   ├── db.js                   # MySQL database connection
│   ├── .env                    # Environment variables
│   ├── .env.example            # Environment variable template
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json             # Vercel deployment config
│
├── Frontend/                   # React.js web app (Vite)
│   ├── src/                    # React components & pages
│   ├── public/                 # Static assets
│   ├── dist/                   # Production build output
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── .env.local              # Local environment variables
│   ├── .env.production.local   # Production environment variables
│   ├── .gitignore
│   ├── package.json
│   └── vercel.json             # Vercel deployment config
|
│── ml-module/               # Python ML prediction module
│   ├── model/               # Trained Logistic Regression model
│   ├── predict.py           # Prediction API
│   └── dataset/             # Wisconsin Diabetes dataset
|
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MySQL 8.0+
- Python 3.9+
- npm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/anushkajha567/Apointix-AI.git
cd Apointix-AI

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install

# Set up Python ML environment
cd ../ml-module
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in `/Backend`:

```env
DB_HOST=mysql-185af5e1-abhay13042003-a07.a.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=AVNS_2g2K3dndYcn4VOgyNvP
DB_NAME=defaultdb
DB_PORT=20691
PORT=5000
FRONTEND_URL=https://varcel-frontend-zswz.vercel.app
GEMINI_API_KEY=your_gemini_api_key
```

Create `.env.local` in `/Frontend`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Run the Application

```bash
# Start backend server
cd Backend && npm start

# Start frontend (in another terminal)
cd Frontend && npm run dev

# Run ML prediction module (in another terminal)
cd ml-module && python predict.py
```

---

## 📊 ML Model Performance

| Metric | Score |
|---|---|
| Model | Logistic Regression |
| Dataset | Wisconsin Breast Cancer (UCI) |
| Precision | High (minimized false negatives) |
| Framework | Scikit-learn |

> ⚠️ Note: The model was trained on publicly available benchmark data. Larger, institution-specific clinical datasets would further improve reliability and generalizability.

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Patient / Doctor registration |
| POST | `/api/auth/login` | Secure login with session |
| GET | `/api/appointments` | Fetch available slots |
| POST | `/api/appointments/book` | Book an appointment |
| PUT | `/api/appointments/reschedule` | Reschedule booking |
| DELETE | `/api/appointments/cancel` | Cancel appointment |
| POST | `/api/predict` | ML clinical prediction |
| GET | `/api/insurance/check` | Live insurance eligibility |

---

## 🔮 Roadmap

- [ ] NLP-based symptom triage chatbot (LangChain integration)
- [ ] AI-powered doctor-patient matching algorithm
- [ ] Institution-specific ML model retraining pipeline
- [ ] Push notifications for appointment reminders
- [ ] EHR (Electronic Health Record) integration

---

## 👩‍💻 Author

**Anushka Jha**
- 📧 anushkajha567@gmail.com
- � [GitHub](https://github.com/anushkajha567)
- 🚀 [Live Demo](https://varcel-frontend-zswz.vercel.app/)

---

## 📄 Research

This project is being documented as a research paper with IEEE formatting, exploring AI integration in healthcare appointment systems.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you found this project helpful, please give it a star!



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
