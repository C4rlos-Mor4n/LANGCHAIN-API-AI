import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function loadPDF(documentPath: string) {
  const loader = new PDFLoader(documentPath);
  return await loader.load();
}

export async function loadPlainText(documentPath: string) {
  const loader = new TextLoader(documentPath);
  return await loader.load();
}
