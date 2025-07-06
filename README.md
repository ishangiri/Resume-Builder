# 💼 AI Resume Builder

A modern, AI-powered resume builder built with **React + TypeScript + Vite**, designed for speed, flexibility, and beautiful resume exports. Users can generate resumes with AI, customize templates, and download polished PDFs — all in one seamless UI.

## 🚀 Live Demo

👉  https://resume-builder-ishan-giris-projects.vercel.app/  
⚠️ *Note: First-time load may take up to 50 seconds due to free-tier hosting (cold start).*

---

## 🧠 Key Features

- 🔐 **Authentication** with Firebase (email & password login)
- 🧠 **AI-powered resume generation** using OpenAI API
- 🧾 **Multiple dynamic resume templates** (React components)
- 💾 **Save/Edit/Delete resumes** (PostgreSql)
- 📤 **Export to PDF** via server-rendered HTML in mobile browsers and via reacttoprint in web browsers
- 🧭 **Responsive UI** with React and TailwindCSS
- ⚛️ **Global state management** with Zustand
- ⚡ Built with **Vite** + **TypeScript** + **React** + **Tanstack Query** + **Tanstack Router**

---

## 🧱 Tech Stack

| Frontend       | Backend          |      AI & Hosting      |
|----------------|------------------|------------------------|
| React + Vite   | FastAPI (Python) |    OpenAI (GPT-4)      |
| TypeScript     | Pydantic         |    Puppeteer (PDF Gen) |
| Zustand (Store) | Uvicorn         |   Firebase Hosting/Auth|
| TailwindCSS     |         


---

## 🛠️ Getting Started

### 1. Clone the Repo


git clone https://github.com/your-username/ai-resume-builder.git


### 2. create your .env files with these required fields.

for server

OPENAI_API_KEY


DATABASE_URL


for frontend and auth
VITE_FIREBASE_MEASUREMENTID

VITE_FIREBASE_APPID

VITE_FIREBASE_MESSENGERID

VITE_FIREBASE_STORAGE_BUCKET

VITE_FIREBASE_PROJECT_ID

VITE_FIREBASE_AUTHDOMAIN

VITE_FIREBASE_API_KEY

VITE_API_URL

VITE_PDF_URL


### 3. run your project

npm run dev

cd server

fastapi run main.py --reload




