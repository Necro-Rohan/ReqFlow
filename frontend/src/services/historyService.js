import api from "../api/axios";

const mapHistoryItem = (item) => ({
  id: item._id,
  timestamp: item.createdAt,
  request: {
    method: item.method,
    url: item.url,
    headers: item.headers
      ? Object.entries(item.headers).map(([key, value]) => ({ key, value }))
      : [],
    body: item.body ? JSON.stringify(item.body, null, 2) : null,
  },
  response: {
    status: item.statusCode,
    time: item.timeTaken,
    data: item.response?.body,
    headers: item.response?.headers,
  },
});

export const getHistory = async () => {
  const response = await api.get("/history");
  return response.data.history.map(mapHistoryItem);
};

export const getHistoryById = async (id) => {
  const response = await api.get(`/history/${id}`);
  return mapHistoryItem(response.data.record);
};

export const clearHistory = async () => {
  const response = await api.delete("/history");
  return response.data;
};

export const deleteHistoryById = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};
