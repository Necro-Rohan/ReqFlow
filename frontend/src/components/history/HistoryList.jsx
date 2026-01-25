import HistoryItem from "./HistoryItem";

const HistoryList = ({ history, onDelete, onSelect }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-gray-400 text-sm">No requests yet.</p>
        <p className="text-xs text-gray-400 mt-2">
          Send a request to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          History
        </h2>
      </div>
      <div className="divide-y divide-gray-100">
        {history.map((item) => (
          <div
            key={item.id}
            className="group relative hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onSelect && onSelect(item)}
          >
            <HistoryItem
              item={item}
              onDelete={(id) => {
                onDelete(id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
