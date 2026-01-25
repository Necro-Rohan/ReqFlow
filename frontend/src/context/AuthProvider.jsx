import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.js";
import {getProfile, login as apiLogin, logout as apiLogout, register as apiRegister} from "../services/authService.js";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getProfile();
        setUser(userData.user);
        // console.log(userData);
      } catch (err) {
        console.log("Not logged in", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const register = async (name, email, password) => {
    const data = await apiRegister(name, email, password);
    setUser(data.user);
    return data;
  };

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


