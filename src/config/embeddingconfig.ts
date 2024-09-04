import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { config } from "../config";
import Logger from "../utils/logger";

const logger = new Logger();

export function getEmbeddings(filename: string) {
  if (config.EMBEDDINGS === "embedding-001") {
    return new GoogleGenerativeAIEmbeddings({
      model: "embedding-001", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      apiKey: config.GOOGLE_API_KEY,
      title: filename,
    });
  }
  //Agregar más modelos de embeddings aquí
  logger.error("No se ha definido un modelo de embeddings");
  return;
  // throw new Error("No se ha definido un modelo de embeddings");
}
