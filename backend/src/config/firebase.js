import admin from "firebase-admin";
import { readFile } from "fs/promises";

const serviceAccount = JSON.parse(await readFile(new URL("../../firebase-admin.json", import.meta.url), "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export default db;
