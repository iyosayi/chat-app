import { useContext } from "react";
import { io } from "socket.io-client/dist/socket.io.js";
import { useQueryClient } from "react-query";
import { SidebarDetailContext } from "../context/sidebar";

const socket = io("wss://dabatech.herokuapp.com", { reconnection: true });

export const socketSubscription = () => {
  const { sidebarDetails, setSidebarDetails } =
    useContext(SidebarDetailContext);

  const queryClient = useQueryClient();

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.onAny((event) => {
    console.log(`got ${event}`);
  });

  socket.on("userJoined", (event) => {
    console.log("current room", sidebarDetails);
    console.log("new room", event);
    setSidebarDetails({ ...event.data.channel });
    console.log("after update", sidebarDetails);
  });

  socket.on("channelCreated", (event) => {
    console.log("Channel created", event);
  });

  socket.on("chat", (data) => {
    console.log("Message recieved", data);

    queryClient.invalidateQueries("channelMessages");
  });

  return () => {
    socket.disconnect();
  };
};

export const sendMessage = ({ message, channelId, postedBy }) => {
  socket.emit("message", {
    message: message,
    channelId: channelId,
    postedBy: postedBy,
  });
};

export const joinChannel = ({ channelId, userId }) => {
  socket.emit("joinRoom", {
    channelId: channelId,
    userId: userId,
  });
};

export const leaveChannel = ({ channelId, userId }) => {
  socket.emit("leaveRoom", {
    channelId: channelId,
  });
};
