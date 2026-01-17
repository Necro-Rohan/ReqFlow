import express from "express";
import { getApiHistory, getApiHistoryById, deleteApiHistoryById, clearApiHistory } from "../controllers/historyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getApiHistory);
router.get("/:id", authMiddleware, getApiHistoryById);
router.delete("/:id", authMiddleware, deleteApiHistoryById);
router.delete("/", authMiddleware, clearApiHistory);

export default router;