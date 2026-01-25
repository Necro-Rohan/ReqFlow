import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

const HistoryDetails = ({ item, onClose }) => {
  const navigate = useNavigate();
  if (!item) return null;

  const { request, response } = item;

  const handleRunAgain = () => {
    navigate("/test", { state: { request } });
  };

  return (
    <div className="fixed inset-0  bg-white sm:static sm:z-auto sm:bg-transparent h-full flex flex-col pt-16 sm:pt-0">
      {/* Mobile close button */}
      <div className="sm:hidden p-4 border-b border-gray-200 flex justify-between items-center bg-white">
        <h3 className="font-bold text-gray-900">Request Details</h3>
        <button onClick={onClose} className="text-gray-500 p-2">
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 ">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Request
            </h3>
            <button
              onClick={handleRunAgain}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors"
              title="Run this request again in API Tester"
            >
              <Play size={12} className="fill-current" />
              Run Again
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex gap-2 mb-2">
              <span className="font-bold text-gray-900">{request.method}</span>
              <span className="text-gray-600 break-all">{request.url}</span>
            </div>
            {request.headers && request.headers.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  Headers
                </p>
                <div className="space-y-1">
                  {request.headers.map((h, i) => (
                    <div key={i} className="text-xs text-gray-700">
                      <span className="font-medium">{h.key}:</span> {h.value}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {request.body && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">Body</p>
                <pre className="text-xs bg-white p-2 rounded border border-gray-200 overflow-x-auto">
                  {request.body}
                </pre>
              </div>
            )}
          </div>
        </div>

        {response && (
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Response
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex gap-4 mb-3 text-sm">
                <span
                  className={`font-semibold ${response.status >= 400 ? "text-red-600" : "text-green-600"}`}
                >
                  Status: {response.status}
                </span>
                <span className="text-gray-500">Time: {response.time}ms</span>
              </div>
              <pre className="text-xs font-mono text-gray-800 bg-white p-3 rounded border border-gray-200 overflow-auto max-h-100">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryDetails;
