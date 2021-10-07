import container from "@shared/container";

const channelRepository = container.resolve("channelRepository");
export default function socketHandler(io) {
  io.on("connection", (socket) => {
    socket.on("disconnect", (msg) => console.log("A user disconnected"));

    socket.on("joinRoom", async ({ channelId, userId }) => {
      const channel = await channelRepository.joinRoom({ channelId, userId });
      const data = {
        status: "success",
        message: "User joined successfully",
        data: channel,
      };
      socket.join(channelId);
      io.in(channelId).emit("userJoined", data);
    });

    socket.on("leaveRoom", async ({ channelId }) => {
      socket.leave(channelId);
    });

    socket.on("message", async ({ channelId, message, postedBy }) => {
      const chat = await channelRepository.createChatMessage({
        channelId,
        message,
        postedBy,
      });
      io.in(channelId).emit("chat", chat);
    });
    socket.on("hello", (data) => console.log(data));
  });
}


