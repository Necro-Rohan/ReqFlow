import { Trash2 } from "lucide-react";
const HistoryItem = ({ item, onDelete }) => {
  const { request, response, timestamp, id } = item;

  const getMethodColor = (m) => {
    switch (m) {
      case "GET":
        return "text-blue-600";
      case "POST":
        return "text-green-600";
      case "PUT":
        return "text-orange-600";
      case "DELETE":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (s) => {
    if (s >= 200 && s < 300) return "text-green-600";
    if (s >= 400) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="px-4 py-3 flex items-start gap-3">
      <div
        className={`text-xs font-bold pt-0.5 w-10 ${getMethodColor(request.method)}`}
      >
        {request.method}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm text-gray-900 truncate font-medium"
          title={request.url}
        >
          {request.url}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {response && (
            <span className={`text-xs ${getStatusColor(response.status)}`}>
              {response.status}
            </span>
          )}
          <span className="text-xs text-gray-400">
            •{" "}
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(id);
        }}
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-all"
        title="Delete"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HistoryItem;
