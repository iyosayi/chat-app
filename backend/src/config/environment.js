require("dotenv").config();

export const env = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  CLOUDAMQP_URL: process.env.CLOUDAMQP_URL,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  getEnv() {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      this.BASE_URL = `http://localhost:${process.env.PORT}/api`;
      this.CLOUDAMQP_URL = `amqp://localhost`;
      this.MONGO_DB_URL = `mongodb://localhost:27017/chat-app`;
    } else {
      this.BASE_URL = process.env.BASE_URL;
      this.CLOUDAMQP_URL = process.env.CLOUDAMQP_URL;
      this.MONGO_DB_URL = process.env.MONGO_DB_URL;
      this.JWT_SECRET = process.env.JWT_SECRET;
      this.PORT = process.env.PORT;
    }
    return {
      BASE_URL: this.BASE_URL,
      CLOUDAMQP_URL: this.CLOUDAMQP_URL,
      MONGO_DB_URL: this.MONGO_DB_URL,
      JWT_SECRET: this.JWT_SECRET,
      PORT: this.PORT,
    };
  },
};
