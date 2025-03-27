import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";
import { setupMatchQueueSocket } from "../modules/match-queue/match-queue.socket";

const PORT = process.env.PORT || 3031;

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cookie: false,
  cors: {
    origin: "*",
  },
});

setupMatchQueueSocket(io);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀🚀`);
});
