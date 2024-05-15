import { IngestDocument } from "../interfaces";
import { runEmbeddings } from "./embeddingsservice";
import { loadPDF, loadPlainText } from "../loaders/documentloaders";
import { splitPDFText, splitPlainText } from "../splitters/textsplitting";
import { logger } from "../utils/logger";

class IngestServices {
  async uploadIngestDocument(document: IngestDocument): Promise<void> {
    try {
      logger.info(`Procesando archivo: ${document.filename}`, document);

      if (document.mimetype === "application/pdf") {
        const rawDocs = await loadPDF(document.path);
        const docs = await splitPDFText(rawDocs);
        await runEmbeddings(docs, document.filename);
      } else if (document.mimetype === "text/plain") {
        const rawDocs = await loadPlainText(document.path);
        const docs = await splitPlainText(rawDocs);
        await runEmbeddings(docs, document.filename);
      } else {
        throw new Error(
          `Formato de archivo no soportado: ${document.mimetype}`
        );
      }
    } catch (error) {
      logger.error("Error al procesar el archivo", error);
      throw new Error(`Error al procesar el archivo: ${document.filename}`);
    }
  }
}

const ingestServices = new IngestServices();
export default ingestServices;
