import express from "express";
import routes from "./routes/index";
import { createServer } from "http";
import socketHandler from "@sockets/index";
import { Server } from "socket.io";
import path from "path";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";

const build = path.resolve("..", "frontend", "dist");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(build));
app.use(cors());
app.use(compression());
app.use(helmet());
app.use("/api", routes);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
global.io = io;

socketHandler(io);
app.use((req, res, next) => {
  res.sendFile(path.join(build, "index.html"));
});

export default server;
