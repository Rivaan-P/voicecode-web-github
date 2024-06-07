// lib/db.js
import Dexie from "dexie";

const db = new Dexie("MyDatabase");
db.version(1).stores({
  items: "++index, content, parentID", // Define your schema here
});

export default db;
