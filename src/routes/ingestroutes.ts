import { Router } from "express";
import {
  handleUpload,
  uploadIngestDocument,
} from "../controllers/ingestcontroller";

const router = Router();

router.post("/upload", uploadIngestDocument, handleUpload);

export default router;
