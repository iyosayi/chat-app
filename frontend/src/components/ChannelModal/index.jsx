import { useContext, useState } from "react";
import { createChannel } from "../../api/channels";
import { AuthContext } from "../../context/auth";

const ChannelModal = ({ toggleModal }) => {
  const {auth} = useContext(AuthContext)
  const [channelName, setChannelName] = useState("");
  const [channelDesc, setChannelDesc] = useState("");
  const { createNewChannel } = createChannel();

  const submit = () => {
    createNewChannel({
      name: channelName,
      description: channelDesc,
      createdBy: auth._id
    }).then((res) => {
      console.log(res);
      toggleModal();
    });
  };
 
  return (
    <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-sidebar-primary bg-opacity-50 z-50">
      <div
        className="fixed w-full h-screen bg-transparent -z-10"
        onClick={toggleModal}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-4 z-10 bg-sidebar-primary p-5 rounded-3xl w-[45%] max-w-md"
      >
        <p className="text-white">NEW CHANNEL</p>
        <div className="bg-content-input w-full rounded-lg">
          <input
            type="text"
            className="bg-transparent w-full text-white p-2 rounded-lg"
            placeholder="Channel name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div className="bg-content-input rounded-lg">
          <textarea
            className="bg-transparent w-full text-white p-2 rounded-lg resize-none"
            rows="4"
            placeholder="Channel Description"
            value={channelDesc}
            onChange={(e) => setChannelDesc(e.target.value)}
          />
        </div>
        <button
          disabled={!channelName || !channelDesc}
          type="submit"
          className={`ml-auto bg-content-button rounded-lg py-[0.35rem] px-8 text-white ${
            (!channelName || !channelDesc) && "grayscale cursor-default"
          }`}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ChannelModal;
