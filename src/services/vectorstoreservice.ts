import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { config } from "../config";

export class VectorStoreService {
  static async getVectorStore(collectionName: string) {
    if (config.EMBEDDINGS !== "embedding-001") {
      throw new Error("Configuración de embeddings no válida");
    }

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      apiKey: config.GOOGLE_API_KEY,
    });

    if (config.VECTOR_STORE === "qdrant") {
      return QdrantVectorStore.fromExistingCollection(embeddings, {
        collectionName: collectionName,
      });
    }

    throw new Error("No se ha encontrado el vector store");
  }
}
