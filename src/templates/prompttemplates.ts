import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPrompt } from "../services/dbservice";
import Logger from "../utils/logger";

const logger = new Logger();

function readTemplateFromFile(fileName: string) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));

  const filePath = path.join(
    dirname,
    "..",
    "templates",
    "prompt_templates",
    `${fileName}.txt`
  );

  logger.log(`Leyendo el archivo ${fileName} en ${filePath}`);

  try {
    const template = fs.readFileSync(filePath, "utf-8");
    return template;
  } catch (error) {
    logger.error(`Error leyendo al leer archivo ${fileName} o no existe: ${error}`);
    // throw new Error(`No se pudo leer el archivo ${fileName} o no existe`);
    return "Responde con esta frase: He identificado un error en tu solicitud, por favor genera el template.";
  }
}

async function readTemplateFromDB(PromptName: string) {
  const prompt = await getPrompt(PromptName);
  return prompt;
}

export async function createPrompt(
  customer_name: string,
  PromptName: string,
  _history: string
) {
  const systemPromptTemplate = await readTemplateFromDB(PromptName);

  if (!_history) {
    _history = "";
  }

  if (!customer_name) {
    customer_name = "";
  }

  const messages = [
    SystemMessagePromptTemplate.fromTemplate(
      systemPromptTemplate
        .replace("{customer_name}", customer_name)
        .replace("{history}", _history)
    ),
    HumanMessagePromptTemplate.fromTemplate(`User pregunta: {question}`),
  ];

  return ChatPromptTemplate.fromMessages(messages);
}
