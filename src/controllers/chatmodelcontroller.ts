import { Request, Response } from "express";
import { chatServices } from "../services/chatservices";

const chat = new chatServices();

export const responseChatModel = async (req: Request, res: Response) => {
  const { Question, Name, collectionName, PromptName, History } = req.body;
  if (!Question || !Name || !collectionName || !PromptName || !History) {
    return res.status(400).json({
      message:
        "Requiere el campo Question, Name, collectionName, PromptName y History",
    });
  }

  const { Response } = await chat.runChatServices(
    Question,
    Name,
    collectionName,
    PromptName,
    History
  );

  return res.status(200).json({ Response });
};
