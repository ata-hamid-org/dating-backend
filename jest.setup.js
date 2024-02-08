import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

beforeAll(async () => {
  const uri = await mongod.getUri();
  process.env.MONGODB_URI = uri;
});

afterAll(async () => {
  await mongod.stop();
});
