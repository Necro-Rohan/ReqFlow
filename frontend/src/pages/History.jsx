import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HistoryList from "../components/history/HistoryList.jsx";
import HistoryDetails from "../components/history/HistoryDetails.jsx";
import ConfirmModal from "../components/common/ConfirmModal.jsx";
import ClearHistoryButton from "../components/history/ClearHistoryButton.jsx";
import Loader from "../components/common/Loader.jsx";
import {
  getHistory,
  deleteHistoryById,
  clearHistory,
  getHistoryById,
} from "../services/historyService";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedId = searchParams.get("id");
  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (selectedId) {
      loadSelectedDetails(selectedId);
    } else {
      setSelectedItem(null);
    }
  }, [selectedId]);

  const [selectedItem, setSelectedItem] = useState(null);

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setLoading(false);
    }
  };

  const loadSelectedDetails = async (id) => {
    try {
      const data = await getHistoryById(id);
      setSelectedItem(data);
    } catch (err) {
      console.error("Failed to load history details", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHistoryById(id);
      loadHistory();
      if (selectedId === id) {
        setSearchParams({});
      }
    } catch (err) {
      console.error("Failed to delete history", err);
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearHistory();
      loadHistory();
      setIsModalOpen(false);
      setSearchParams({});
    } catch (err) {
      console.error("Failed to clear history", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* List Column */}
        <div
          className={`lg:col-span-1 h-full mt-3 flex flex-col ${selectedId ? "hidden lg:flex" : "flex"}`}
        >
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              History
            </h1>
            {history.length > 0 && (
              <ClearHistoryButton onClear={() => setIsModalOpen(true)} />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-1">
            <HistoryList
              history={history}
              onDelete={handleDelete}
              onSelect={(item) => setSearchParams({ id: item.id })}
            />
            {loading && (
              <div className="flex justify-center items-center py-8">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Details Column */}
        <div
          className={`lg:col-span-2 h-full bg-white lg:bg-transparent ${selectedId ? "flex" : "hidden lg:flex"} flex-col`}
        >
          {selectedItem ? (
            <HistoryDetails
              item={selectedItem}
              onClose={() => setSearchParams({})}
            />
          ) : (
            <div className="hidden lg:flex items-center justify-center h-full border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-400 text-sm">
                Select an item to view details
              </p>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleClearHistory}
        title="Clear History"
        message="Are you sure you want to clear your entire request history? This action cannot be undone."
      />
    </div>
  );
};

export default History;
