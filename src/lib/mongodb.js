const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DBName;

if (!uri) {
  throw new Error("❌ MONGODB_URI not found in environment variables.");
}
if (!dbName) {
  throw new Error("❌ DBName not found in environment variables.");
}

console.log("✅ MongoDB URI and DBName loaded successfully");

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
    console.log("🔄 Connecting MongoDB (DEV mode)...");
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  console.log("🔄 Connecting MongoDB (PROD mode)...");
}

// ✅ Reusable function to get a collection
export const getCollection = async (collectionName) => {
  const client = await clientPromise;
  const db = client.db(dbName);
  console.log(`📁 Accessing collection: ${collectionName}`);
  return db.collection(collectionName);
};

// ✅ Named collections
export const collection = {
  user_collection: "users",
  admission_collection: "addmission",
  reviews_collection: "reviews",
  colleges_collection: "colleges",
};
