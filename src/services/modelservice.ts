import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { config } from "../config";

export class ModelService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async getModel() {
    switch (config.ModelAI) {
      case "OpenAI":
        return this.createOpenAIModel();
      case "cloudflare":
        return this.createCloudflareModel();
      case "Gemini":
        return this.createGeminiModel();
      case "Anthropic":
        return this.createAnthropicModel();
      default:
        throw new Error("Configuración de modelo de IA no válida");
    }
  }

  private createOpenAIModel() {
    const effectiveApiKey = this.apiKey || config.OPENAI_API_KEY;
    console.log("effectiveApiKey", effectiveApiKey);
    if (!effectiveApiKey) throw new Error("OPENAI_API_KEY is required");
    return new ChatOpenAI({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo-0125",
      apiKey: effectiveApiKey,
    });
  }

  private createCloudflareModel() {
    const effectiveApiKey = this.apiKey || config.CLOUDFLARE_API_TOKEN;
    if (!config.CLOUDFLARE_ACCOUNT_ID || !effectiveApiKey) {
      throw new Error("Cloudflare account settings are required");
    }

    return new ChatCloudflareWorkersAI({
      model:
        config.CLOUDFLARE_MODEL_NAME ||
        "@hf/meta-llama/meta-llama-3-8b-instruct",
      cloudflareAccountId: config.CLOUDFLARE_ACCOUNT_ID,
      cloudflareApiToken: effectiveApiKey,
    });
  }

  private createGeminiModel() {
    const effectiveApiKey = this.apiKey || config.GOOGLE_API_KEY;
    if (!effectiveApiKey) throw new Error("GOOGLE_API_KEY is required");
    return new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      apiKey: effectiveApiKey,
    });
  }

  private createAnthropicModel() {
    const effectiveApiKey = this.apiKey || config.ANTHROPIC_API_KEY;
    if (!effectiveApiKey) throw new Error("ANTHROPIC_API_KEY is required");
    return new ChatAnthropic({
      model:"claude-3-5-sonnet-20240620",
      apiKey: effectiveApiKey,
    })
  }
}
