import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ApiTester from "./pages/ApiTester";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ProtectedLayout from "./layouts/ProtectedLayout";
// import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    // <AuthProvider>
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
    // </AuthProvider>
  );
}

export default App;

