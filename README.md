# 🤖 JARVIS - Offline AI Desktop Assistant

JARVIS is an offline AI-powered desktop assistant built with Electron, Node.js, Express, and Ollama. It is designed to provide a natural voice-based desktop experience similar to Iron Man's JARVIS while running completely on your local machine.

> 🚧 This project is currently under active development.

---

## ✨ Current Features

- 🖥️ Electron Desktop Application
- 🤖 Local AI using Ollama
- 💬 Qwen 3 1.7B Language Model
- 🔗 Express Backend API
- 🗣️ AI Voice Responses
- 📡 Offline AI Processing
- ⚡ Fast Local Inference
- 🧹 Clean AI Response Formatting

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Electron | Desktop Application |
| Node.js | Runtime |
| Express | Backend API |
| Ollama | Local AI Engine |
| Qwen 3 1.7B | Language Model |
| JavaScript | Application Logic |

---

## 📂 Project Structure

```
JARVIS/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── index.html
├── renderer.js
├── main.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/derconishant/JARVIS.git
```

### Install Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Start Ollama

Make sure Ollama is installed and running.

Pull the model:

```bash
ollama pull qwen3:1.7b
```

### Start Backend

```bash
cd backend
node server.js
```

### Start Desktop Application

```bash
npm start
```

---

## 📍 Project Roadmap

### ✅ Milestone 1
- Electron Desktop Application
- Express Backend
- Ollama Integration
- Qwen 3 1.7B
- Local AI Responses
- Voice Output

### 🔜 Milestone 2
- Voice Input
- Speech Recognition

### 🔜 Milestone 3
- Wake Word Detection

### 🔜 Milestone 4
- Computer Automation
- Open Applications
- File Management
- System Controls

### 🔜 Milestone 5
- Internet Services
- Weather
- News
- Web Search

### 🔜 Milestone 6
- Long-Term Memory
- User Preferences
- Reminders

### 🔜 Milestone 7
- Windows Integration
- Background Service
- System Tray

### 🔜 Milestone 8
- Installer
- Auto Updates
- Production Release

---

## 🎯 Vision

The goal of JARVIS is to become a fully offline desktop AI assistant capable of:

- Always listening for a wake word
- Understanding natural language
- Controlling Windows applications
- Answering questions using a local AI model
- Speaking responses naturally
- Running automatically in the background

---

## 📄 License

This project is currently intended for learning and personal development.