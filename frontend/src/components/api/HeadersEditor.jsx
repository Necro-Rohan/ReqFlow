import { X } from "lucide-react";
const HeadersEditor = ({ headers, setHeaders }) => {
  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Headers
        </div>
        <button
          onClick={addHeader}
          type="button"
          className="text-xs font-medium text-blue-600 hover:text-blue-500"
        >
          + Add Header
        </button>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-64">
        {headers.map((header, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Key"
              value={header.key}
              onChange={(e) => updateHeader(index, "key", e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Value"
              value={header.value}
              onChange={(e) => updateHeader(index, "value", e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
            <button
              onClick={() => removeHeader(index)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove header"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {headers.length === 0 && (
          <div className="text-sm text-gray-500 italic text-center py-4 border border-dashed border-gray-300 rounded-md">
            No headers added
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadersEditor;
