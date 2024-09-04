import { Request, Response } from "express";
import { Prompt } from "../interfaces";
import { upload } from "../config/promptconfig";
import Logger from "../utils/logger";

const logger = new Logger();

export const uploadPromptDocument = upload.array("prompt", 10);

export async function handleUpload(req: Request, res: Response) {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      const prompts = await Promise.all(
        files.map(async (file) => {
          const prompt: Prompt = {
            path: file.path,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
          };

          logger.log(`Archivo recibido: ${prompt}`);
          return prompt;
        })
      );
      res.status(200).json({
        status: "success",
        prompts: prompts,
        message: "Archivos recibidos y procesados con éxito",
      });
    } else {
      res.status(400).send("No se subieron archivos válidos.");
    }
  } catch (error) {
    logger.error(`Error al procesar la solicitud: ${error}`);
    res.status(500).send("Error al procesar la solicitud");
  }
}
