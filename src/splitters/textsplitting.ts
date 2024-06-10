import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function splitPDFText(rawDocs: Document<Record<string, any>>[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 300,
  });
  return await splitter.splitDocuments(rawDocs);
}

export async function splitPlainText(rawDocs: Document<Record<string, any>>[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
    // separators: ["|", "#", "##", ">", "-", "```"],
  });
  return await splitter.splitDocuments(rawDocs);
}
