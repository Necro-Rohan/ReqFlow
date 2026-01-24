import api from "../api/axios";

export const testApi = async (request) => {
  const { method, url, headers, body } = request;

  const headersObj = {};
  if (headers && Array.isArray(headers)) {
    headers.forEach((h) => {
      if (h.key) headersObj[h.key] = h.value;
    });
  }

  const response = await api.post("/test", {
    method,
    url,
    headers: headersObj,
    body: body ? JSON.parse(body) : undefined, // Ensuring body is object
  });

  // Backend returns: { status, headers, body, timeTaken, responseSize }
  return {
    status: response.data.status,
    statusText: response.statusText, 
    headers: response.data.headers,
    data: response.data.body,
    time: response.data.timeTaken,
    size: response.data.responseSize,
  };
};
