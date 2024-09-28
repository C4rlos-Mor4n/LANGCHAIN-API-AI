import Pocketbase from "pocketbase";
import { config } from "../config";

export async function getOpenAIKey(collectionName: string) {
  try {
    const pb = new Pocketbase(`${config.POCKETBASE_HOST}`);
    const response = await pb
      .collection(`${config.POCKETBASE_DB_NAME}`)
      .getFirstListItem(`projectName="${collectionName}"`);

    return response;
  } catch (error) {
    return {
      apiKeyAnthropic: "",
      apiKeyOpenAI: "",
      apikey: "",
    };
  }
}

export async function addOrUpdateOpenAIKey(
  collectionName: string,
  apiKey: string
) {
  try {
    const pb = new Pocketbase(`${config.POCKETBASE_HOST}`);
    const data = {
      projectName: collectionName,
      apiKey: apiKey,
    };

    // Verificar si el projectName ya existe
    const existingProject = await pb
      .collection(`${config.POCKETBASE_DB_NAME}`)
      .getFirstListItem(`projectName="${collectionName}"`)
      .catch(() => null);

    let response;
    if (existingProject) {
      // Si el projectName existe, actualizar el apiKey
      response = await pb
        .collection(`${config.POCKETBASE_DB_NAME}`)
        .update(existingProject.id, { apiKey: apiKey });
    } else {
      // Si el projectName no existe, crear un nuevo registro
      response = await pb
        .collection(`${config.POCKETBASE_DB_NAME}`)
        .create(data);
    }

    return {
      status: "success",
      message: "Key added or updated",
      response,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}

export async function getPrompt(collectionName: string) {
  
  try {
    const pb = new Pocketbase(config.POCKETBASE_HOST);
    const response = await pb
      .collection(`${config.POCKETBASE_DB_NAME_PROMPT}`)
      .getFirstListItem(`promptName="${collectionName}"`)
    return response.promptSrc
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}