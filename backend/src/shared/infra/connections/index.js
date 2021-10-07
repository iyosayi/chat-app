import Mongoose from "mongoose";
import { env } from "@config/environment";

let isConnected;
let db;

export default {
  async connectDb() {
    if (isConnected) return db;
    try {
      db = await Mongoose.connect(env.getEnv().MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = db.connections[0].readyState;
      return db;
    } catch (err) {
      console.log("MongoDB connection failed, retrying in 5 secs", err);
      setTimeout(this.connectDb, 5000);
    }
  },
};
