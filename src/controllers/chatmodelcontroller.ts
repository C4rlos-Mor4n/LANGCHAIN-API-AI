import { Request, Response } from "express";
import { chatServices } from "../services/chatservices";

const chat = new chatServices();

export const responseChatModel = async (req: Request, res: Response) => {
  const { Question, Name, collectionName } = req.body;
  if (!Question || !Name) {
    return res.status(400).json({ message: "Requiere Question y Name" });
  }

  if (!collectionName) {
    return res.status(400).json({ message: "Requiere collectionName" });
  }

  const { Response } = await chat.runChatServices(
    Question,
    Name,
    collectionName
  );
  return res.status(200).json({ Response });
};
