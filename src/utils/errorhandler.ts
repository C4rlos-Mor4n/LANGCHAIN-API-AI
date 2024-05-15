export function handleEmbeddingError(error: Error) {
  console.error("Error al cargar los documentos en Qdrant:", error);
  throw new Error("Error al cargar los documentos en Qdrant");
}
