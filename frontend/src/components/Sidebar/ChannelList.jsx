import { useContext } from "react";
import { joinChannel } from "../../api/socket";
import { AuthContext } from "../../context/auth";
import { SidebarDetailContext } from "../../context/sidebar";

const ChannelList = ({ channels, searchTerm, setDetailsShow }) => {
  const { sidebarDetails, setSidebarDetails } =
    useContext(SidebarDetailContext);
  const { auth } = useContext(AuthContext);

  const filtered = channels.filter((channel) =>
    channel.name.match(new RegExp(searchTerm, "i"))
  );

  return (
    <div className="overflow-y-scroll max-h-full">
      {channels &&
        filtered.map((channel, index) => (
          <button
            role="button"
            key={index}
            to={channel.name}
            className="flex items-center gap-3 text-sm mb-2 py-2 w-full transition-all duration-200 ease-in-out hover:bg-content-input rounded-lg"
            onClick={() => {
              setSidebarDetails({
                ...channel,
              });
              joinChannel({
                channelId: channel["_id"],
                userId: auth["_id"],
              });
              setDetailsShow(true);
            }}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${channel.name}&background=252329&color=fff`}
              className="rounded-lg w-10"
            />
            <div className="break-words">
              {String(channel.name).toUpperCase()}
            </div>
          </button>
        ))}
    </div>
  );
};

export default ChannelList;
