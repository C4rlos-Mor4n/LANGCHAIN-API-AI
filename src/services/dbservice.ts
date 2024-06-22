import Pocketbase from "pocketbase";
import 'dotenv/config';

export async function getOpenAIKey(collectionName: string) {
  try {
    const pb = new Pocketbase('aca viene config.POCKETBASE_HOST'); // ---> modificar para que use desde la config
    const response = await pb
      .collection('aca viene config.POCKETBASE_DB_NAME') // ---> modificar para que use desde la config
      .getFirstListItem(`collectionName="${collectionName}"`);
    return response;
  } catch (error) {
    return "Key does not exist";
  }
}