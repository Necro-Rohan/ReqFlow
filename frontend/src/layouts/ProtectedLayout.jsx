import { Outlet, Navigate } from "react-router-dom";
// import Navbar from "../components/common/Navbar";
import Loader from "../components/common/Loader";
import { useEffect, useState } from "react";
import api from "../api/axios";

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    api
      .get("/user/profile")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* <Navbar /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
