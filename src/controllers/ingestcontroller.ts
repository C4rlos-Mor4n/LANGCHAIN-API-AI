import { Request, Response } from "express";
import { IngestDocument } from "../interfaces";
import { upload } from "../config/multerconfig";
import ingestServices from "../services/ingestservices";

export const uploadIngestDocument = upload.array("archivos", 10);
export async function handleUpload(req: Request, res: Response) {
  try {
    const collectionName = req.body.collectionName as string;
    if (!collectionName)
      return res.status(400).send("Falta el nombre de la colección");

    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      const documents = await Promise.all(
        files.map(async (file) => {
          const document: IngestDocument = {
            path: file.path,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
          };

          await ingestServices.uploadIngestDocument(document, collectionName);
          return document;
        })
      );

      res.status(200).json({
        status: "success",
        documentos: documents,
        message: "Archivos recibidos y procesados con éxito",
      });
    } else {
      res.status(400).send("No se subieron archivos válidos.");
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Error al procesar la solicitud");
  }
}
