import { chatServices } from "../services/chatservices";
import { getOpenAIKey } from "../services/dbservice";
import { Request, Response } from "express";
import { config } from "../config";
import Queue from "queue-promise";
import Logger from "src/utils/logger";

const chat = new chatServices();
const logger = new Logger();

const queue = new Queue({
  concurrent: config.NUMBER_OF_REQUESTS as any,
  interval: 1000, // intervalo opcional entre trabajos
});

export const responseChatModel = async (req: Request, res: Response) => {
  const { Question, Name, collectionName, PromptName, History } = req.body;
  if (!Question || !collectionName || !PromptName || !History) {
    return res.status(400).json({
      message:
        "Requiere el campo Question, Name, collectionName, PromptName y History",
    });
  }

  const { apiKeyAnthropic, apiKeyOpenAI } = await getOpenAIKey(collectionName);

  if (!apiKeyAnthropic || !apiKeyOpenAI) {
    return res.status(400).json({
      message:
        "No se encontró la clave de API Anthropic o OpenAI para el proyecto",
    });
  }



  try {
    queue.enqueue(async () => {
      try {

        const { Response } = await chat.runChatServices(
          Question,
          Name,
          collectionName,
          PromptName,
          History,
          apiKeyOpenAI,
          "OpenAI"
        );
        logger.log(`Ussing OpenAI for ${collectionName}, ${PromptName}`);
        res.status(200).json({ Response });
      } catch (error) {
        const { Response } = await chat.runChatServices(
          Question,
          Name,
          collectionName,
          PromptName,
          History,
          apiKeyAnthropic,
          "Anthropic"
        );
        logger.log(`Ussing Anthropic for ${collectionName}, ${PromptName}`);
        res.status(200).json({ Response });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Error procesando la solicitud en la cola",
      error: err.message,
    });
  }
};
