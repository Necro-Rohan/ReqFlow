import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration.jsx";
import ApiTester from "./pages/ApiTester.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Navigate to="/test" replace />} />
          <Route path="/test" element={<ApiTester />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

