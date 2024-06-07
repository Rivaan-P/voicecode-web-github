import { initializeApp } from "firebase/app";
import { clientConfig } from "./config";
import { getDatabase } from "firebase/database";

export const app = initializeApp(clientConfig);
export const database = getDatabase(app);
