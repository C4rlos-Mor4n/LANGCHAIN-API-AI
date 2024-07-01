import { Request, Response } from "express";
import { addOrUpdateOpenAIKey } from "../services/dbservice";

export async function saveKey(req: Request, res: Response) {
  const { collectionName, apiKey } = req.body;
  if (!collectionName || !apiKey) {
    return res.status(400).json({
      message: "Requiere el campo collectionName y apiKey",
    });
  }

  const addOrUpdate = await addOrUpdateOpenAIKey(collectionName, apiKey);

  if (addOrUpdate.status === "error") {
    return res.status(400).json({
      message: addOrUpdate.message,
    });
  }

  return res.status(200).json({
    message: "Key added or updated",
    response: addOrUpdate.response,
  });
}
