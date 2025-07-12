const { ServerApiVersion, MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DBName;

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
  }
  clientPromise = client.connect();
} else {
  //we did the connection in the if else
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  console.log("connected mongodb successfully");
}

//now here im going to create reusebble collection
export const getCollection = async (collectionName) => {
  const client = await clientPromise;
  return client.db(dbName).collection(collectionName);
};

export const collection = {
  user_collection: "users",
};
