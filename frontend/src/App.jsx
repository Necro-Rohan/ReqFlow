import { useEffect } from 'react'
import api from './api/axios.js';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  useEffect(() => {
    api.get("/").then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error("API call error:", err);
    });
  })
  return (
    <>
      <p className="text-3xl font-bold underline">
        Frontend Application for ReqFlow
      </p>
    </>
  )
}

export default App
