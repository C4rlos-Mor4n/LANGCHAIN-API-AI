import { Request, Response } from "express";
import { chatServices } from "../services/chatservices";
import { getOpenAIKey } from "../services/dbservice";

const chat = new chatServices();

export const responseChatModel = async (req: Request, res: Response) => {
  const { Question, Name, collectionName, PromptName, History } = req.body;
  if (!Question || !Name || !collectionName || !PromptName || !History) {
    return res.status(400).json({
      message:
        "Requiere el campo Question, Name, collectionName, PromptName y History",
    });
  }

  const { apikey, apiKeyAnthropic, apiKeyOpenAI } = await getOpenAIKey(
    collectionName
  );

  if (!apiKeyAnthropic || !apiKeyOpenAI) {
    return res.status(400).json({
      message:
        "No se encontró la clave de API Anthropic o OpenAI para el proyecto",
    });
  }

  try {
    const { Response } = await chat.runChatServices(
      Question,
      Name,
      collectionName,
      PromptName,
      History,
      apiKeyAnthropic
    );

    return res.status(200).json({ Response });
  } catch (error) {
    const { Response } = await chat.runChatServices(
      Question,
      Name,
      collectionName,
      PromptName,
      History,
      apiKeyOpenAI
    );

    console.log("ESTO DA LA RESPUESTA", Response);

    return res.status(200).json({ Response });
  }
};
