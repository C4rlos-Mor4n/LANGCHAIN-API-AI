import { Document } from "@langchain/core/documents";
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { config } from "../config";
import { getEmbeddings } from "../config/embeddingconfig";
import { handleEmbeddingError } from "../utils/errorhandler";
import { EmbeddingsInterface } from "@langchain/core/embeddings";

export async function runEmbeddings(
  docs: Document<Record<string, any>>[],
  filename: string
) {
  const embeddings = getEmbeddings(filename);

  try {
    if (config.VECTOR_STORE === "qdrant") {
      await uploadToQdrant(docs, embeddings);
    }
  } catch (error) {
    handleEmbeddingError(error);
  }
}

async function uploadToQdrant(
  docs: Document<Record<string, any>>[],
  embeddings: EmbeddingsInterface
) {
  if (!config.QDRANT_URL || !config.QDRANT_API_KEY) {
    throw new Error("Qdrant URL or API key vars missing");
  }

  await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: config.QDRANT_URL,
    apiKey: config.QDRANT_API_KEY,
  });
}
