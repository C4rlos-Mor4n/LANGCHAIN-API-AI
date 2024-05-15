import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { ChatOpenAI } from "@langchain/openai";
import { config } from "../config";

export class ModelService {
  static async getModel() {
    switch (config.ModelAI) {
      case "OpenAI":
        return this.createOpenAIModel();
      case "cloudflare":
        return this.createCloudflareModel();
      case "Gemini":
        return this.createGeminiModel();
      default:
        throw new Error("Configuración de modelo de IA no válida");
    }
  }

  private static createOpenAIModel() {
    if (!config.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is required");
    return new ChatOpenAI({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo-0125",
      apiKey: config.OPENAI_API_KEY,
    });
  }

  private static createCloudflareModel() {
    if (!config.CLOUDFLARE_ACCOUNT_ID || !config.CLOUDFLARE_API_TOKEN) {
      throw new Error("Cloudflare account settings are required");
    }

    return new ChatCloudflareWorkersAI({
      model:
        config.CLOUDFLARE_MODEL_NAME ||
        "@hf/meta-llama/meta-llama-3-8b-instruct",
      cloudflareAccountId: config.CLOUDFLARE_ACCOUNT_ID,
      cloudflareApiToken: config.CLOUDFLARE_API_TOKEN,
    });
  }

  private static createGeminiModel() {
    if (!config.GOOGLE_API_KEY) throw new Error("GOOGLE_API_KEY is required");
    return new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
    });
  }
}
