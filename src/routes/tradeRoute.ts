import express from "express";
import multer from "multer";
import { uploadTrades, getBalances } from "../controllers/tradeController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadTrades);
router.post("/balance", getBalances);

export default router;
