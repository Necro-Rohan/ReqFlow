import { useState } from "react";
import { SquareTerminal } from "lucide-react";

const Response = ({ response, error }) => {
  const [activeTab, setActiveTab] = useState("body");

  if (error) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 bg-red-50 border-b border-red-200 text-red-700 rounded-t-lg">
          <h3 className="text-sm font-bold mb-1">Error</h3>
          <p className="text-sm font-mono">
            {error.message || "Something went wrong"}
          </p>
        </div>
        <div className="flex-1 bg-white border-l border-r border-b border-gray-200 rounded-b-lg"></div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="h-full flex flex-col justify-center items-center text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <SquareTerminal className="h-14 w-14 text-gray-300 mb-4" />
        <p className="text-gray-500 text-sm">Response will appear here</p>
      </div>
    );
  }

  const { status, time, size, data, headers } = response;

  const responseHeaders = headers ? Object.entries(headers) : [];

  const cookies = [];

  const getStatusColor = (s) => {
    if (s >= 200 && s < 300) return "text-green-600";
    if (s >= 300 && s < 400) return "text-blue-600";
    if (s >= 400 && s < 500) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Status Info */}
      <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-200 bg-gray-50">
        <span className="text-xs text-gray-600">
          Status:{" "}
          <span className={`font-semibold ${getStatusColor(status)}`}>
            {status} {response.statusText}
          </span>
        </span>
        <span className="text-xs text-gray-600">
          Time: <span className="font-semibold text-gray-800">{time}ms</span>
        </span>
        <span className="text-xs text-gray-600">
          Size: <span className="font-semibold text-gray-800">{size} B</span>
        </span>
      </div>

      {/* Tabs */}
      <div className="px-4 border-b border-gray-200 bg-white">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab("body")}
            className={`pb-2 pt-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "body"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Body
          </button>
          <button
            onClick={() => setActiveTab("cookies")}
            className={`pb-2 pt-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "cookies"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Cookies{" "}
            <span className="ml-1 text-xs text-gray-500">
              ({cookies.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab("headers")}
            className={`pb-2 pt-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "headers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Headers{" "}
            <span className="ml-1 text-xs text-gray-500">
              ({responseHeaders.length})
            </span>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative bg-white">
        {activeTab === "body" && (
          <pre className="p-4 text-xs font-mono text-gray-800 whitespace-pre-wrap break-all leading-normal">
            {typeof data === "object" ? JSON.stringify(data, null, 2) : data}
          </pre>
        )}

        {activeTab === "cookies" && (
          <div className="p-4">
            {cookies.length === 0 ? (
              <div className="text-sm text-gray-500 italic text-center py-8">
                No visible cookies
              </div>
            ) : (
              <table className="w-full text-left text-xs text-gray-700">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2">Name</th>
                    <th className="py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Cookies list */}
                  {cookies.map((cookie, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 font-semibold text-gray-600 w-1/3 break-all">
                        {cookie.name}
                      </td>
                      <td className="py-2 px-4 text-gray-800 break-all">
                        {cookie.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "headers" && (
          <div className="p-0">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-gray-100">
                {responseHeaders.map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="py-2 px-4 font-semibold text-gray-600 w-1/3 break-all">
                      {key}
                    </td>
                    <td className="py-2 px-4 text-gray-800 break-all">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Response;
