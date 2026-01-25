const ClearHistoryButton = ({ onClear }) => {
  return (
    <button
      onClick={onClear}
      className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
      title="Clear all history"
    >
      Clear All
    </button>
  );
};

export default ClearHistoryButton;
