import { responseChatModel } from "../controllers/chatmodelcontroller";
import { Router } from "express";

const router = Router();

router.post("/chatmodel", responseChatModel);


export default router;
