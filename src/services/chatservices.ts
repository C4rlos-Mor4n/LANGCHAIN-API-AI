import { StringOutputParser } from "@langchain/core/output_parsers";
import { formatDocumentsAsString } from "langchain/util/document";
import { createPrompt } from "../templates/prompttemplates";
import { VectorStoreService } from "./vectorstoreservice";
import { ModelService } from "./modelservice";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { config } from "../config";


class chatServices {
  async runChatServices(
    question: string,
    customer_name: string,
    collectionName: string,
    PromptName: string,
    History: string,
    apiKey: string
  ) {
    question = question.replace(/\{/g, "\\{").replace(/\}/g, "\\}");

    const prompt = createPrompt(customer_name, PromptName, History);
    const outputParser = new StringOutputParser();
    const vectorStore = await VectorStoreService.getVectorStore(collectionName);
    const serviceWithApiKey = new ModelService(apiKey);
    const modelAi = await serviceWithApiKey.getModel();

    console.log("Model AI", modelAi);

    const NumberRetriver = parseInt(config.RETRIVER as string);

    try {
      const chain = RunnableSequence.from([
        {
          context: async () => {
            const relevantDocs = await vectorStore.similaritySearch(
              question,
              NumberRetriver
            );
            return formatDocumentsAsString(relevantDocs);
          },
          question: new RunnablePassthrough(),
        },
        prompt,
        modelAi,
        outputParser,
      ]);

      const result: any = await chain.invoke(question);

      const Payload = {
        Response: result,
      };

      return Payload;
    } catch (error) {
      console.error(
        "Error en la cadena de ejecución en el servicio de chat",
        error
      );
      throw error;
    }
  }
}

export { chatServices };
