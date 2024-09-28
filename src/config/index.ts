import "dotenv/config";

export const config = {
  port: process.env.PORT || 5556,
  apiKey: process.env.API_KEY || "",
  host: process.env.HOST || "localhost",
  QDRANT_URL: process.env.QDRANT_URL || "",
  QDRANT_API_KEY: process.env.QDRANT_API_KEY || "",
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID || "",
  CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN || "",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  ModelAI: process.env.ModelAI || "",
  EMBEDDINGS: process.env.EMBEDDINGS || "",
  RETRIVER: process.env.RETRIVER || "",
  VECTOR_STORE: process.env.VECTOR_STORE || "",
  QDRANT_NAME_INDEX: process.env.QDRANT_NAME_INDEX || "",
  CLOUDFLARE_MODEL_NAME: process.env.CLOUDFLARE_MODEL_NAME || "",
  POCKETBASE_HOST: process.env.POCKETBASE_HOST || "",
  POCKETBASE_DB_NAME: process.env.POCKETBASE_DB_NAME || "",
  POCKETBASE_DB_NAME_PROMPT: process.env.POCKETBASE_DB_NAME_PROMPT || "",
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || "",
  NUMBER_OF_REQUESTS: process.env.NUMBER_OF_REQUESTS || 5,
};
