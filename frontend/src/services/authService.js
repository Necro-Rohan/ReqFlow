import api from "../api/axios";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  // Token is handled by httpOnly cookie
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  // Token is handled by httpOnly cookie
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};
