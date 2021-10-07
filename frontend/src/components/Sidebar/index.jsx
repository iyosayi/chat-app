import { useContext, useState } from "react";
import { useQueryClient } from "react-query";

import { MdAdd, MdArrowBackIosNew } from "react-icons/md";
import { allChannels } from "../../api/channels";
import { SidebarDetailContext } from "../../context/sidebar";
import SidebarFooter from "./Footer";
import Search from "./Search";
import ChannelList from "./ChannelList";
import ChannelDetails from "./ChannelDetail";
import { leaveChannel } from "../../api/socket";

const Sidebar = ({
  toggleModal,
  detailsShow,
  setDetailsShow,
  setDrawerShow,
}) => {
  const { data, error } = allChannels();
  const { sidebarDetails, setSidebarDetails } =
    useContext(SidebarDetailContext);
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full h-screen bg-sidebar-primary text-white flex flex-col">
      <div
        className={`shadow-md bg-sidebar-primary flex items-center py-4 p-5 ${
          !detailsShow && "justify-between"
        }`}
      >
        {!detailsShow ? (
          <>
            <h5>Channels</h5>
            <div
              className="rounded-lg bg-[#252329] flex justify-center items-center h-8 w-8"
              onClick={() => {
                setDrawerShow(false);
                toggleModal();
                queryClient.invalidateQueries("channelMessages");
              }}
              role="button"
            >
              <MdAdd />
            </div>
          </>
        ) : (
          <>
            <div
              className="rounded-lg flex justify-center items-center h-8 w-8 mr-2 hover:bg-[#252329] transition-all duration-200 ease-in-out"
              onClick={() => {
                leaveChannel({ channelId: sidebarDetails["_id"] });
                setDetailsShow(false);
                setSidebarDetails(null);
              }}
              role="button"
            >
              <MdArrowBackIosNew />
            </div>
            <h5>All Channels</h5>
          </>
        )}
      </div>
      <div
        className={`w-full bg-sidebar-primary p-5 ${
          sidebarDetails && "hidden"
        }`}
      >
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div
        className={`w-full h-full p-5 break-words overflow-y-scroll ${
          sidebarDetails && "hidden"
        }`}
      >
        {data && (
          <ChannelList
            channels={data}
            detailsShow={detailsShow}
            setDetailsShow={setDetailsShow}
            searchTerm={searchTerm}
          />
        )}
      </div>
      <div className={`w-full h-full p-5 ${!sidebarDetails && "hidden"}`}>
        {sidebarDetails && <ChannelDetails />}
      </div>
      <div className="bg-sidebar-footer">
        <SidebarFooter />
      </div>
    </div>
  );
};

export default Sidebar;
