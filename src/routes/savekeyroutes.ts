import { Router } from "express";
import { saveKey } from "../controllers/savekeycontroller";

const router = Router();

router.post("/add", saveKey);

export default router;
