import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || "";
export const LOCALHOST_SERVER_PORT = process.env.LOCALHOST_SERVER_PORT ?? 5555;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
export const FIREBASE_MESSAGING_SENDER_ID =
  process.env.FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
export const FIREBASE_STORAGE_FOLDER_PATH =
  process.env.FIREBASE_STORAGE_FOLDER_PATH;
