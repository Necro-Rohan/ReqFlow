import history from "../models/history.js";

export const getApiHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const historyRecords = await history
      .find({ userId })
      .sort({ createdAt: -1 });
    return res.status(200).json({ history: historyRecords });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const getApiHistoryById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const recordId = req.params.id;
    const record = await history.findOne({ _id: recordId, userId });
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.status(200).json({ record });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

