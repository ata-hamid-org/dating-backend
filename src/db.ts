import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/dating-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

export default mongoose;
