import { useState, useContext } from "react";
import { MdSend } from "react-icons/md";

import { SidebarDetailContext } from "../../context/sidebar";
import { sendMessage } from "../../api/socket";
import { AuthContext } from "../../context/auth";

const MessageBox = () => {
  const [message, setMessage] = useState("");
  const { sidebarDetails } = useContext(SidebarDetailContext);
  const { auth } = useContext(AuthContext);
  const disabled = message === "";

  return (
    <form
      className="w-full px-2 bg-content-input flex items-center rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        if (sidebarDetails) {
          sendMessage({
            message: message,
            channelId: sidebarDetails["_id"],
            postedBy: auth["_id"],
          });

          setMessage("");
        }
      }}
    >
      <input
        className="w-full bg-transparent text-white focus:outline-none p-3"
        placeholder="Type a message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        disabled={disabled}
        className={`bg-content-button h-full p-2 rounded-lg transition-all ease-in-out duration-500-00 ${
          disabled && "grayscale cursor-default"
        }`}
      >
        <MdSend className="text-white" />
      </button>
    </form>
  );
};

export default MessageBox;
