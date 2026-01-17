import history from "../models/history.js";

export const getApiHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log(userId);
    const historyRecords = await history
      .find({ userId })
      .sort({ createdAt: -1 });
    return res.status(200).json({ history: historyRecords });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getApiHistoryById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const recordId = req.params.id;
    // console.log(userId, recordId);
    const record = await history.findOne({ _id: recordId, userId });
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.status(200).json({ record });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteApiHistoryById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const recordId = req.params.id;
    const record = await history.findOneAndDelete({ _id: recordId, userId });
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}


export const clearApiHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    await history.deleteMany({ userId });
    return res.status(200).json({ message: "All history cleared successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};