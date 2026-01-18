import api from "../api/axios";

export const getHistory = () => api.get("/history");
export const getHistoryById = (id) => api.get(`/history/${id}`);
export const deleteHistoryById = (id) => api.delete(`/history/${id}`);
export const clearHistory = () => api.delete("/history");
