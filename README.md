  Apointix-AI 🏥
### AI-Powered Doctor Appointment & Clinical Decision System

![Tech Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20MySQL-blue)
![ML](https://img.shields.io/badge/ML-Scikit--learn-orange)
![Mobile](https://img.shields.io/badge/Mobile-React%20Native-61DAFB)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

> A full-stack, AI-integrated healthcare platform that streamlines doctor-patient interactions through intelligent appointment scheduling, clinical prediction, insurance connectivity, and real-time video consultations.

---

## 📸 Screenshots

### 🏠 Home Page
(<img width="1470" height="956" alt="Screenshot 2026-04-29 at 4 38 54 AM" src="https://github.com/user-attachments/assets/69d60feb-8d16-41b8-ae70-e4c1aaa80616" /># Apointix-AI 🏥)


### 🏥 Our Specialties
<img width="1470" height="956" alt="Screenshot 2026-04-29 at 4 39 01 AM" src="https://github.com/user-attachments/assets/4fb124d3-c42c-454d-a674-be05459af81a" />

### ✅ Why Choose Apointix
<img width="1470" height="956" alt="Screenshot 2026-04-29 at 4 39 07 AM" src="https://github.com/user-attachments/assets/b06b2944-5b81-4b18-844b-42f63dfca7de" />


### ℹ️ About Page
<img width="1470" height="956" alt="Screenshot 2026-04-29 at 4 39 18 AM" src="https://github.com/user-attachments/assets/d2ece697-e2e2-411a-ac0f-6071ebbd4629" />


### 📞 Contact Page
<img width="1470" height="956" alt="Screenshot 2026-04-29 at 4 39 23 AM" src="https://github.com/user-attachments/assets/fb00dd28-1025-4bb3-ac7b-a6f1e8cfe7db" />


### 🔐 Login Page
<img width="1470" height="956" alt="Screenshot 2026-04-29 at 4 39 28 AM" src="https://github.com/user-attachments/assets/efb47260-3bae-4b13-ac26-270f3ba6b245" />

### 📝 Signup Page
<img width="1470" height="956" alt="Screenshot 2026-04-29 at 4 39 33 AM" src="https://github.com/user-attachments/assets/2d8be925-b8d5-4862-83a1-401b12fb9b51" />


## 🚀 Features

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
git clone https://github.com/YOUR_USERNAME/Apointix-AI.git
cd Apointix-AI

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Set up Python ML environment
cd ../ml-module
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in `/server`:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=apointix
JWT_SECRET=your_jwt_secret
INSURANCE_API_KEY=your_insurance_api_key
```

### Run the Application

```bash
# Start backend server
cd server && npm start

# Start frontend
cd client && npm start

# Run ML prediction module
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
- 💼 [LinkedIn](https://linkedin.com/in/YOUR_LINKEDIN)
- 🐙 [GitHub](https://github.com/YOUR_GITHUB)

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
