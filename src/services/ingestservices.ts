import { IngestDocument } from "../interfaces";
import { runEmbeddings } from "./embeddingsservice";
import { loadPDF, loadPlainText } from "../loaders/documentloaders";
import { splitPDFText, splitPlainText } from "../splitters/textsplitting";
import Logger from "../utils/logger";

const logger = new Logger();

class IngestServices {
  async uploadIngestDocument(
    document: IngestDocument,
    collectionName: string
  ): Promise<void> {
    try {
      logger.log(`Procesando archivo: ${document.filename}, archivo: ${document}`);

      if (document.mimetype === "application/pdf") {
        const rawDocs = await loadPDF(document.path);
        const docs = await splitPDFText(rawDocs);
        await runEmbeddings(docs, document.filename, collectionName);
      } else if (document.mimetype === "text/plain") {
        const rawDocs = await loadPlainText(document.path);
        const docs = await splitPlainText(rawDocs);
        await runEmbeddings(docs, document.filename, collectionName);
      } else {
        logger.error(`Formato de archivo no soportado: ${document.mimetype}`);
        return;
        // throw new Error(
        //   `Formato de archivo no soportado: ${document.mimetype}`
        // );
      }
    } catch (error) {
      logger.error(`Error al procesar el archivo: ${error}`);
      return;
      // throw new Error(`Error al procesar el archivo: ${document.filename}`);
    }
  }
}

const ingestServices = new IngestServices();
export default ingestServices;
