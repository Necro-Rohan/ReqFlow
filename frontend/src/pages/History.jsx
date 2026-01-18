import { useEffect, useState } from "react";
import api from "../api/axios";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api
      .get("/history")
      .then((res) => setHistory(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2>History</h2>

      {history.map((item) => (
        <div key={item._id}>
          <p>
            {item.method} - {item.url}
          </p>
          <button onClick={() => api.delete(`/history/${item._id}`)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
