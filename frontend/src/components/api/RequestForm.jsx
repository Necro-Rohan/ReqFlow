import { useState, useEffect } from "react";
import BodyEditor from "./BodyEditor";
import HeadersEditor from "./HeadersEditor";

const RequestForm = ({ onSend, loading, initialRequest }) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState([
    { key: "Content-Type", value: "application/json" },
  ]);
  const [body, setBody] = useState("");
  const [activeTab, setActiveTab] = useState("headers");

  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (initialRequest) {
      if ((initialRequest.method || "GET") !== method) {
        setMethod(initialRequest.method || "GET");
      }
      if ((initialRequest.url || "") !== url) {
        setUrl(initialRequest.url || "");
      }
      if ((initialRequest.body || "") !== body) {
        setBody(initialRequest.body || "");
      }

      let newHeaders = [{ key: "Content-Type", value: "application/json" }];
      if (initialRequest.headers && Array.isArray(initialRequest.headers)) {
        newHeaders = initialRequest.headers;
      } else if (
        initialRequest.headers &&
        typeof initialRequest.headers === "object"
      ) {
        const headerArray = Object.entries(initialRequest.headers).map(
          ([key, value]) => ({ key, value }),
        );
        if (headerArray.length) newHeaders = headerArray;
      }
      setHeaders(newHeaders);
    }
  }, [initialRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    const payload = {
      method,
      url,
      headers: headers.filter((h) => h.key && h.value),
      body,
    };

    onSend(payload);
  };

  return (
    <div className="space-y-6 w-full">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="block w-16 md:w-28 px-1 md:px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-gray-700"
        >
          {methods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/v1/..."
          required
          className="flex-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-2 md:px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Editors Editor and Body */}
      <div className="w-full">
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveTab("headers")}
              type="button"
              className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "headers"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Headers{" "}
              <span className="ml-1 text-xs bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full border border-gray-200">
                {headers.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("body")}
              type="button"
              className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "body"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Body
            </button>
          </nav>
        </div>

        <div className="min-h-[300px]">
          {activeTab === "headers" ? (
            <HeadersEditor headers={headers} setHeaders={setHeaders} />
          ) : (
            <BodyEditor value={body} onChange={setBody} />
          )}
        </div>
      </div>
    </div>
  );
};;

export default RequestForm;
