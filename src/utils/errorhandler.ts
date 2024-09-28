/**
 * Maneja los errores al cargar los documentos en Qdrant.
 *
 * @param error - El error que se produjo al cargar los documentos.
 * @throws Error - Error al cargar los documentos en Qdrant.
 */
export function handleEmbeddingError(error: Error) {
  console.error("Error al cargar los documentos en Qdrant:", error);
  throw new Error("Error al cargar los documentos en Qdrant");
}
