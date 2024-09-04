import Logger from "../utils/logger";

const logger = new Logger();

export function handleEmbeddingError(error: Error) {
  logger.error(`Error al cargar los documentos en Qdrant: ${error}`);
  throw new Error("Error al cargar los documentos en Qdrant");
}
