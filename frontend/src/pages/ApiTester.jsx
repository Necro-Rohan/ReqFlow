import { useState } from "react";
import api from "../api/axios";

export default function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await api.post("/test", {
        method,
        url,
        headers: {},
        body: {},
      });

      setResponse(res.data);
    } catch (err) {
      console.error("API request error:", err);
      setResponse({ error: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>API Tester</h2>

      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>

      <input
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={sendRequest}>Send</button>

      {loading && <p>Loading...</p>}
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
