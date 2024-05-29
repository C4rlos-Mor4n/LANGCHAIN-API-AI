import { Router } from "express";
import {
  handleUpload,
  uploadPromptDocument,
} from "../controllers/promptcontroller";

const router = Router();

router.post("/savePrompt", uploadPromptDocument, handleUpload);

export default router;
