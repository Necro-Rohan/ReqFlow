import { useEffect } from 'react'
import api from './api/axios.js';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import ApiTester from "./pages/ApiTester.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  useEffect(() => {
    api.get("/").then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error("API call error:", err);
    });
  })
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<ApiTester />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App
