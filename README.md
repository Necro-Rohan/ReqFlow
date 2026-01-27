# ReqFlow

Modern full-stack API testing and management application.

## Overview

A robust Single-Page Application (SPA) built with the MERN stack, designed to streamline the API testing process. It allows developers to send HTTP requests, analyze real-time responses, and manage request history with a secure, user-friendly interface.

**Current status**: Production-ready monolithic deployment (Frontend served via Backend) with automated uptime monitoring.

## Features

* **API Testing Interface**: Support for GET, POST, PUT, DELETE, and PATCH requests
* **Real-Time Analysis**: Instant visualization of response status, time, size, and JSON body
* **History Management**: Automatically records request history with search and delete capabilities
* **Secure Authentication**: Complete user system (Login/Register) using JWT and HttpOnly cookies
* **Profile Management**: User settings for updating credentials and personal information
* **Responsive Design**: Fully optimized layout for desktop and mobile devices
* **Unified Deployment**: Configured for seamless single-server deployment on Render

## Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Framework** | React 18 | Component model & UI |
| **Build Tool** | Vite | Fast dev server & optimized builds |
| **Styling** | Tailwind CSS | Utility-first CSS workflow |
| **Icons** | Lucide React | Consistent, tree-shakeable icons |
| **Network** | Axios | HTTP client for API requests |
| **Backend** | Node.js + Express | RESTful API & static file serving |
| **Database** | MongoDB | Persistent storage for users & history |
| **Validation** | Zod | Schema validation for inputs |
| **DevOps** | GitHub Actions | Automated uptime monitoring (Cron) |

## Getting Started

### Prerequisites

* Node.js ≥ 18.17
* npm ≥ 9 (or pnpm / yarn)
* MongoDB (Local or Atlas)

### Development

```bash
# Clone repository
git clone https://github.com/necro-rohan/reqflow.git
cd reqflow

# Frontend Setup
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173

```

## Backend

```bash
# Open a new terminal
cd backend

# Setup Environment Variables (.env)
# PORT=3000
# MONGO_URI=your_mongo_url
# JWT_SECRET=your_secret
# CLIENT_URL=http://localhost:5173

npm install
npm run dev
# Server runs on http://localhost:3000

```

## 🚀 Deployment (Render)

This project is optimized for deployment on **Render** as a single web service.

### 1. Create a New Web Service

Connect your GitHub repository to Render and select "New Web Service".

### 2. Settings

Use the following configuration to build both frontend and backend:

* **Runtime**: Node
* **Build Command**:
```bash
cd frontend && npm install && npm run build && cd ../backend && npm install

```


* **Start Command**:
```bash
cd backend && npm start

```



### 3. Environment Variables

Add these in the "Environment" tab on Render:

| Key | Value | Description |
| --- | --- | --- |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `(random string)` | Secret key for signing tokens |
| `VITE_API_BASE_URL` | `/api` | **Crucial:** Ensures frontend uses the same domain |
| `PORT` | `3000` | Define the port for localhost |
|`CLIENT_URL` | `http://localhost:5173` | Define vite url for localhost setup | 

## Uptime Monitor

This repository includes a GitHub Action (`.github/workflows/uptime.yml`) to keep the free-tier Render service awake during specified hours.

* **Location**: `.github/workflows/uptime.yml`
* **Configuration**: Update the `curl` URL in the workflow file to your deployed Render URL.
