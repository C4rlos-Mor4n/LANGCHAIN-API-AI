import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function readTemplateFromFile(fileName: string) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));

  const filePath = path.join(
    dirname,
    "..",
    "..",
    "src",
    "templates",
    "prompt_templates",
    `${fileName}.txt`
  );

  console.log(`Leyendo el archivo ${fileName} en ${filePath}`);

  try {
    const template = fs.readFileSync(filePath, "utf-8");
    return template;
  } catch (error) {
    console.error(`Error leyendo el archivo ${fileName}:`, error);
    throw new Error(`No se pudo leer el archivo ${fileName}`);
  }
}
export function createPrompt(
  customer_name: string,
  fileName: string,
  _history: string
) {
  const systemPromptTemplate = readTemplateFromFile(fileName);

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
